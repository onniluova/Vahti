export default function AnalyticsGrid({ children, itemCount }) {
    const isFewItems = itemCount < 3;
    const containerClasses = isFewItems 
        ? "flex flex-wrap justify-center"
        : "grid grid-cols-2 md:grid-cols-3";

    const maskStyle = !isFewItems ? {
        maskImage: 'linear-gradient(to bottom, transparent, black 20px, black calc(100% - 20px), transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20px, black calc(100% - 20px), transparent)'
    } : {};

    return (
        <ul 
            className={`${containerClasses} gap-3 overflow-y-auto max-h-[60vh] p-4 scrollbar-hide`}
            style={maskStyle}
        >
            {children}
        </ul>
    );
}