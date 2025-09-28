import React from "react";
import { Field, ErrorMessage } from "formik";

interface TextFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  type = "text",
  placeholder,
  icon,
  className = "",
}) => {
  return (
    <div className="space-y-1">
      {/* input + icon wrapper */}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none">
            {icon}
          </span>
        )}

        <Field
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full ${icon ? "pl-10" : "pl-3"} pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
      </div>

      {/* error message below */}
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default TextField;
