import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Users, Mail, Phone, Calendar, ArrowLeft, RefreshCw, Instagram, GraduationCap } from 'lucide-react';
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

interface Influencer {
  id: number;
  name: string;
  email: string;
  phone: string;
  instagram_handle: string;
  followers_count: string;
  created_at: string;
}

interface Ambassador {
  id: number;
  name: string;
  email: string;
  phone: string;
  college: string;
  why_join: string;
  created_at: string;
}

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<'registrations' | 'influencers' | 'ambassadors'>('registrations');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [regRes, infRes, ambRes] = await Promise.all([
        supabase.from('registrations').select('*').order('created_at', { ascending: false }),
        supabase.from('influencers').select('*').order('created_at', { ascending: false }),
        supabase.from('ambassadors').select('*').order('created_at', { ascending: false })
      ]);

      if (regRes.error) throw regRes.error;
      // We will not throw for influencers and ambassadors to avoid failing the whole dashboard if those tables don't exist yet
      if (infRes.error) console.error('Influencer fetch error:', infRes.error);
      if (ambRes.error) console.error('Ambassador fetch error:', ambRes.error);

      setRegistrations(regRes.data || []);
      setInfluencers(infRes.data || []);
      setAmbassadors(ambRes.data || []);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-himalaya-black text-white pt-24 px-6 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-4 text-sm font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Admin <span className="text-sunrise-gold">Dashboard</span>
            </h1>
            <p className="text-white/50 mt-2">Manage incoming leads, ambassadors, and influencers</p>
          </div>
          
          <button 
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 glass px-6 py-3 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-4 mb-8 pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-colors ${
              activeTab === 'registrations' 
                ? 'bg-sunrise-gold text-black' 
                : 'glass text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            Trip Registrations
          </button>
          <button
            onClick={() => setActiveTab('influencers')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-colors ${
              activeTab === 'influencers' 
                ? 'bg-sunrise-gold text-black' 
                : 'glass text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Instagram className="w-4 h-4" />
            Influencer Collabs
          </button>
          <button
            onClick={() => setActiveTab('ambassadors')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold whitespace-nowrap transition-colors ${
              activeTab === 'ambassadors' 
                ? 'bg-sunrise-gold text-black' 
                : 'glass text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Campus Ambassadors
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-8">
            <p className="font-bold">Error loading data</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-dark p-8 rounded-3xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-sunrise-gold/10 flex items-center justify-center mb-4 text-sunrise-gold">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-sm text-white/50 mb-1">Total Leads (All)</p>
            <p className="text-4xl font-bold">{registrations.length + influencers.length + ambassadors.length}</p>
          </div>
          
          <div className="glass-dark p-8 rounded-3xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 text-pink-400">
              <Instagram className="w-6 h-6" />
            </div>
            <p className="text-sm text-white/50 mb-1">Influencer Leads</p>
            <p className="text-4xl font-bold">{influencers.length}</p>
          </div>
          
          <div className="glass-dark p-8 rounded-3xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <p className="text-sm text-white/50 mb-1">Ambassador Leads</p>
            <p className="text-4xl font-bold">{ambassadors.length}</p>
          </div>
        </div>

        <div className="glass overflow-hidden rounded-3xl border border-white/10">
          <div className="overflow-x-auto">
            {activeTab === 'registrations' && (
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
                      <td colSpan={4} className="px-6 py-12 text-center text-white/50">Loading registrations...</td>
                    </tr>
                  ) : registrations.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-white/50">No trip registrations found.</td>
                    </tr>
                  ) : (
                    registrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-5 align-top">
                          <span className="text-sm text-white/70">
                            {new Date(reg.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric'
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
            )}

            {activeTab === 'influencers' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                    <th className="px-6 py-5 font-medium">Date</th>
                    <th className="px-6 py-5 font-medium">Influencer Info</th>
                    <th className="px-6 py-5 font-medium">Instagram</th>
                    <th className="px-6 py-5 font-medium">Followers</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading && influencers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-white/50">Loading influencers...</td>
                    </tr>
                  ) : influencers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-white/50">No influencer collaborations found.</td>
                    </tr>
                  ) : (
                    influencers.map((inf) => (
                      <tr key={inf.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-5 align-top">
                          <span className="text-sm text-white/70">
                            {new Date(inf.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="font-bold mb-2">{inf.name}</p>
                          <div className="space-y-1 text-sm text-white/60">
                            <p className="flex items-center gap-2 hover:text-white transition-colors">
                              <Mail className="w-3 h-3" />
                              <a href={`mailto:${inf.email}`}>{inf.email}</a>
                            </p>
                            <p className="flex items-center gap-2 hover:text-white transition-colors">
                              <Phone className="w-3 h-3" />
                              <a href={`tel:${inf.phone}`}>{inf.phone}</a>
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <a href={`https://instagram.com/${inf.instagram_handle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors font-medium">
                            <Instagram className="w-4 h-4" />
                            {inf.instagram_handle.startsWith('@') ? inf.instagram_handle : `@${inf.instagram_handle}`}
                          </a>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs border border-white/10 font-bold">
                            {inf.followers_count}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {activeTab === 'ambassadors' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                    <th className="px-6 py-5 font-medium">Date</th>
                    <th className="px-6 py-5 font-medium">Student Info</th>
                    <th className="px-6 py-5 font-medium">College</th>
                    <th className="px-6 py-5 font-medium">Why Join?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading && ambassadors.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-white/50">Loading ambassadors...</td>
                    </tr>
                  ) : ambassadors.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-white/50">No campus ambassador applications found.</td>
                    </tr>
                  ) : (
                    ambassadors.map((amb) => (
                      <tr key={amb.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-5 align-top w-32">
                          <span className="text-sm text-white/70">
                            {new Date(amb.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric', month: 'short', year: 'numeric'
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-5 w-64">
                          <p className="font-bold mb-2">{amb.name}</p>
                          <div className="space-y-1 text-sm text-white/60">
                            <p className="flex items-center gap-2 hover:text-white transition-colors">
                              <Mail className="w-3 h-3" />
                              <a href={`mailto:${amb.email}`}>{amb.email}</a>
                            </p>
                            <p className="flex items-center gap-2 hover:text-white transition-colors">
                              <Phone className="w-3 h-3" />
                              <a href={`tel:${amb.phone}`}>{amb.phone}</a>
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-5 align-top w-48">
                          <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs border border-blue-500/30">
                            {amb.college}
                          </span>
                        </td>
                        <td className="px-6 py-5 align-top">
                          <p className="text-sm text-white/80 line-clamp-3 hover:line-clamp-none transition-all">
                            {amb.why_join || 'No reason provided.'}
                          </p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
