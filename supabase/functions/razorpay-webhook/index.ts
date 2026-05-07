import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

/**
 * Razorpay Webhook Handler
 */

async function verifySignature(body: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  
  const verified = await crypto.subtle.verify(
    "HMAC",
    key,
    hexToBytes(signature),
    encoder.encode(body)
  );
  return verified;
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("OK", { status: 200 }); // Return 200 for non-POST to satisfy ping tests
  }

  try {
    const signature = req.headers.get("x-razorpay-signature");
    const body = await req.text();
    const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET");

    // If it's a test from Razorpay (no signature), just return 200 to let it through the setup
    if (!signature) {
      console.log("[Razorpay Webhook] Received request without signature (likely a test ping)");
      return new Response(JSON.stringify({ status: "ok", message: "Webhook URL is active" }), { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Verify signature if secret is configured
    if (secret) {
      const isValid = await verifySignature(body, signature, secret);
      if (!isValid) {
        console.error("[Razorpay Webhook] Signature verification failed");
        return new Response("Invalid signature", { status: 401 });
      }
    }

    const payload = JSON.parse(body);
    const event = payload.event;
    
    console.log(`[Razorpay Webhook] Event: ${event}`);

    if (event === "payment.captured" || event === "order.paid") {
      const payment = payload.payload.payment.entity;
      const registrationId = payment.notes?.registration_id;

      if (registrationId) {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { error } = await supabase
          .from("registrations")
          .update({
            payment_status: "paid",
            payment_id: payment.id,
          })
          .eq("id", registrationId);

        if (error) console.error(`[Razorpay Webhook] Database error:`, error);
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err) {
    console.error("[Razorpay Webhook] Error:", err);
    return new Response("Internal Error", { status: 500 });
  }
});
