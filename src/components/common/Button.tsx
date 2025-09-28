import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 
        disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-[0.98] ${className}`}
    >
      {loading ? (
        <>
          {/* ✅ Beautiful animated spinner */}
          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
