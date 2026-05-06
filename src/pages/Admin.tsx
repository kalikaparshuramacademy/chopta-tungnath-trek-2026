import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Mail, Phone, Calendar, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Registration {
  id: number;
  name: string;
  email: string;
  phone: string;
  college: string;
  batch_date: string;
  created_at: string;
}

export const Admin = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setRegistrations(data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="min-h-screen bg-himalaya-black text-white pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-4 text-sm font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Admin <span className="text-sunrise-gold">Dashboard</span>
            </h1>
            <p className="text-white/50 mt-2">Manage incoming leads and registrations</p>
          </div>
          
          <button 
            onClick={fetchRegistrations}
            disabled={loading}
            className="flex items-center gap-2 glass px-6 py-3 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-8">
            <p className="font-bold">Error loading data</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-dark p-8 rounded-3xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-sunrise-gold/10 flex items-center justify-center mb-4 text-sunrise-gold">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-sm text-white/50 mb-1">Total Registrations</p>
            <p className="text-4xl font-bold">{registrations.length}</p>
          </div>
          
          <div className="glass-dark p-8 rounded-3xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
              <Calendar className="w-6 h-6" />
            </div>
            <p className="text-sm text-white/50 mb-1">Upcoming Batch (21st June)</p>
            <p className="text-4xl font-bold">
              {registrations.filter(r => r.batch_date.includes('21st')).length}
            </p>
          </div>
          
          <div className="glass-dark p-8 rounded-3xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-400">
              <Calendar className="w-6 h-6" />
            </div>
            <p className="text-sm text-white/50 mb-1">Later Batch (28th June)</p>
            <p className="text-4xl font-bold">
              {registrations.filter(r => r.batch_date.includes('28th')).length}
            </p>
          </div>
        </div>

        <div className="glass overflow-hidden rounded-3xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                  <th className="px-6 py-5 font-medium">Date</th>
                  <th className="px-6 py-5 font-medium">Traveler Info</th>
                  <th className="px-6 py-5 font-medium">College</th>
                  <th className="px-6 py-5 font-medium">Batch Selected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading && registrations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-white/50">
                      Loading registrations...
                    </td>
                  </tr>
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-white/50">
                      No registrations found. Share the booking link to get started!
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-5 align-top">
                        <span className="text-sm text-white/70">
                          {new Date(reg.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-bold mb-2">{reg.name}</p>
                        <div className="space-y-1 text-sm text-white/60">
                          <p className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail className="w-3 h-3" />
                            <a href={`mailto:${reg.email}`}>{reg.email}</a>
                          </p>
                          <p className="flex items-center gap-2 hover:text-white transition-colors">
                            <Phone className="w-3 h-3" />
                            <a href={`tel:${reg.phone}`}>{reg.phone}</a>
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs border border-white/10">
                          {reg.college || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                          reg.batch_date.includes('21st') 
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                            : 'bg-green-500/20 text-green-400 border-green-500/30'
                        }`}>
                          {reg.batch_date}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
