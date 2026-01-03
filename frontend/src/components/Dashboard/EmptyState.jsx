export default function EmptyState({ title = "No items found", subtitle = "Add one to get started!" }) {
    return (
        <div className="text-center py-10 border-2 border-dashed border-white/10 rounded-xl bg-white/5">
            <p className="text-white/70">{title}</p>
            <p className="text-white/30 text-xs mt-2">{subtitle}</p>
        </div>
    );
}