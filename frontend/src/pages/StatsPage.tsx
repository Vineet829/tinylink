import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { HiInformationCircle } from 'react-icons/hi';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import StatsCard from '../components/stats/StatsCard';
import { getLinkStats } from '../api/api';
import type { Link } from '../types';
import { copyToClipboard } from '../utils/helpers';

export default function StatsPage() {
  const { code } = useParams<{ code: string }>();
  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;

  useEffect(() => {
    if (!code) return;

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getLinkStats(code);
        setLink(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load link statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [code]);

  const handleCopy = async () => {
    if (!link) return;
    const shortUrl = `${baseUrl}/${link.code}`;
    const success = await copyToClipboard(shortUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (error || !link) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <ErrorMessage message={error || 'Link not found'} />
            <div className="mt-4">
              <RouterLink
                to="/"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ← Back to Dashboard
              </RouterLink>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <RouterLink
            to="/"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Dashboard
          </RouterLink>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Link Statistics
                </h1>
                <p className="text-gray-600">
                  Detailed information for your short link
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
            </div>
          </div>

          <StatsCard link={link} shortUrl={`${baseUrl}/${link.code}`} />

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex items-center">
              <HiInformationCircle className="h-5 w-5 text-blue-400" />
              <p className="ml-3 text-sm text-blue-700">
                Share your short URL: <strong>{baseUrl}/{link.code}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
