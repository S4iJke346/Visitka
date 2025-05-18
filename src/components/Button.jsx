import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false,
  icon = null
}) {
  const baseClasses = "flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50 shadow-sm";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-400",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
    outline: "bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-400"
  };
  
  const sizeClasses = {
    sm: "text-sm py-1 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-6"
  };
  
  const disabledClasses = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}