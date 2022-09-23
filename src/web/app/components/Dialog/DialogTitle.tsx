import { ReactNode } from 'react';

interface DialogTitleProps {
  children: ReactNode;
}

export const DialogTitle = ({ children }: DialogTitleProps) => (
  <h1 className="mb-5 text-xl font-bold leading-none">{children}</h1>
);
