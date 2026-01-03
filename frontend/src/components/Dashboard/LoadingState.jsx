import { RotateLoader } from 'react-spinners';

export default function LoadingState({ message = "Syncing data..." }) {
    return (
        <div className="flex-grow flex flex-col items-center justify-center gap-4 py-10">
            <RotateLoader color="#34d399" size={10} />
            <span className="text-white/50 text-sm animate-pulse">{message}</span>
        </div>
    );
}