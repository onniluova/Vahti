export default function AnalyticsCard({ endpoint, liveStats }) {
    if (!endpoint) return null;

    const formatDate = (isoString) => {
    
        if (!isoString) return "Never";
    
        const date = new Date(isoString);
        
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    return (
        <li 
            className="
                group relative flex flex-col justify-between h-full w-full p-5 gap-2 rounded-xl
                bg-white/5 hover:bg-white/10 
                border border-emerald-500/50 hover:border-emerald-500/50
                transition-all duration-300 ease-out
                hover:scale-105 hover:z-10 hover:shadow-2xl hover:shadow-emerald-900/20
                cursor-pointer
            "
            >
            <div className="flex justify-between items-start">
                <span className="text-white font-medium text-sm truncate w-full pr-2">
                    {endpoint.name || "Unnamed"}
                </span>
                {liveStats?.is_up !== undefined && (
                    <div className={'w-2 h-2 rounded-full shrink-0 mt-1 group-hover:animate-pulse'
                        ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)"
                        : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)"
                    }>
                    </div> 
                )}
            </div>

            <div className="relative h-auto w-full gap-1">
                
                <span className="
                    top-0 left-0 w-full
                    text-emerald-200 text-[10px] font-mono break-all line-clamp-2 leading-tight
                    transition-all duration-300
                    group-hover:opacity-0 group-hover:translate-y-2
                ">
                
                    {liveStats?.is_up !== undefined && (
                        <div className={`flex flex-col gap-1 ${liveStats?.is_up? "text-emerald-200" : "text-red-500"}`}>
                            <ul>
                                <li className="text-xs">{liveStats.is_up ? "ONLINE" : "OFFLINE"}</li>
                                <li>Status code: {liveStats.status_code}</li>
                                <li>Last check: {formatDate(liveStats.checked_at)}</li>
                            </ul>
                        </div>
                    )}
                </span>

                <div className="
                    top-0 left-0 w-full flex items-center gap-2
                    text-white text-xs font-bold uppercase tracking-wider
                    opacity-0 translate-y-2
                    transition-all duration-300
                    group-hover:opacity-100 group-hover:translate-y-0
                ">
                    <span>See full analysis</span>
                    {endpoint.url}
                </div>

            </div>
            </li>
     );
}