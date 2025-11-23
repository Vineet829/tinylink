import type { ReactNode } from 'react';
import { MdInfoOutline } from 'react-icons/md';

interface EmptyStateProps {
  message: string;
  action?: ReactNode;
}

export default function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <MdInfoOutline className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">{message}</h3>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
