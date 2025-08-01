import { useState } from 'react';
import DetailsPage from './DetailsPage';

type ResultsPageProps = {
  onBack: () => void;
};
export default function ResultsPage({ onBack }: ResultsPageProps ) {
    const [showDetails, setShowDetails] = useState(false);
    if (showDetails) {
        return <DetailsPage onBack={() => setShowDetails(false)} />;
    }
    return (
        <div id="results-page" className="h-full bg-white p-6 md:p-12 overflow-y-auto">
            <div className="flex justify-between items-center pt-8 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Heart Health Score</h1>
                    <p className="text-green-500 font-medium">Very good</p>
                </div>
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                    <div className="score-circle w-full h-full rounded-full"></div>
                    <div className="absolute bg-white w-[85%] h-[85%] rounded-full flex items-center justify-center">
                        <span className="text-2xl md:text-3xl font-bold text-gray-800">9.2</span>
                    </div>
                </div>
            </div>
            {/* Progress bar with 5 segments */}
            <div className="flex justify-between items-center mb-6 px-2 md:px-8">
                {[...Array(7)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full flex-1 mx-1 ${i < 2 ? 'bg-green-300' : 'bg-gray-200'}`}
                    ></div>
                ))}
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 relative md:p-8">
                <div className="flex items-center mb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Heart Health</h2>
                </div>
                <p className="text-sm text-gray-500 -mt-3 mb-6">Top 5% of women</p>

                {/* Metrics section: two columns, right column for units/icons */}
                <div className="flex">
                    {/* Left column: metrics */}
                    <div className="flex-1 space-y-5">
                        {/* Blood Pressure */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-black font-bold text-sm">Blood Pressure</p>
                                <div className="flex items-center space-x-1">
                                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                    <p className="text-sm font-medium text-yellow-400">High Normal</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl md:text-2xl font-bold text-gray-800">130/92</p>
                            </div>
                        </div>
                        {/* Pulse */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-black font-bold text-sm">Pulse</p>
                                <div className="flex items-center space-x-1">
                                    <i className="ph-fill ph-check-circle text-green-500"></i>
                                    <p className="text-sm font-medium text-green-500">Optimal</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl md:text-2xl font-bold text-gray-800">42</p>
                            </div>
                        </div>
                        {/* Irregular Heartbeats */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-black font-bold text-sm">Irregular Heartbeats</p>
                                <div className="flex items-center space-x-1">
                                    <i className="ph-fill ph-check-circle text-green-500"></i>
                                    <p className="text-sm font-medium text-green-500">Good</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl md:text-2xl font-bold text-gray-800">0</p>
                            </div>
                        </div>
                        {/* Breathing Rate */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-black font-bold text-sm">Breathing Rate</p>
                                <div className="flex items-center space-x-1">
                                    <i className="ph-fill ph-check-circle text-green-500"></i>
                                    <p className="text-sm font-medium text-green-500">Good</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl md:text-2xl font-bold text-gray-800">23</p>
                            </div>
                        </div>
                    </div>
                    {/* Right column: units and icons, vertically stacked */}
                    <div className="flex flex-col items-center justify-between ml-6 py-1">
                        <div className="flex flex-col items-center mb-2">
                            <span className="text-gray-400 text-xs">mmHg</span>
                            <i className="ph ph-activity text-gray-400 text-xl"></i>
                        </div>
                        <div className="flex flex-col items-center mb-2">
                            <span className="text-gray-400 text-xs">bpm</span>
                            <i className="ph ph-heart text-gray-400 text-xl"></i>
                        </div>
                        <div className="flex flex-col items-center mb-2">
                            <span className="text-gray-400 text-xs">beats</span>
                            <i className="ph ph-waveform text-gray-400 text-xl"></i>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-gray-400 text-xs">brpm</span>
                            <i className="ph ph-wind text-gray-400 text-xl"></i>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-sm font-bold text-gray-700">
                    AI MD
                </div>
            </div>
            <div className="text-center text-xs text-gray-400 mt-10 px-4">
                <p>These numbers are only estimates and are not a substitute for the judgment of a healthcare professional. They are intended to improve awareness and general wellness. Please see our <a href="#" className="underline text-cyan-500">how it works</a> page.</p>
            </div>
            <div className="mt-6 md:flex md:items-center md:justify-center md:flex-col">
                <div className="md:w-full md:max-w-sm">
                    <button onClick={() => setShowDetails(true)} className="w-full bg-[#40E0D0] text-white font-bold py-4 px-4 rounded-full shadow-lg flex items-center justify-center space-x-2 hover:bg-[#34d3c3] transition-colors duration-300">
                        <i className="ph-bold ph-camera"></i>
                        <span>View Analysis</span>
                    </button>
                </div>
                <div className="flex justify-center space-x-4 mt-6 pb-8">
                    <a href="#" className="w-14 h-14 flex items-center justify-center bg-green-500 rounded-full text-white shadow-md">
                        <i className="ph-fill ph-chat-circle-dots text-3xl"></i>
                    </a>
                    <a href="#" className="w-14 h-14 flex items-center justify-center instagram-gradient rounded-full text-white shadow-md">
                        <i className="ph-fill ph-instagram-logo text-3xl"></i>
                    </a>
                    <a href="#" className="w-14 h-14 flex items-center justify-center bg-yellow-300 rounded-full text-black shadow-md">
                        <i className="ph-fill ph-snapchat-logo text-3xl"></i>
                    </a>
                    <a href="#" className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 shadow-md">
                        <i className="ph-bold ph-arrow-bend-up-right text-3xl"></i>
                    </a>
                </div>
            </div>
            <button
                onClick={onBack}
                className="w-full text-gray-500 font-medium py-2 px-4 rounded-full mt-2 hover:bg-gray-100 transition-colors duration-300 md:max-w-sm md:mx-auto"
            >
                Go Back to Scan
            </button>
        </div>
    );
}
