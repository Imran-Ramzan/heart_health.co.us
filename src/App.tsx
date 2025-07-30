import { useState } from "react";
import ScanPage from "./components/ScanPage";
import ResultsPage from "./components/ResultsPage";

function App() {

  const [showResults, setShowResults] = useState(false);

  return (
    <div className="bg-gray-100 md:py-12 md:flex md:items-center md:justify-center min-h-screen">
      <div className="w-full max-w-md mx-auto bg-white h-full shadow-lg md:h-auto md:max-w-4xl md:rounded-2xl md:overflow-hidden">
        {!showResults ? (
          <ScanPage onContinue={() => setShowResults(true)} />
        ) : (
          <ResultsPage onBack={() => setShowResults(false)} />
        )}
      </div>
    </div>
  );
}

export default App
