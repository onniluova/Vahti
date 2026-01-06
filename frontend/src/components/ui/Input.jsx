export default function Input({ className = "", ...props}) {
    return (
        <input 
            className={`w-full text-white px-4 py-3 rounded-xl border border-white/10 bg-gray-200/20 focus:bg-gray-100/50 placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all ${className}`}
            type="text"
            {...props}
        />
    )
}