type ScanPageProps = {
    onContinue: () => void;
};
export default function ScanPage({ onContinue }: ScanPageProps) {
    return (
        <div id="scan-page" className="flex flex-col h-full bg-white p-6 md:p-12">
            <div className="text-center pt-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Please hold still during this scan.
                </h1>
            </div>

            <div className="flex-grow flex items-center justify-center my-4">
                <div className="w-full max-w-xs mx-auto aspect-[3/4] rounded-2xl overflow-hidden relative md:max-w-sm">
                    <img
                        src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                        className="w-full h-full object-cover"
                        alt="Woman's face for scanning"
                        onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.onerror = null;
                            img.src = "https://placehold.co/600x800/e2e8f0/64748b?text=Camera+Feed";
                        }}
                    />
                    <div className="absolute inset-0">
                        <svg className="w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
                            <path d="M50,150 Q150,100 250,150" stroke="#EF4444" stroke-width="2" fill="none" />
                            <path d="M60,250 C100,280 200,280 240,250" stroke="#EF4444" stroke-width="2" fill="none" />
                            <path d="M70,120 L120,220" stroke="#EF4444" stroke-width="2" fill="none" />
                            <path d="M230,120 L180,220" stroke="#EF4444" stroke-width="2" fill="none" />

                            <path d="M80,130 Q150,180 220,130" stroke="#EF4444" stroke-width="2" fill="none" stroke-dasharray="4 4" />

                            <circle cx="150" cy="140" r="3" fill="#EF4444" />
                            <circle cx="130" cy="200" r="3" fill="#EF4444" />
                            <circle cx="170" cy="200" r="3" fill="#EF4444" />
                            <circle cx="150" cy="240" r="3" fill="#EF4444" />

                            <g transform="translate(135, 260)">
                                <path d="M15 2.25C11.64 2.25 9 4.89 9 8.25C9 12.12 15 18 15 18C15 18 21 12.12 21 8.25C21 4.89 18.36 2.25 15 2.25Z" fill="#EF4444" />
                                <text x="15" y="15" font-family="Inter, sans-serif" font-size="8" fill="white" text-anchor="middle" dy=".3em">76</text>
                            </g>
                        </svg>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-3/4 rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="mt-auto pb-4 md:max-w-sm md:mx-auto md:w-full">
                <button
                    onClick={onContinue}
                    className="w-full bg-[#40E0D0] text-white font-bold py-4 px-4 rounded-full shadow-lg hover:bg-[#34d3c3] transition-colors duration-300"
                >
                    Continue
                </button>
                <button className="w-full text-gray-500 font-medium py-4 px-4 rounded-full mt-2 hover:bg-gray-100 transition-colors duration-300">
                    Skip this scan
                </button>
            </div>
        </div>
    );
}
