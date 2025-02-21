const ProgressBar = ({ progress }: { progress: number }) => {
    return (
        <div className="w-full bg-gray-200 rounded-lg h-4 overflow-hidden">
            <div
                className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;