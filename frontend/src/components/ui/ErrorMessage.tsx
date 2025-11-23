import { MdError } from 'react-icons/md';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="rounded-lg bg-red-50 border border-red-200 p-4">
      <div className="flex">
        <MdError className="h-5 w-5 text-red-400" />
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-800">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-3 text-sm font-medium text-red-800 hover:text-red-600"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
