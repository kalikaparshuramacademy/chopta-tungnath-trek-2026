import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  Users, Mail, Phone, ArrowLeft, RefreshCw,
  Instagram, GraduationCap, Trash2, Download, Lock, Eye, EyeOff, LogOut, Clock,
  Search, Copy, Check, FileText, X
} from 'lucide-react';
import { Link } from 'react-router-dom';

// ── Simple client-side password gate ────────────────────────────────────────
const ADMIN_PASSWORD = 'chopta2026admin';

interface Registration {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  occupation: string;
  college: string;
  batch_date: string;
  registration_type: string;
  sharing_type: string;
  group_size: number;
  member_names: string;
  group_contacts: string;
  male_count: number;
  female_count: number;
  discount_per_person: number;
  is_campus_ambassador: boolean;
  offer_preference: string;
  declaration_accepted: boolean;
  payment_id: string;
  payment_status: string;
  created_at: string;
}

const getBasePrice = (type: string) => {
  switch (type) {
    case 'quad': return 5499;
    case 'triple': return 5999;
    case 'double': return 6499;
    default: return 5499;
  }
};

interface Influencer {
  id: number;
  name: string;
  email: string;
  phone: string;
  instagram_handle: string;
  followers_count: string;
  content_type: string;
  gender: string;
  created_at: string;
}

interface Ambassador {
  id: number;
  name: string;
  email: string;
  phone: string;
  college: string;
  year_of_study: string;
  date_of_birth: string;
  gender: string;
  societies: string;
  why_join: string;
  created_at: string;
}

// ── Utility: format timestamp ────────────────────────────────────────────────
const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });
};

