import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  variant?: 'success' | 'error';
}

export function Toast({ message, variant = 'success' }: ToastProps) {
  const variantStyles = {
    success: 'bg-emerald-500 text-white',
    error: 'bg-red-500 text-white',
  };

  return (
    <div
      className={cn(
        'rounded-2xl px-4 py-3 text-sm shadow-lg shadow-black/10',
        variantStyles[variant]
      )}
    >
      {message}
    </div>
  );
}
