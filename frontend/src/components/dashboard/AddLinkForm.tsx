import { useState } from 'react';
import { isValidUrl, isValidCode } from '../../utils/helpers';
import { createLink } from '../../api/api';
import ErrorMessage from '../ui/ErrorMessage';
import SuccessMessage from '../ui/SuccessMessage';

interface AddLinkFormProps {
  onSuccess: () => void;
}

export default function AddLinkForm({ onSuccess }: AddLinkFormProps) {
  const [targetUrl, setTargetUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [urlError, setUrlError] = useState('');
  const [codeError, setCodeError] = useState('');

  const validateTargetUrl = (url: string) => {
    if (!url) {
      setUrlError('URL is required');
      return false;
    }
    if (!isValidUrl(url)) {
      setUrlError('Please enter a valid URL (http:// or https://)');
      return false;
    }
    setUrlError('');
    return true;
  };

  const validateCustomCode = (code: string) => {
    if (code && !isValidCode(code)) {
      setCodeError('Code must be 6-8 alphanumeric characters');
      return false;
    }
    setCodeError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const isUrlValid = validateTargetUrl(targetUrl);
    const isCodeValid = validateCustomCode(customCode);

    if (!isUrlValid || !isCodeValid) {
      return;
    }

    setLoading(true);

    try {
      const data: any = { targetUrl };
      if (customCode) {
        data.code = customCode;
      }

      await createLink(data);
      setSuccess('Link created successfully!');
      setTargetUrl('');
      setCustomCode('');
      setTimeout(() => {
        setSuccess('');
        onSuccess();
      }, 1500);
    } catch (err: any) {
      if (err.message.includes('409') || err.message.toLowerCase().includes('exists')) {
        setError('This custom code is already taken. Please choose another one.');
      } else {
        setError(err.message || 'Failed to create link. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Short Link</h2>
      
      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} onRetry={() => setError('')} />
        </div>
      )}
      
      {success && (
        <div className="mb-4">
          <SuccessMessage message={success} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Target URL <span className="text-red-500">*</span>
          </label>
          <input
            id="targetUrl"
            type="text"
            value={targetUrl}
            onChange={(e) => {
              setTargetUrl(e.target.value);
              if (urlError) validateTargetUrl(e.target.value);
            }}
            onBlur={() => validateTargetUrl(targetUrl)}
            placeholder="https://example.com/very/long/url"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
              urlError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          />
          {urlError && (
            <p className="mt-1 text-sm text-red-600">{urlError}</p>
          )}
        </div>

        <div>
          <label htmlFor="customCode" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Short Code <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="customCode"
            type="text"
            value={customCode}
            onChange={(e) => {
              setCustomCode(e.target.value);
              if (codeError) validateCustomCode(e.target.value);
            }}
            onBlur={() => validateCustomCode(customCode)}
            placeholder="mycode (6-8 characters)"
            maxLength={8}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all ${
              codeError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          />
          {codeError && (
            <p className="mt-1 text-sm text-red-600">{codeError}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Leave empty for auto-generated code
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !!urlError || !!codeError}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium w-full sm:w-auto"
        >
          {loading ? 'Creating...' : 'Create Short Link'}
        </button>
      </form>
    </div>
  );
}
