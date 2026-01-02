import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Analytics from "../components/Analytics";
import { useState, useEffect } from 'react';
import AddEndpointModal from "../components/AddEndpointModal";
import DetailedAnalyticsModal from "../components/DetailedAnalyticsModal";
import { AnimatePresence } from "framer-motion";

const Dashboard = () => {
    const [onAddEndpoint, setOnAddEndpoint] = useState(false);
    const [selectedEndpointId, setSelectedEndpointId] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleSuccess = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshTrigger(prev => prev + 1);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-emerald-700 to-violet-700 flex flex-col p-4 gap-5 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            <Navbar />

            <div className="flex flex-grow flex-col justify-center items-center gap-6 z-10">
                <Analytics 
                refreshTrigger={refreshTrigger} 
                onCardClick={(id) => setSelectedEndpointId(id)}
                onDelete={handleSuccess}
                />
                
                <Button 
                    onClick={() => setOnAddEndpoint(true)}
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 px-8 py-3 rounded-xl shadow-lg transition-all"
                >
                    + Add new endpoint
                </Button>
            </div>

            <AnimatePresence>
                {onAddEndpoint && (
                    <AddEndpointModal 
                        onClose={() => setOnAddEndpoint(false)} 
                        onSuccess={handleSuccess}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedEndpointId && (
                    <DetailedAnalyticsModal 
                        endpoint_id={selectedEndpointId}
                        onClose={() => setSelectedEndpointId(false)} 
                    />
                )}
            </AnimatePresence>

            <div className="text-center mt-auto text-white/50 text-xs py-4">
                © 2025 Vahti - Created by Onni Luova
            </div>
        </div>
    );
}

export default Dashboard;