import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

function BellCurveChart() {
    // Generate bell curve data
    const labels = Array.from({ length: 41 }, (_, i) => 40 + i * 1.5); // 40 to 100
    const mean = 70;
    const std = 12;
    const bell = (x: number) =>
        Math.exp(-0.5 * Math.pow((x - mean) / std, 2)) * 35 + 10;

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: labels.map(bell),
                fill: true,
                backgroundColor: 'rgba(220, 252, 231, 0.8)', // soft green
                borderColor: '#22c55e', // green
                pointRadius: 0,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
                min: 0,
                max: 50,
            },
        },
        elements: {
            line: { borderWidth: 2 },
        },
    };

    return (
        <div className="relative h-16 mb-4 flex justify-end">
            <Line data={data} options={options} height={60} />
            <div className="absolute right-0" style={{ top: '8px' }}>
                <span className="text-xs text-green-600 bg-white px-2 py-1 rounded shadow-sm border font-medium">Optimal</span>
            </div>
        </div>
    );
}

type Props = {
  onBack: () => void;
};
export default function DetailsPage({ onBack }: Props) {
    return (
        <div id="details-page">
            <div className="h-full bg-white p-6 md:p-12 overflow-y-auto">
                {/* Header Section */}
                <div className="flex justify-between items-start pt-8 mb-4">
                    <button onClick={onBack} id="back-to-results-btn" className="text-gray-800 hover:bg-gray-100 p-2 rounded-full">
                        <i className="ph-bold ph-caret-left text-2xl"></i>
                    </button>
                    <div className="text-center flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Heart Health Score</h1>
                        <p className="text-sm text-gray-500 mt-1">Top 13% of women.</p>
                        <p className="text-green-500 font-medium">Very good</p>
                    </div>
                    <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center flex-shrink-0">
                        <div className="score-circle w-full h-full rounded-full"></div>
                        <div className="absolute bg-white w-[85%] h-[85%] rounded-full flex flex-col items-center justify-center">
                            <span className="text-2xl md:text-3xl font-bold text-gray-800">9.2</span>
                            <span className="text-xs text-gray-400 -mt-1">out of 10</span>
                        </div>
                    </div>
                </div>
                {/* Looks Great Section */}
                <div className="text-center my-6">
                    <span className="text-4xl">👍</span>
                    <h2 className="text-xl font-bold text-gray-800 mt-2">Looks Great!</h2>
                    <p className="text-black-600 max-w-xs mx-auto">The following health scores are looking great! Keep doing what you're doing.</p>
                </div>
                {/* Pulse Rate Section */}
                <div className="bg-white rounded-2xl shadow-xl p-6 relative md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center mb-6">
                        <div className="md:w-1/2 w-full">
                            {/* Pulse Rate Text Section */}
                            <h3 className="text-xl font-bold text-gray-800">Pulse Rate</h3>
                            <p className="text-sm text-black-500">Top 55% of all women</p>
                            <div className="mt-2">
                                <p className="text-3xl font-bold text-gray-800">50 <span className="text-base font-normal text-gray-500">beats/min</span></p>
                                <p className="text-xs text-black-400">Irregular heartbeats: 0</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 w-full mt-4 md:mt-0 flex justify-end">
                            {/* Bell Curve Chart Section */}
                            <BellCurveChart />
                        </div>
                    </div>
                    {/* Bell Curve Graph */}
                    <div className="mb-6" id="pulse-rate-graph" data-value="50" data-min="40" data-max="100">
                        {/* Pulse Bar */}
                        <div className="relative mb-3">
                            <div className="w-full flex h-2.5 rounded-full overflow-hidden">
                                <div className="bg-red-400 flex-1"></div>
                                <div className="bg-green-500 flex-1"></div>
                                <div className="bg-green-300 flex-1"></div>
                                <div className="bg-yellow-300 flex-1"></div>
                            </div>
                            {/* Indicator at 50 (between first and second segment) */}
                            <div className="absolute w-3 h-3 bg-white border-2 border-green-600 rounded-full top-1/2 -translate-y-1/2 shadow-sm"
                                style={{ left: 'calc(25% - 6px)' }}
                                id="pulse-indicator"></div>
                        </div>
                        {/* Bar Labels */}
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>40</span>
                            <span>60</span>
                            <span>80</span>
                            <span>100</span>
                        </div>
                        <div className="flex text-xs text-gray-500">
                            <span className="flex-1 text-center">Low</span>
                            <span className="flex-1 text-center font-medium text-green-600">Optimal</span>
                            <span className="flex-1 text-center">Normal</span>
                            <span className="flex-1 text-center">Elevated</span>
                        </div>
                    </div>
                    {/* Pulse Description */}
                    <ul className="space-y-3 text-gray-600 text-sm list-disc pl-5 border-t pt-6">
                        <li>Pulse is the number of times your heart beats in one minute.</li>
                        <li>Pulse shows how hard your heart is working to pump blood around your body.</li>
                        <li>Low values are usually good for resting adults, indicating a healthy heart, but too low might signal a problem.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}