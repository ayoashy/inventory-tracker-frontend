import React from 'react'

export const BrandLogo = ({className}: {className?: string}) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        className={`w-8 h-8 ${className}`}
      >
        <circle cx="25" cy="25" r="23" fill="#2563eb" />
        <path d="M20 15h10v3h-3.5v17h-3V18H20z" fill="white" />
        <path
          d="M15 35l5-7 5 3 5-10 5 5"
          stroke="white"
          stroke-width="2"
          fill="none"
        />
      </svg>
    </div>
  );
}