import * as React from "react";

interface ToastProps {
  title?: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Toast({ title, description, open, onOpenChange }: ToastProps) {
  React.useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(() => {
      onOpenChange(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed bottom-5 right-5 rounded bg-blue-600 p-4 text-white shadow-lg">
      {title && <div className="font-bold">{title}</div>}
      {description && <div className="mt-1 text-sm">{description}</div>}
    </div>
  );
}