// ── Utility: export table data as CSV ────────────────────────────────────────
function exportCSV(rows: Record<string, any>[], filename: string) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]).filter(k => k !== 'id');
  const csvRows = [
    headers.join(','),
    ...rows.map(row =>
      headers.map(h => `"${(row[h] ?? '').toString().replace(/"/g, '""')}"`).join(',')
    )
  ];
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Password Gate Component ──────────────────────────────────────────────────
const PasswordGate = ({ onUnlock }: { onUnlock: () => void }) => {
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_unlocked', '1');
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-himalaya-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="w-16 h-16 bg-sunrise-gold/10 text-sunrise-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Admin Access</h1>
        <p className="text-white/50 text-center text-sm mb-8">Enter your admin password to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Admin password"
              className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-sunrise-gold/50 transition-all`}
              autoFocus
            />
            <button type="button" onClick={() => setShowPw(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm text-center">Incorrect password. Try again.</p>}
          <button type="submit"
            className="w-full bg-sunrise-gold text-black font-bold py-3 rounded-xl hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all">
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

// ── Main Admin Dashboard ─────────────────────────────────────────────────────
export const Admin = () => {
  const [isUnlocked, setIsUnlocked] = useState(() => sessionStorage.getItem('admin_unlocked') === '1');
  const [activeTab, setActiveTab] = useState<'registrations' | 'influencers' | 'ambassadors'>('registrations');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [viewingRegistration, setViewingRegistration] = useState<Registration | null>(null);

  useEffect(() => {
    setSelectedIds([]);
  }, [activeTab]);

  const handleSelectAll = (ids: number[]) => {
    if (selectedIds.length === ids.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(ids);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} entries? This cannot be undone.`)) return;
    
    const { error } = await supabase.from(activeTab).delete().in('id', selectedIds);
    if (error) {
      alert(`Bulk delete failed: ${error.message}`);
    } else {
      if (activeTab === 'registrations') setRegistrations(r => r.filter(x => !selectedIds.includes(x.id)));
      if (activeTab === 'influencers') setInfluencers(r => r.filter(x => !selectedIds.includes(x.id)));
      if (activeTab === 'ambassadors') setAmbassadors(r => r.filter(x => !selectedIds.includes(x.id)));
      setSelectedIds([]);
    }
  };
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

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
      if (infRes.error) console.error('Influencer fetch error:', infRes.error);
      if (ambRes.error) console.error('Ambassador fetch error:', ambRes.error);

      setRegistrations(regRes.data || []);
      setInfluencers(infRes.data || []);
      setAmbassadors(ambRes.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) fetchData();
  }, [isUnlocked]);

  const handleDelete = async (table: string, id: number) => {
    if (!window.confirm('Are you sure you want to delete this entry? This cannot be undone.')) return;
    setDeletingId(id);
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) {
      alert(`Delete failed: ${error.message}`);
    } else {
      if (table === 'registrations') setRegistrations(r => r.filter(x => x.id !== id));
      if (table === 'influencers') setInfluencers(r => r.filter(x => x.id !== id));
      if (table === 'ambassadors') setAmbassadors(r => r.filter(x => x.id !== id));
    }
    setDeletingId(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_unlocked');
    setIsUnlocked(false);
  };

  const handleExport = () => {
    if (activeTab === 'registrations') exportCSV(registrations, 'trip_registrations');
    if (activeTab === 'influencers') exportCSV(influencers, 'influencer_applications');
    if (activeTab === 'ambassadors') exportCSV(ambassadors, 'ambassador_applications');
  };

  const handleDeleteAll = async () => {
    const tableLabel = activeTab === 'registrations' ? 'Trip Registrations' : activeTab === 'influencers' ? 'Influencer Applications' : 'Ambassador Applications';
    const count = activeTab === 'registrations' ? registrations.length : activeTab === 'influencers' ? influencers.length : ambassadors.length;
    if (count === 0) { alert('No entries to delete.'); return; }
    const confirm1 = window.confirm(`Delete ALL ${count} entries from "${tableLabel}"? This cannot be undone.`);
    if (!confirm1) return;
    const confirm2 = window.confirm(`Final confirmation: permanently delete all ${count} records?`);
    if (!confirm2) return;
    const { error } = await supabase.from(activeTab).delete().neq('id', 0);
    if (error) { alert(`Delete all failed: ${error.message}`); return; }
    if (activeTab === 'registrations') setRegistrations([]);
    if (activeTab === 'influencers') setInfluencers([]);
    if (activeTab === 'ambassadors') setAmbassadors([]);
  };

  const handleCopyEmails = () => {
    const data = activeTab === 'registrations' ? registrations : activeTab === 'influencers' ? influencers : ambassadors;
    const emails = data.map(item => item.email).filter(Boolean).join(', ');
    if (!emails) { alert('No emails to copy.'); return; }
    navigator.clipboard.writeText(emails);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const batches = Array.from(new Set(registrations.map(r => r.batch_date))).filter(Boolean);

  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = !searchQuery || 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.phone.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesBatch = selectedBatch === 'all' || r.batch_date === selectedBatch;
    
    return matchesSearch && matchesBatch;
  });

  const totalPaid = filteredRegistrations.reduce((acc, reg) => acc + (999 * reg.group_size), 0);
  const totalPending = filteredRegistrations.reduce((acc, reg) => {
    const base = getBasePrice(reg.sharing_type);
    const total = (base - reg.discount_per_person) * reg.group_size;
    const paid = 999 * reg.group_size;
    return acc + (total - paid);
  }, 0);
  
  const filteredInfluencers = !searchQuery ? influencers : influencers.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredAmbassadors = !searchQuery ? ambassadors : ambassadors.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isUnlocked) return <PasswordGate onUnlock={() => setIsUnlocked(true)} />;

  const tabs = [
    { key: 'registrations', label: 'Trip Registrations', icon: Users, count: registrations.length, color: 'sunrise-gold' },
    { key: 'influencers', label: 'Influencer Collabs', icon: Instagram, count: influencers.length, color: 'pink-400' },
    { key: 'ambassadors', label: 'Campus Ambassadors', icon: GraduationCap, count: ambassadors.length, color: 'blue-400' }
  ] as const;

  return (
    <div className="min-h-screen bg-himalaya-black text-white pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sunrise-gold hover:text-white transition-colors mb-4 text-sm font-bold uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-4">
              <img src="/images/logo_circular.png" alt="Logo" className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10" />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  Admin <span className="text-sunrise-gold">Dashboard</span>
                </h1>
                <p className="text-white/50 mt-1 text-sm md:text-base">Chopta Tungnath Trip 2026 — Lead Management</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={handleCopyEmails}
              className={`flex items-center gap-2 border px-5 py-2.5 rounded-full transition-all font-bold text-sm ${
                copySuccess ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
              }`}>
              {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copySuccess ? 'Copied Emails!' : 'Copy Email List'}
            </button>
            <button onClick={handleExport}
              className="flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 px-5 py-2.5 rounded-full hover:bg-green-500/20 transition-colors font-bold text-sm">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            {selectedIds.length > 0 && (
              <button onClick={handleBulkDelete}
                className="flex items-center gap-2 bg-red-500 text-white border border-red-600 px-5 py-2.5 rounded-full hover:bg-red-600 transition-colors font-bold text-sm">
                <Trash2 className="w-4 h-4" />
                Delete Selected ({selectedIds.length})
              </button>
            )}
            <button onClick={handleDeleteAll}
              className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 px-5 py-2.5 rounded-full hover:bg-red-500/20 transition-colors font-bold text-sm">
              <Trash2 className="w-4 h-4" />
              Delete All
            </button>
            <button onClick={fetchData} disabled={loading}
              className="flex items-center gap-2 glass px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 text-sm">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 px-5 py-2.5 rounded-full hover:bg-red-500/20 transition-colors text-sm">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="glass-dark p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-sunrise-gold/10 flex items-center justify-center mb-3 text-sunrise-gold">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-sm text-white/50 mb-1">Total Leads</p>
            <p className="text-4xl font-bold">{registrations.length + influencers.length + ambassadors.length}</p>
          </div>
          <div className="glass-dark p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center mb-3 text-pink-400">
              <Instagram className="w-5 h-5" />
            </div>
            <p className="text-sm text-white/50 mb-1">Influencer Leads</p>
            <p className="text-4xl font-bold">{influencers.length}</p>
          </div>
          <div className="glass-dark p-6 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 text-blue-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <p className="text-sm text-white/50 mb-1">Ambassador Leads</p>
            <p className="text-4xl font-bold">{ambassadors.length}</p>
          </div>
        </div>

        {/* Tabs & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {tabs.map(({ key, label, icon: Icon, count }) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-colors ${
                  activeTab === key ? 'bg-sunrise-gold text-black' : 'glass text-white/70 hover:text-white hover:bg-white/10'
                }`}>
                <Icon className="w-4 h-4" />
                {label}
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${activeTab === key ? 'bg-black/20' : 'bg-white/10'}`}>{count}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {activeTab === 'registrations' && (
              <select
                value={selectedBatch}
                onChange={e => setSelectedBatch(e.target.value)}
                aria-label="Filter by Batch"
                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sunrise-gold/50 transition-all"
              >
                <option value="all">All Batches</option>
                {batches.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            )}

            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-sunrise-gold transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, email or phone..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-sunrise-gold/50 transition-all placeholder:text-white/20"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-6">
            <p className="font-bold">Error loading data</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        )}

        {/* Table */}
        <div className="glass overflow-hidden rounded-3xl border border-white/10">
          <div className="overflow-x-auto">

            {/* REGISTRATIONS TABLE */}
            {activeTab === 'registrations' && (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                    <th className="px-5 py-4 font-medium">
                      <input 
                        type="checkbox" 
                        onChange={() => handleSelectAll(filteredRegistrations.map(r => r.id))} 
                        checked={selectedIds.length === filteredRegistrations.length && filteredRegistrations.length > 0} 
                        className="rounded border-white/20 bg-white/5 text-sunrise-gold focus:ring-sunrise-gold"
                      />
                    </th>
                    <th className="px-5 py-4 font-medium"><Clock className="w-3 h-3 inline mr-1" />Submitted</th>
                    <th className="px-5 py-4 font-medium">Traveler Info</th>
                    <th className="px-5 py-4 font-medium">Batch</th>
                    <th className="px-5 py-4 font-medium">Sharing</th>
                    <th className="px-5 py-4 font-medium">Group / Members</th>
                    <th className="px-5 py-4 font-medium">Paid</th>
                    <th className="px-5 py-4 font-medium">Pending</th>
                    <th className="px-5 py-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading && registrations.length === 0 ? (
                    <tr><td colSpan={15} className="px-5 py-12 text-center text-white/50">Loading...</td></tr>
                  ) : filteredRegistrations.length === 0 ? (
                    <tr><td colSpan={9} className="px-5 py-12 text-center text-white/50">No registrations match your search.</td></tr>
                  ) : filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className={`hover:bg-white/5 transition-colors ${selectedIds.includes(reg.id) ? 'bg-white/5' : ''}`}>
                      <td className="px-5 py-4 align-top">
                        <input 
                          type="checkbox" 
                          onChange={() => handleSelectOne(reg.id)} 
                          checked={selectedIds.includes(reg.id)} 
                          className="rounded border-white/20 bg-white/5 text-sunrise-gold focus:ring-sunrise-gold"
                        />
                      </td>
                      <td className="px-5 py-4 align-top whitespace-nowrap">
                        <span className="text-white/60 text-xs">{formatDateTime(reg.created_at)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold mb-1">{reg.name}</p>
                        <div className="space-y-0.5 text-white/60">
                          <p className="flex items-center gap-1"><Mail className="w-3 h-3" /><a href={`mailto:${reg.email}`} className="hover:text-white transition-colors">{reg.email}</a></p>
                          <p className="flex items-center gap-1"><Phone className="w-3 h-3" /><a href={`tel:${reg.phone}`} className="hover:text-white transition-colors">{reg.phone}</a></p>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-bold border border-white/10 bg-white/5 whitespace-nowrap">{reg.batch_date}</span>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-bold border border-sunrise-gold/30 bg-sunrise-gold/10 text-sunrise-gold whitespace-nowrap">
                          {reg.sharing_type ? `${reg.sharing_type.charAt(0).toUpperCase() + reg.sharing_type.slice(1)}` : 'Quad'}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top max-w-[200px]">
                        <p className="text-white font-medium text-xs mb-1">{reg.registration_type === 'group' ? `Group (${reg.group_size})` : 'Solo'}</p>
                        <p className="text-white/50 text-xs line-clamp-2">{reg.member_names || '—'}</p>
                        {reg.group_contacts && (
                          <p className="text-white/30 text-xs line-clamp-2 mt-1">{reg.group_contacts}</p>
                        )}
                      </td>
                      <td className="px-5 py-4 align-top font-bold text-green-400">
                        ₹{(999 * reg.group_size).toLocaleString('en-IN')}
                      </td>
                      <td className="px-5 py-4 align-top font-bold text-white/70">
                        ₹{(((getBasePrice(reg.sharing_type) - reg.discount_per_person) * reg.group_size) - (999 * reg.group_size)).toLocaleString('en-IN')}
                      </td>
                      <td className="px-5 py-4 align-top text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => setViewingRegistration(reg)}
                            className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors" 
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <Link 
                            to={`/invoice/${reg.id}`} 
                            target="_blank"
                            className="p-2 rounded-lg bg-sunrise-gold/10 text-sunrise-gold hover:bg-sunrise-gold/20 transition-colors" 
                            title="View/Print Bill"
                          >
                            <FileText className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDelete('registrations', reg.id)} disabled={deletingId === reg.id}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-40" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-white/5 font-bold border-t border-white/10">
                    <td className="px-5 py-4" colSpan={5}>Total</td>
                    <td className="px-5 py-4 text-green-400">₹{totalPaid.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-4 text-white/70">₹{totalPending.toLocaleString('en-IN')}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            )}

            {/* INFLUENCERS TABLE */}
            {activeTab === 'influencers' && (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                    <th className="px-5 py-4 font-medium">
                      <input 
                        type="checkbox" 
                        onChange={() => handleSelectAll(filteredInfluencers.map(i => i.id))} 
                        checked={selectedIds.length === filteredInfluencers.length && filteredInfluencers.length > 0} 
                        className="rounded border-white/20 bg-white/5 text-sunrise-gold focus:ring-sunrise-gold"
                      />
                    </th>
                    <th className="px-5 py-4 font-medium"><Clock className="w-3 h-3 inline mr-1" />Submitted</th>
                    <th className="px-5 py-4 font-medium">Influencer Info</th>
                    <th className="px-5 py-4 font-medium">Instagram</th>
                    <th className="px-5 py-4 font-medium">Followers</th>
                    <th className="px-5 py-4 font-medium">Content Type</th>
                    <th className="px-5 py-4 font-medium">Gender</th>
                    <th className="px-5 py-4 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading && influencers.length === 0 ? (
                    <tr><td colSpan={8} className="px-5 py-12 text-center text-white/50">Loading...</td></tr>
                  ) : filteredInfluencers.length === 0 ? (
                    <tr><td colSpan={8} className="px-5 py-12 text-center text-white/50">No influencers match your search.</td></tr>
                  ) : filteredInfluencers.map((inf) => (
                    <tr key={inf.id} className={`hover:bg-white/5 transition-colors ${selectedIds.includes(inf.id) ? 'bg-white/5' : ''}`}>
                      <td className="px-5 py-4 align-top">
                        <input 
                          type="checkbox" 
                          onChange={() => handleSelectOne(inf.id)} 
                          checked={selectedIds.includes(inf.id)} 
                          className="rounded border-white/20 bg-white/5 text-sunrise-gold focus:ring-sunrise-gold"
                        />
                      </td>
                      <td className="px-5 py-4 align-top whitespace-nowrap">
                        <span className="text-white/60 text-xs">{formatDateTime(inf.created_at)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold mb-1">{inf.name}</p>
                        <div className="space-y-0.5 text-white/60">
                          <p className="flex items-center gap-1"><Mail className="w-3 h-3" /><a href={`mailto:${inf.email}`} className="hover:text-white transition-colors">{inf.email}</a></p>
                          <p className="flex items-center gap-1"><Phone className="w-3 h-3" /><a href={`tel:${inf.phone}`} className="hover:text-white transition-colors">{inf.phone}</a></p>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <a href={`https://instagram.com/${inf.instagram_handle?.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 transition-colors font-medium">
                          <Instagram className="w-3 h-3" />
                          {inf.instagram_handle?.startsWith('@') ? inf.instagram_handle : `@${inf.instagram_handle}`}
                        </a>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs border border-white/10 font-bold">{inf.followers_count}</span>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="text-white/70 text-xs">{inf.content_type || '—'}</span>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="text-white/70 text-xs">{inf.gender || '—'}</span>
                      </td>
                      <td className="px-5 py-4 align-top text-center">
                        <button onClick={() => handleDelete('influencers', inf.id)} disabled={deletingId === inf.id}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-40" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* AMBASSADORS TABLE */}
            {activeTab === 'ambassadors' && (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                    <th className="px-5 py-4 font-medium">
                      <input 
                        type="checkbox" 
                        onChange={() => handleSelectAll(filteredAmbassadors.map(a => a.id))} 
                        checked={selectedIds.length === filteredAmbassadors.length && filteredAmbassadors.length > 0} 
                        className="rounded border-white/20 bg-white/5 text-sunrise-gold focus:ring-sunrise-gold"
                      />
                    </th>
                    <th className="px-5 py-4 font-medium"><Clock className="w-3 h-3 inline mr-1" />Submitted</th>
                    <th className="px-5 py-4 font-medium">Student Info</th>
                    <th className="px-5 py-4 font-medium">College</th>
                    <th className="px-5 py-4 font-medium">Year</th>
                    <th className="px-5 py-4 font-medium">DOB</th>
                    <th className="px-5 py-4 font-medium">Gender</th>
                    <th className="px-5 py-4 font-medium">Societies</th>
                    <th className="px-5 py-4 font-medium">Why Join</th>
                    <th className="px-5 py-4 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading && ambassadors.length === 0 ? (
                    <tr><td colSpan={10} className="px-5 py-12 text-center text-white/50">Loading...</td></tr>
                  ) : filteredAmbassadors.length === 0 ? (
                    <tr><td colSpan={10} className="px-5 py-12 text-center text-white/50">No ambassadors match your search.</td></tr>
                  ) : filteredAmbassadors.map((amb) => (
                    <tr key={amb.id} className={`hover:bg-white/5 transition-colors ${selectedIds.includes(amb.id) ? 'bg-white/5' : ''}`}>
                      <td className="px-5 py-4 align-top">
                        <input 
                          type="checkbox" 
                          onChange={() => handleSelectOne(amb.id)} 
                          checked={selectedIds.includes(amb.id)} 
                          className="rounded border-white/20 bg-white/5 text-sunrise-gold focus:ring-sunrise-gold"
                        />
                      </td>
                      <td className="px-5 py-4 align-top whitespace-nowrap">
                        <span className="text-white/60 text-xs">{formatDateTime(amb.created_at)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold mb-1">{amb.name}</p>
                        <div className="space-y-0.5 text-white/60">
                          <p className="flex items-center gap-1"><Mail className="w-3 h-3" /><a href={`mailto:${amb.email}`} className="hover:text-white transition-colors">{amb.email}</a></p>
                          <p className="flex items-center gap-1"><Phone className="w-3 h-3" /><a href={`tel:${amb.phone}`} className="hover:text-white transition-colors">{amb.phone}</a></p>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs border border-blue-500/30">{amb.college}</span>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="text-white/70 text-xs whitespace-nowrap">{amb.year_of_study || '—'}</span>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="text-white/70 text-xs whitespace-nowrap">{amb.date_of_birth || '—'}</span>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="text-white/70 text-xs">{amb.gender || '—'}</span>
                      </td>
                      <td className="px-5 py-4 align-top max-w-[160px]">
                        <span className="text-white/70 text-xs">{amb.societies || '—'}</span>
                      </td>
                      <td className="px-5 py-4 align-top max-w-[200px]">
                        <p className="text-white/80 text-xs line-clamp-3 hover:line-clamp-none transition-all cursor-pointer">
                          {amb.why_join || '—'}
                        </p>
                      </td>
                      <td className="px-5 py-4 align-top text-center">
                        <button onClick={() => handleDelete('ambassadors', amb.id)} disabled={deletingId === amb.id}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-40" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Full Screen Details View */}
          {viewingRegistration && (
            <div className="fixed inset-0 bg-[#050505] z-50 overflow-y-auto">
              <div className="min-h-screen flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a] sticky top-0 z-10">
                  <div>
                    <h2 className="text-xl font-bold text-glow">Registration Details</h2>
                    <p className="text-sm text-white/60 mt-1">ID: {viewingRegistration.id}</p>
                  </div>
                  <button 
                    onClick={() => setViewingRegistration(null)}
                    className="p-3 hover:bg-white/5 rounded-full transition-colors flex items-center gap-2 border border-white/10"
                    title="Close"
                  >
                    <X className="w-5 h-5 text-white" />
                    <span className="text-sm text-white font-medium">Close</span>
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-10 space-y-8 max-w-5xl mx-auto w-full flex-1">
                  {/* Personal Info */}
                  <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-xs uppercase tracking-widest text-sunrise-gold mb-4 font-bold">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-white/60">Name</p>
                        <p className="text-white font-medium text-lg">{viewingRegistration.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Email</p>
                        <p className="text-white font-medium">{viewingRegistration.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Phone</p>
                        <p className="text-white font-medium">{viewingRegistration.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Gender</p>
                        <p className="text-white font-medium capitalize">{viewingRegistration.gender}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Occupation</p>
                        <p className="text-white font-medium capitalize">{viewingRegistration.occupation}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">College</p>
                        <p className="text-white font-medium">{viewingRegistration.college || '—'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Trip Info */}
                  <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-xs uppercase tracking-widest text-sunrise-gold mb-4 font-bold">Trip Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <p className="text-xs text-white/60">Batch Date</p>
                        <p className="text-white font-medium">{viewingRegistration.batch_date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Sharing Type</p>
                        <p className="text-white font-medium capitalize">{viewingRegistration.sharing_type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Registration Type</p>
                        <p className="text-white font-medium capitalize">{viewingRegistration.registration_type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Group Size</p>
                        <p className="text-white font-medium">{viewingRegistration.group_size}</p>
                      </div>
                    </div>
                  </div>

                  {/* Group Members */}
                  {(viewingRegistration.member_names || viewingRegistration.group_contacts) && (
                    <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
                      <h3 className="text-xs uppercase tracking-widest text-sunrise-gold mb-4 font-bold">Group Members</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {viewingRegistration.member_names && (
                          <div>
                            <p className="text-xs text-white/60">Member Names</p>
                            <div className="mt-1 bg-black/20 p-4 rounded-xl border border-white/5">
                              <p className="text-white whitespace-pre-wrap">{viewingRegistration.member_names}</p>
                            </div>
                          </div>
                        )}
                        {viewingRegistration.group_contacts && (
                          <div>
                            <p className="text-xs text-white/60">Member Contacts</p>
                            <div className="mt-1 bg-black/20 p-4 rounded-xl border border-white/5">
                              <p className="text-white whitespace-pre-wrap">{viewingRegistration.group_contacts}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-xs uppercase tracking-widest text-sunrise-gold mb-4 font-bold">Additional Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <p className="text-xs text-white/60">Male Count</p>
                        <p className="text-white font-medium">{viewingRegistration.male_count}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Female Count</p>
                        <p className="text-white font-medium">{viewingRegistration.female_count}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Discount Per Person</p>
                        <p className="text-white font-medium">₹{viewingRegistration.discount_per_person}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60">Campus Ambassador</p>
                        <p className="text-white font-medium">{viewingRegistration.is_campus_ambassador ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Export hint */}
          <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-xs text-white/30">
            <span>To import into Google Sheets: open Sheets → File → Import → Upload the CSV</span>
            <button onClick={handleExport} className="flex items-center gap-1 text-green-400/60 hover:text-green-400 transition-colors">
              <Download className="w-3 h-3" /> Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
