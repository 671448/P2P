import { useRef, useEffect } from 'react';

interface ReusableDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  content?: string;
}

export default function ReusableDialog({
  isOpen,
  onClose,
  children,
  className,
}: ReusableDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (dialogRef.current && e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} className={className || ''} onClick={handleOutsideClick}>
      {children}
    </dialog>
  );
}
