import React from 'react';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={`rounded-xl border border-gray-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
