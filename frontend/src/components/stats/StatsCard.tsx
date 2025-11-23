import type { Link } from '../../types';
import { formatDate } from '../../utils/helpers';

interface StatsCardProps {
  link: Link;
  shortUrl: string;
}

export default function StatsCard({ link, shortUrl }: StatsCardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short URL
        </label>
        <div className="flex items-center space-x-2">
          <code className="flex-1 bg-white px-4 py-3 rounded border border-gray-300 text-indigo-600 font-mono font-semibold text-lg">
            {shortUrl}
          </code>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target URL
        </label>
        <a
          href={link.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white px-4 py-3 rounded border border-gray-300 text-blue-600 hover:underline break-all"
        >
          {link.targetUrl}
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-700 mb-1">Total Clicks</p>
              <p className="text-3xl font-bold text-indigo-900">{link.totalClicks}</p>
            </div>
            <svg className="w-12 h-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">Created</p>
              <p className="text-lg font-semibold text-green-900">
                {formatDate(link.createdAt)}
              </p>
            </div>
            <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 mb-1">Last Clicked</p>
              <p className="text-lg font-semibold text-purple-900">
                {formatDate(link.lastClickedAt)}
              </p>
            </div>
            <svg className="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
