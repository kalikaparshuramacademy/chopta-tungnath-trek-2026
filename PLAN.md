# Implementation Plan - Find Booking Page & Dynamic Members List

This plan outlines the steps to implement the "Find My Booking" page and the dynamic "Add Member" list in the registration form.

## 1. Dynamic Members List in `BookNow.tsx`
- **Objective**: Replace textareas for names and contacts with a dynamic UI.
- **State**: Add a `members` state array holding `{ name, phone }` objects.
- **UI**:
  - Add "Add Member" button.
  - Display a row for each member with Name and Phone inputs.
  - Add a delete button for each row.
- **Data Mapping**:
  - Combine the members array into strings before sending to Supabase:
    - `member_names`: `members.map(m => m.name).join(', ')`
    - `group_contacts`: `members.map(m => `${m.name}: ${m.phone}`).join('\n')`
  - This keeps compatibility with the existing table and admin view.

## 2. "Find My Booking" Page
- **Objective**: Allow users to retrieve their receipt links.
- **File**: Create `src/pages/FindBooking.tsx`.
- **Functionality**:
  - A form asking for **Email** or **Phone Number**.
  - Query the `registrations` table in Supabase for matches.
  - Display matching bookings with links to `/invoice/:id`.
- **Routing**:
  - Register the route `/find-booking` in `App.tsx`.
  - Add a link to this page on the `BookNow` page.

## 3. Verification
- Verify that `Admin.tsx` and `InvoiceView.tsx` handle the combined strings correctly.
- Run `npm run build` to ensure no build errors.
