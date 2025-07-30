type Props = {
  onBack: () => void;
};
export default function DetailsPage({ onBack }: Props) {
    return (
        <div id="details-page">
            <div className="h-full bg-white p-6 md:p-12 overflow-y-auto">
                <div className="flex justify-between items-start pt-8 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Heart Health Score</h1>
                        <p className="text-green-500 text-sm font-medium">Top 13% of women.</p>
                        <p className="text-green-600 text-base font-semibold mt-1">Very good</p>
                    </div>
                    <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        <div className="score-circle w-full h-full rounded-full"></div>
                        <div className="absolute bg-white w-[85%] h-[85%] rounded-full flex items-center justify-center">
                            <span className="text-xl md:text-2xl font-bold text-gray-800">9.2</span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-1">👍 Looks Great!</h2>
                    <p className="text-gray-600 text-sm">The following health scores are looking great! Keep doing what
                        you're doing.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 relative md:p-8 border">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Pulse Rate</h3>
                    <p className="text-sm text-gray-500 mb-4">Top 55% of all women</p>

                    <div className="flex items-center mb-4">
                        <span className="text-4xl font-bold text-gray-800">50</span>
                        <span className="ml-2 text-gray-600">beats/min</span>
                    </div>

                    <div className="relative w-full h-3 bg-gray-200 rounded-full mb-4">
                        <div className="absolute left-0 top-0 h-3 bg-red-500 rounded-l-full" style={{width: '20%'}}></div>
                        <div className="absolute left-[20%] top-0 h-3 bg-yellow-400" style={{width: '20%'}}></div>
                        <div className="absolute left-[40%] top-0 h-3 bg-green-500 rounded-r-full" style={{width: '60%'}}>
                        </div>
                        <div className="absolute left-[16%] -top-5 w-px h-8 bg-black"></div>
                    </div>

                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Pulse is the number of times your heart beats in one minute.</li>
                        <li>• Pulse shows how hard your heart is working to pump blood around your body.</li>
                        <li>• Low values usually indicate a healthy heart, but too low might signal a problem.</li>
                    </ul>
                </div>

                <div className="mt-8 md:max-w-sm md:mx-auto">
                    <button id="back-to-results-btn" onClick={onBack}
                        className="w-full text-gray-500 font-medium py-3 px-4 rounded-full hover:bg-gray-100 transition-colors duration-300">
                        Go Back to Results
                    </button>
                </div>
            </div>
        </div>
    );
}