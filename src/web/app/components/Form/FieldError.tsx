export const FieldError = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  if (!children) {
    return null;
  }

  return (
    <p className={`text-red-500 ${className}`} {...props}>
      {children}
    </p>
  );
};
