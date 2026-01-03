import Input from "../../components/Input"
import Button from "../../components/Button"

export default function MonitoringTab({ settings, handleChange, handleSave, loading }) {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300 h-full">
            <h2 className="text-white font-semibold text-lg border-b border-white/10 pb-2">Monitoring Defaults</h2>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-white/80 uppercase tracking-wider">Check Interval (Min)</label>
                    <Input 
                        type="number"
                        name="checkInterval"
                        value={settings.checkInterval}
                        onChange={handleChange}
                        className="bg-white/5 border-white/10 focus:bg-white/10 text-white"
                        min="3"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-white/80 uppercase tracking-wider">Timeout (Sec)</label>
                    <Input 
                        type="number" 
                        name="requestTimeout"
                        value={settings.requestTimeout}
                        onChange={handleChange}
                        className="bg-white/5 border-white/10 focus:bg-white/10 text-white"
                        min="5"
                        max="60"
                    />
                </div>
            </div>
            <div className="mt-auto pt-4">
                <Button 
                    onClick={handleSave} 
                    disabled={loading}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 rounded-xl shadow-lg transition-all active:scale-95"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </div>
    )
}