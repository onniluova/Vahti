export default function AppTab({ settings, theme, toggleTheme }) {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-white font-semibold text-lg border-b border-white/10 pb-2">App Preferences</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-2">
                    <span className="text-white text-sm">Dark Mode</span>
                    <button 
                        onClick={toggleTheme}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${theme === 'dark' ? 'bg-emerald-500' : 'bg-slate-600'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>

                <div className="flex items-center justify-between p-2">
                    <span className="text-white text-sm">Auto-Refresh</span>
                    <button 
                        onClick={() => setSettings(p => ({...p, autoRefreshDashboard: !p.autoRefreshDashboard}))}
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${settings.autoRefreshDashboard ? 'bg-emerald-500' : 'bg-slate-600'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${settings.autoRefreshDashboard ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>
                
                <div className="flex items-center justify-between p-2 opacity-50">
                    <span className="text-white text-sm">Email Alerts</span>
                    <div className="w-12 h-6 rounded-full p-1 bg-slate-600">
                        <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                    </div>
                </div>
            </div>
        </div>
    )
}