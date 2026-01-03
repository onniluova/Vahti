import Button from "../Button"

export default function MonitoringTab({}) {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-red-200 font-semibold text-lg border-b border-red-500/20 pb-2">Account</h2>
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20 flex flex-col gap-4">
                <div className="text-sm text-red-200/80">
                    <p className="font-bold text-red-100 mb-1">Delete Account</p>
                    <p className="leading-relaxed">Permanently remove your account and all data. This action cannot be undone.</p>
                </div>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg shadow-lg shadow-red-900/20">
                    Delete Account
                </Button>
            </div>
        </div>
    )
}