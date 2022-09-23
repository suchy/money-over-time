export const Input = ({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`h-9 border border-gray-300 px-3 text-sm ${className}`}
      {...props}
    />
  );
};
