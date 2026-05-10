import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Calendar, CreditCard, ChevronRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  batch_date: string;
  payment_status: string;
  registration_type: string;
  sharing_type: string;
}

export const FindBooking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Booking[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError('');
    setHasSearched(true);
    setResults([]);

    try {
      const cleanQuery = searchQuery.trim();
      
      // Search by email or phone
      const { data, error: fetchError } = await supabase
        .from('registrations')
        .select('id, name, email, phone, batch_date, payment_status, registration_type, sharing_type')
        .or(`email.ilike.%${cleanQuery}%,phone.ilike.%${cleanQuery}%`)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setResults(data || []);
    } catch (err: any) {
      console.error('Error finding booking:', err);
      setError('Failed to search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const INPUT = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-sunrise-gold/50 transition-all text-base";

  return (
    <div className="min-h-screen bg-himalaya-black text-white relative overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sunrise-gold/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-himalaya-gold/5 blur-3xl rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-12 text-sm font-bold uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-glow mb-4">
            Find Your <span className="text-sunrise-gold">Booking</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Enter the email or phone number you used during registration to retrieve your receipt.
          </p>
        </div>

        {/* Search Form */}
        <div className="glass-dark p-8 rounded-3xl border border-white/10 mb-12">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-5 w-5 h-5 text-white/30" />
              <input
                type="text"
                placeholder="Enter your Email or Phone Number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${INPUT} pl-14`}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-sunrise-gold text-black font-bold px-8 py-4 rounded-2xl hover:bg-white hover:scale-[1.02] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:w-auto w-full"
            >
              {isLoading ? 'Searching...' : 'Search'}
              {!isLoading && <ChevronRight className="w-4 h-4" />}
            </button>
          </form>
          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {hasSearched && !isLoading && (
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-widest text-white/50">
              Found {results.length} booking{results.length !== 1 ? 's' : ''}
            </p>

            {results.length > 0 ? (
              <div className="grid gap-4">
                {results.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-dark p-6 rounded-2xl border border-white/10 hover:border-sunrise-gold/30 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <h3 className="font-bold text-white text-lg mb-1">{booking.name}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/50">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {booking.batch_date}
                          </span>
                          <span className="flex items-center gap-1">
                            <CreditCard className="w-4 h-4" />
                            {booking.registration_type === 'group' ? 'Group' : 'Solo'} • {booking.sharing_type.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                        <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                          booking.payment_status === 'paid' 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {booking.payment_status || 'PENDING'}
                        </span>

                        <Link
                          to={`/invoice/${booking.id}`}
                          className="text-sunrise-gold font-bold text-sm flex items-center gap-1 group-hover:text-white transition-colors"
                        >
                          View Receipt
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-dark rounded-3xl border border-white/10">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-white/70 font-medium">No bookings found for that query.</p>
                <p className="text-white/40 text-sm mt-1">Make sure you are using the exact email or phone number used during booking.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
