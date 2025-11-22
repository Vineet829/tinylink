import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Loader2, MousePointer, Clock, Activity } from 'lucide-react';
import { fetchClient, LinkData, BASE_URL } from '../lib/api';
import StatCard from '../components/StatCard';

const StatsPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [stats, setStats] = useState<LinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;
    fetchClient(`/api/links/${code}`)
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-indigo-600" /></div>;
  if (error) return <div className="text-center p-20 text-red-600 font-medium">Error: {error}</div>;
  if (!stats) return <div className="text-center p-20 text-gray-500">Link not found</div>;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/')} className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition">
        <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
      </button>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Link Statistics</h1>
            <p className="text-sm text-gray-500 mt-1">Detailed metrics for <span className="font-mono text-indigo-600">/{stats.code}</span></p>
          </div>
          <a href={`${BASE_URL}/${stats.code}`} target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Visit Link <ExternalLink size={16} className="ml-2" />
          </a>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard icon={<MousePointer size={24} />} label="Total Clicks" value={stats.totalClicks} color="blue" />
          <StatCard icon={<Clock size={24} />} label="Created At" value={new Date(stats.createdAt).toLocaleDateString()} color="purple" />
          <StatCard icon={<Activity size={24} />} label="Last Clicked" value={stats.lastClickedAt ? new Date(stats.lastClickedAt).toLocaleString() : 'Never'} color="green" />
        </div>

        <div className="px-8 py-6 bg-gray-50/30 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Target Destination</p>
          <div className="bg-white border border-gray-200 rounded-lg p-3 break-all font-mono text-sm text-gray-700">
            {stats.targetUrl}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;