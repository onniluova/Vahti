import { useEffect, useState } from "react";
import Header from "./Header";
import { getEndpoints } from "../services/endpointService";
import { RotateLoader } from 'react-spinners';
import AnalyticsCard from "./AnalyticsCard";
import useEndpointMonitor from "../hooks/useEndpointMonitor";

export default function Analytics({ refreshTrigger, onCardClick }) {
    const [endpoints, setEndpoints] = useState([]);
    const [loading, setLoading] = useState(true);

    const liveStats = useEndpointMonitor(endpoints);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getEndpoints();
                setEndpoints(response.data.endpoints);
            } catch(error) {
                console.log("Error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [refreshTrigger]);

    const isFewItems = endpoints.length < 3;
    const containerClasses = isFewItems 
        ? "flex flex-wrap justify-center"
        : "grid grid-cols-2 md:grid-cols-3";

    return ( 
        <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6 h-full">
            
            <div className="text-center flex-shrink-0">
                <Header className="text-white/95 text-4xl font-bold tracking-wide">
                    Analytics
                </Header>
                <p className="text-white/95 text-xs mt-1">
                    Manage and monitor your endpoints
                </p>
            </div>

            <div className="flex-grow flex flex-col relative min-h-[200px]">
                
                {loading && (
                    <div className="flex-grow flex flex-col items-center justify-center gap-4 py-10">
                        <RotateLoader color="#34d399" size={10} />
                        <span className="text-white/50 text-sm animate-pulse">Syncing data...</span>
                    </div>
                )}

                {!loading && endpoints.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed border-white/10 rounded-xl bg-white/5">
                        <p className="text-white/70">No endpoints found.</p>
                        <p className="text-white/30 text-xs mt-2">Add one to get started!</p>
                    </div>
                )}

                {!loading && endpoints.length > 0 && (
                    <ul 
                        className={`${containerClasses} gap-3 overflow-y-auto max-h-[60vh] p-4 scrollbar-hide`}
                        style={
                            !isFewItems ? {
                                maskImage: 'linear-gradient(to bottom, transparent, black 20px, black calc(100% - 20px), transparent)',
                                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20px, black calc(100% - 20px), transparent)'
                            } : {}
                        }
                    >
                        {endpoints.map(endpoint => (
                            <div 
                                key={endpoint.id} 
                                onClick={() => onCardClick(endpoint.id)}
                                className={`cursor-pointer hover:scale-105 transition-transform duration-200 ${isFewItems ? 'w-full max-w-sm' : ''}`}
                            >
                                <AnalyticsCard
                                    endpoint={endpoint}
                                    liveStats={liveStats[endpoint.id]}
                                />
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}