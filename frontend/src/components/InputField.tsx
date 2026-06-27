import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  id,
  className = "",
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="mb-4">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-dark-text mb-1.5"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-dark-text outline-none transition-all duration-200
          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-200 focus:border-primary-yellow focus:ring-4 focus:ring-primary-soft"
          } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
