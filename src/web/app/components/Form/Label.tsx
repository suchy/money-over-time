export const Label = ({
  children,
  className = '',
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={`mb-4 block font-bold ${className}`} {...props}>
    {children}
  </label>
);
