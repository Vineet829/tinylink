import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import AddLinkForm from '../components/dashboard/AddLinkForm';
import LinksTable from '../components/dashboard/LinksTable';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import ErrorMessage from '../components/ui/ErrorMessage';
import { getAllLinks, deleteLink } from '../api/api';
import type { Link } from '../types';
import { ERROR_MESSAGES, TEXT } from '../constants';

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllLinks();
      setLinks(data);
    } catch (err: any) {
      setError(err.message || ERROR_MESSAGES.FETCH_LINKS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (code: string) => {
    setDeleting(code);
    try {
      await deleteLink(code);
      setLinks(links.filter((link) => link.code !== code));
    } catch (err: any) {
      alert(err.message || ERROR_MESSAGES.DELETE_LINK);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{TEXT.DASHBOARD_TITLE}</h1>
          <p className="text-gray-600">{TEXT.DASHBOARD_DESCRIPTION}</p>
        </div>

        <div className="space-y-8">
          <AddLinkForm onSuccess={fetchLinks} />

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <ErrorMessage message={error} onRetry={fetchLinks} />
            </div>
          ) : links.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <EmptyState message={TEXT.EMPTY_LINKS} />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <LinksTable links={links} onDelete={handleDelete} deleting={deleting} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
