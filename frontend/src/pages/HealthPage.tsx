import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import { healthCheck } from '../api/api';
import type { HealthResponse } from '../types';
import { ERROR_MESSAGES, TEXT } from '../constants';

export default function HealthPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHealth = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await healthCheck();
      setHealth(data);
    } catch (err: any) {
      setError(err.message || ERROR_MESSAGES.HEALTH_CHECK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number | undefined) => {
    if (!seconds) return 'N/A';
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{TEXT.SYSTEM_HEALTH_TITLE}</h1>
          <p className="text-gray-600">{TEXT.SYSTEM_HEALTH_DESC}</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <ErrorMessage message={error} onRetry={fetchHealth} />
          </div>
        ) : health ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{TEXT.STATUS_LABEL}</h2>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    health.ok
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {health.ok ? TEXT.STATUS_OPERATIONAL : TEXT.STATUS_DOWN}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-600 mb-1">{TEXT.VERSION_LABEL}</p>
                  <p className="text-2xl font-bold text-gray-900">{health.version}</p>
                </div>

                {health.uptime !== undefined && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">{TEXT.UPTIME_LABEL}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatUptime(health.uptime)}
                    </p>
                  </div>
                )}

                {health.timestamp && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">{TEXT.LAST_CHECK_LABEL}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(health.timestamp).toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-600 mb-1">{TEXT.HEALTH_STATUS_LABEL}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {health.ok ? TEXT.ALL_SYSTEMS_OK : TEXT.SERVICE_UNAVAILABLE}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p className="text-sm text-blue-700">{TEXT.HEALTH_REFRESH_NOTICE}</p>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
