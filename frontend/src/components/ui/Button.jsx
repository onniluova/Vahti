export default function Button({ children, onClick, className = "", variant = "glass", ...props }) {
    
    const baseStyles = "px-4 py-2 font-semibold rounded-lg transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
    
    const variants = {
        glass: "bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white shadow-lg",
        solid: "bg-white text-black hover:bg-gray-200 shadow-lg border border-transparent",
        ghost: "bg-transparent hover:bg-white/10 text-white/70 hover:text-white border border-transparent",
        danger: "bg-red-500/10 hover:bg-red-500/20 text-red-200 border border-red-500/20"
    };

    return (
        <button 
            onClick={onClick}
            className={`${baseStyles} ${variants[variant] || variants.glass} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}