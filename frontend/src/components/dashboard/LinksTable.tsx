import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type { Link } from '../../types';
import { formatDate, truncateUrl, copyToClipboard } from '../../utils/helpers';
import { HiCheckCircle, HiOutlineClipboard } from 'react-icons/hi';
import { TEXT } from '../../constants';

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
    if (confirm(`${TEXT.DELETE_ACTION_CONFIRM} "${code}"?`)) {
      onDelete(code);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">{TEXT.YOUR_LINKS_TITLE}</h2>
        <input
          type="text"
          placeholder={TEXT.SEARCH_PLACEHOLDER}
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
                  <span>{TEXT.SHORT_CODE_LABEL}</span>
                  {sortField === 'code' && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                {TEXT.TARGET_URL_LABEL}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('totalClicks')}
              >
                <div className="flex items-center space-x-1">
                  <span>{TEXT.CLICKS_LABEL}</span>
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
                  <span>{TEXT.LAST_CLICKED_LABEL}</span>
                  {sortField === 'lastClickedAt' && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                {TEXT.ACTIONS_LABEL}
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
                      title={TEXT.COPY_URL}
                    >
                      {copiedCode === link.code ? (
                        <HiCheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <HiOutlineClipboard className="w-4 h-4" />
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
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 cursor-pointer"
                    >
                      {TEXT.STATS_LINK_TEXT}
                    </RouterLink>
                    <button
                      onClick={() => handleDelete(link.code)}
                      disabled={deleting === link.code}
                      className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                    >
                      {deleting === link.code ? TEXT.DELETING_TEXT : TEXT.DELETE_BUTTON_TEXT}
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
          {searchTerm ? TEXT.EMPTY_SEARCH_RESULTS : TEXT.EMPTY_LINKS}
        </p>
      )}
    </div>
  );
}
