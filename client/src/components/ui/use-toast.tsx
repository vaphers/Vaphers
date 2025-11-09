import * as React from "react";

type ToastOptions = {
  title?: string;
  description?: string;
};

export function useToast() {
  const [toast, setToast] = React.useState<ToastOptions | null>(null);
  const [open, setOpen] = React.useState(false);

  function toastHandler(options: ToastOptions) {
    setToast(options);
    setOpen(true);
  }

  function onOpenChange(open: boolean) {
    setOpen(open);
  }

  return {
    toast,
    open,
    onOpenChange,
    toastHandler,
  };
}
