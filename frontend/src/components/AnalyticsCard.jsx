import { BeatLoader } from 'react-spinners';
import Button from './Button';
import { HiMiniTrash } from "react-icons/hi2";
import { deleteEndpoint } from '../services/endpointService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AnalyticsCard({ endpoint, liveStats, onDelete }) {
    const [loading, setLoading] = useState(false)
    if (!endpoint) return null;

    const formatDate = (isoString) => {
        if (!isoString) return "Never";
        const date = new Date(isoString);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const handleDeleteClick = async (endpoint_id) => {
        setLoading(true);

        try {
            await deleteEndpoint(endpoint_id)
            toast.success("Endpoint deleted.")

            if (onDelete) onDelete(endpoint_id);
        } catch(error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to delete endpoint.";
            toast.error(errorMessage);
        }
        finally {
            setLoading(false)
        }
    }

    let statusColor = "bg-slate-500 shadow-[0_0_8px_rgba(100,116,139,0.5)]";
    let statusText = "PENDING";
    let textColor = "text-slate-300";

    if (liveStats?.is_up === true) {
        statusColor = "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]";
        statusText = "ONLINE";
        textColor = "text-emerald-200";
    } else if (liveStats?.is_up === false) {
        statusColor = "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]";
        statusText = "OFFLINE";
        textColor = "text-red-400";
    }

    const showContent = liveStats !== undefined;

    return (
        <li 
            className="
                group relative flex flex-col h-full w-full p-5 gap-3 rounded-xl
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
                
                {showContent && (
                    <div className={`w-2 h-2 rounded-full shrink-0 mt-1 group-hover:animate-pulse ${statusColor}`} /> 
                )}
            </div>

            <div className="grid grid-cols-1 grid-rows-1 flex-grow items-end">
                
                <span className="
                    col-start-1 row-start-1 w-full
                    transition-all duration-300 ease-in-out
                    opacity-100 translate-y-0
                    group-hover:opacity-0 group-hover:translate-y-2 group-hover:pointer-events-none">
                    {showContent ? (
                        <div className={`flex flex-col gap-1 ${textColor}`}>
                            <ul>
                                <li className="text-xs font-bold">{statusText}</li>
                                <li className="text-xs font-bold">Status code: {liveStats.status_code}</li>
                                <li className="text-xs font-bold">Last: {formatDate(liveStats.checked_at)}</li>
                            </ul>
                        </div>
                    ) : (
                        <div className="mt-2 opacity-50">
                            <BeatLoader color="#34d399" size={8} margin={2} />
                        </div>
                    )}
                </span>

                <div className="
                    col-start-1 row-start-1 w-full flex flex-col justify-end gap-2
                    transition-all duration-300 ease-in-out
                    opacity-100 translate-y-0
                    md:opacity-0 md:translate-y-2
                    md:group-hover:opacity-100 md:group-hover:translate-y-0">
                    <div className='flex flex-col text-white'>
                        <span className='hidden md:flex'>See full analysis</span>
                        <span className="hidden md:flex text-[10px] font-normal normal-case opacity-70 truncate">{endpoint.url}</span>
                    </div>
                    <div className='flex justify-end text-white'>
                        <Button onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(endpoint.id);
                            }}
                        className="bg-red-500/5 border border-solid border-red-500/15 max-w-sm justify-right items-left text-white">
                        <HiMiniTrash />
                        </Button>
                        </div> 
                </div>
            </div>
        </li>
    );
}