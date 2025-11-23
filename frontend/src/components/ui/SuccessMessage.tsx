import { MdCheckCircle, MdClose } from 'react-icons/md';

interface SuccessMessageProps {
  message: string;
  onDismiss?: () => void;
}

export default function SuccessMessage({ message, onDismiss }: SuccessMessageProps) {
  return (
    <div className="rounded-lg bg-green-50 border border-green-200 p-4">
      <div className="flex">
        <MdCheckCircle className="h-5 w-5 text-green-400" />
        <p className="ml-3 text-sm text-green-800">{message}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-auto text-green-500 hover:text-green-600"
          >
            <MdClose className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
