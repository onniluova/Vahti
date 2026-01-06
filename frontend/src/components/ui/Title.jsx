import React from "react";

export default function Title({ children, className = "", ...props }) {
    return (
        <h1 
            className={`font-bold text-white tracking-tight ${className}`}
            {...props}
        >
            {children}
        </h1>
    )
}