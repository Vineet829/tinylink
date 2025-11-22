import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { Link } from '../../types';
import { formatDate, truncateUrl, copyToClipboard } from '../../utils/helpers';

interface LinksTableProps {
  links: Link[];
  onDelete: (code: string) => void;
  deleting: string | null;
}

export default function LinksTable({ links, onDelete, deleting }: LinksTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Link>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;

  const filteredLinks = links.filter(
    (link) =>
      link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.targetUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedLinks = [...filteredLinks].sort((a, b) => {
    let aVal: any = a[sortField as keyof Link];
    let bVal: any = b[sortField as keyof Link];

    if (sortField === 'lastClickedAt') {
      aVal = a.lastClickedAt ? new Date(a.lastClickedAt).getTime() : 0;
      bVal = b.lastClickedAt ? new Date(b.lastClickedAt).getTime() : 0;
    }

    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleCopy = async (code: string) => {
    const shortUrl = `${baseUrl}/${code}`;
    const success = await copyToClipboard(shortUrl);
    if (success) {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const handleDelete = (code: string) => {
    if (confirm(`Are you sure you want to delete the link "${code}"?`)) {
      onDelete(code);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">Your Links</h2>
        <input
          type="text"
          placeholder="Search by code or URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('code')}
              >
                <div className="flex items-center space-x-1">
                  <span>Short Code</span>
                  {sortField === 'code' && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Target URL
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('totalClicks')}
              >
                <div className="flex items-center space-x-1">
                  <span>Clicks</span>
                  {sortField === 'totalClicks' && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('lastClickedAt')}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Clicked</span>
                  {sortField === 'lastClickedAt' && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedLinks.map((link) => (
              <tr key={link.code} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono text-indigo-600 font-semibold">
                      {link.code}
                    </code>
                    <button
                      onClick={() => handleCopy(link.code)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Copy short URL"
                    >
                      {copiedCode === link.code ? (
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={link.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                    title={link.targetUrl}
                  >
                    {truncateUrl(link.targetUrl, 60)}
                  </a>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-900 font-medium">{link.totalClicks}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-gray-600">{formatDate(link.lastClickedAt)}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="flex justify-end space-x-2">
                    <RouterLink
                      to={`/code/${link.code}`}
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Stats
                    </RouterLink>
                    <button
                      onClick={() => handleDelete(link.code)}
                      disabled={deleting === link.code}
                      className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                    >
                      {deleting === link.code ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedLinks.length === 0 && (
        <p className="text-center py-8 text-gray-500">
          {searchTerm ? 'No links found matching your search.' : 'No links yet.'}
        </p>
      )}
    </div>
  );
}
