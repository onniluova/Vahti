import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateLoader } from "react-spinners";
import { IoClose, IoRefresh } from "react-icons/io5";
import toast from 'react-hot-toast';
import Header from "../ui/Title";
import Button from "../ui/Button";
import { getEndpointStats } from "../../services/endpointService";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
};

export default function DetailedAnalyticsModal({ onClose, endpoint_id }) {
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const loadAnalytics = async (isManualRefresh = false) => {
        if (isManualRefresh) setRefreshing(true);
        else setLoading(true);

        try {
            const response = await getEndpointStats(endpoint_id, startDate, endDate, 500);
            setHistory(response.data.history || []);
            setStats(response.data);
            if (isManualRefresh) toast.success("Refreshed successfully.");
        } catch (error) {
            toast.error("Failed to load stats.");
            if (!isManualRefresh) onClose();
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = () => loadAnalytics(true);

    useEffect(() => {
        if (endpoint_id) loadAnalytics();
    }, [endpoint_id, startDate, endDate]);

    const formattedData = history.map(item => ({
        timestamp: item.checked_at, 
        latency: item.latency_ms
    }));

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString([], { 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const isMultiDay = formattedData.length > 1 && 
    (new Date(formattedData[formattedData.length - 1].timestamp) - new Date(formattedData[0].timestamp)) > 24 * 60 * 60 * 1000;

    const dynamicTickFormatter = (value) => {
        return isMultiDay ? formatDate(value) : formatTime(value);
    };

    const formatTime = (dateStr) => {
        return new Date(dateStr).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        });
    };

    useEffect(() => {
        if (formattedData.length > 0) {
            console.log("Formatted Data:", formattedData);
        }
    }, [formattedData]);

    const getGradientOffset = () => {
        if (formattedData.length === 0) return 0;
        
        const dataMax = Math.max(...formattedData.map((i) => i.latency));
        const dataMin = Math.min(...formattedData.map((i) => i.latency));
        
        const total = formattedData.reduce((sum, item) => sum + item.latency, 0);
        const avg = total / formattedData.length;

        const threshold = avg * 1.5;

        if (dataMax <= 0) return 0;
        if (dataMin >= dataMax) return 0;

        const offset = (dataMax - threshold) / (dataMax - dataMin);
        
        return Math.min(Math.max(offset, 0), 1);
    };

    const off = getGradientOffset();

    const axisColor = "#ffffff"; 
    const goodColor = "#34d399";
    const badColor = "#f87171";

    return (
        <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
        >
            <motion.div 
                className="relative dark:bg-slate-900/30 w-full max-w-2xl bg-slate-900/15 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-4 right-4 flex flex-col sm:flex-row gap-2">
                    <button 
                        onClick={onClose}
                        className="order-1 sm:order-2 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
                    >
                        <IoClose size={24} />
                    </button>
                    <button 
                        onClick={handleRefresh}
                        disabled={loading || refreshing}
                        className="order-2 sm:order-1 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90 disabled:opacity-30"
                    >
                        <IoRefresh 
                            size={22} 
                            className={refreshing ? "animate-spin" : ""} 
                        />
                    </button>
                </div>

                <div className="mb-6 text-center pr-10 pl-10"> 
                    <Header className="text-white text-xl font-bold">
                        {stats?.endpoint_name || "Analytics"}
                    </Header>
                    {stats?.endpoint_url && (
                        <p className="text-white/40 text-[10px] break-all mt-0.5 mx-auto">
                            {stats.endpoint_url}
                        </p>
                    )}
                </div>

                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <RotateLoader color={goodColor} size={10} />
                    </div>
                ) : (
                    <div className="flex flex-col w-full text-white">
                        <div className="h-64 w-full">
                            {formattedData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                                        <defs>
                                            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset={off} stopColor={badColor} stopOpacity={1} />
                                                <stop offset={off} stopColor={goodColor} stopOpacity={1} />
                                            </linearGradient>
                                        </defs>

                                        <XAxis 
                                            dataKey="timestamp" 
                                            stroke={axisColor}
                                            opacity={0.3}
                                            tick={{ fontSize: 10 }}
                                            tickLine={false}
                                            axisLine={false}
                                            minTickGap={40}
                                            tickFormatter={dynamicTickFormatter} 
                                            dy={10}
                                        />
                                        
                                        <YAxis 
                                            stroke={axisColor} 
                                            opacity={0.3} 
                                            tick={{ fontSize: 10 }} 
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                color: '#fff'
                                            }}
                                            labelFormatter={(label) => `${formatDate(label)} ${formatTime(label)}`}
                                            itemStyle={{ color: '#fff' }}
                                        />

                                        <Line 
                                            type="monotone" 
                                            dataKey="latency" 
                                            stroke="url(#splitColor)" 
                                            strokeWidth={3}
                                            dot={false}
                                            activeDot={{ r: 4, fill: '#fff', strokeWidth: 0 }}
                                            animationDuration={1000}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex h-full items-center justify-center text-white/30 text-sm italic">
                                    No data available.
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center text-white/60 text-[11px] mt-4 px-1 uppercase tracking-widest font-bold">
                            <span>latency tracking</span>
                            <span className="text-emerald-400">Uptime: {stats?.uptime}%</span>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                            <div className="flex flex-col">
                                <span className="text-[9px] text-white/40 uppercase mb-1 ml-1">From</span>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="bg-transparent text-white text-xs outline-none cursor-pointer"
                                    style={{ colorScheme: "dark" }}
                                />
                            </div>
                            <div className="flex flex-col border-l border-white/10 pl-3">
                                <span className="text-[9px] text-white/40 uppercase mb-1 ml-1">To</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="bg-transparent text-white text-xs outline-none cursor-pointer"
                                    style={{ colorScheme: "dark" }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}