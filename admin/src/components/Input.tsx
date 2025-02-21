import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type?: "text" | "password" | "email" | "search" | "number" | "file";
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    icon?: React.ElementType;
    error?: string;
    className?: string;
    inputRef?: React.RefObject<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder = "Enter text...",
    icon: Icon,
    error,
    className = "",
    inputRef,
    ...props
}) => {
    return (
        <div className={`w-full ${className}`}>
            {/* Label */}
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            {/* Input Wrapper */}
            <div className="relative">
                {/* Icon (if provided) */}
                {Icon && (
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                        <Icon className="w-5 h-5" />
                    </span>
                )}

                {/* Input Field */}
                <input
                    ref={inputRef}
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={clsx(`w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none ${Icon ? "pl-10" : ""
                        } ${error ? "border-red-500" : "border-gray-300"} transition`, className)}
                    {...props}
                />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default Input;
