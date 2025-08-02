import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";

type ScanPageProps = {
    onContinue: () => void;
};

const RECORDINGS_COUNT = 3;
const MAX_SECONDS = 15;

export default function ScanPage({ onContinue }: ScanPageProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [currentRecording, setCurrentRecording] = useState(0);
    const [countdown, setCountdown] = useState(MAX_SECONDS);
    const [isRecording, setIsRecording] = useState(false);
    const [faceDetected, setFaceDetected] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [videoBlobs, setVideoBlobs] = useState<Blob[]>([]);

    // Load face-api models
    useEffect(() => {
        const loadModels = async () => {
            setLoading(true);
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models')
            ]);
            setLoading(false);
        };
        loadModels();
    }, []);

    // Start camera and attach stream to video
    useEffect(() => {
        const getCamera = async () => {
            try {
                const s = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(s);
            } catch (e) {
                setError("Could not access camera.");
            }
        };
        getCamera();
        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, []);

    // Attach stream to video element after both are ready
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    // Face detection loop (only when models loaded and video ready)
    useEffect(() => {
        let interval: number;
        if (videoRef.current && stream && !loading) {
            interval = window.setInterval(async () => {
                if (videoRef.current && videoRef.current.readyState === 4) {
                    const result = await faceapi.detectSingleFace(
                        videoRef.current,
                        new faceapi.TinyFaceDetectorOptions()
                    );
                    setFaceDetected(!!result);
                }
            }, 500);
        }
        return () => clearInterval(interval);
    }, [loading, stream]);

    // Countdown logic
    useEffect(() => {
        let timer: number;
        if (isRecording && faceDetected) {
            if (countdown > 0) {
                timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
            } else {
                stopRecording();
            }
        }
        if (isRecording && !faceDetected) {
            stopRecording();
        }
        return () => clearTimeout(timer);
    }, [isRecording, countdown, faceDetected]);

    const startRecording = () => {
        if (!stream || !videoRef.current) return;
        setCountdown(MAX_SECONDS);
        setIsRecording(true);
        const recorder = new MediaRecorder(stream);
        let chunks: BlobPart[] = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = () => {
            const videoBlob = new Blob(chunks, { type: "video/webm" });
            setVideoBlobs(prev => [...prev, videoBlob]);
            setCurrentRecording(prev => {
                // Immediately jump to next recording if not finished
                if (prev + 1 < RECORDINGS_COUNT) {
                    setTimeout(() => startRecording(), 500); // short delay before next
                }
                return prev + 1;
            });
            setIsRecording(false);
        };
        mediaRecorderRef.current = recorder;
        recorder.start();
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    };

    const handleStart = () => {
        setError(null);
        startRecording();
    };

    const handleSkip = () => {
        setError(null);
        setCurrentRecording(RECORDINGS_COUNT);
        onContinue();
    };

    useEffect(() => {
        if (currentRecording >= RECORDINGS_COUNT) {
            // Dev note: log out all recorded video blobs
            console.log("Recorded video blobs:", videoBlobs);
            onContinue();
        }
    }, [currentRecording, onContinue, videoBlobs]);

    return (
        <div id="scan-page" className="flex flex-col h-full bg-gradient-to-br from-[#e0f7fa] via-[#f8fafc] to-[#f0fff4] p-6 md:p-12">
            <div className="text-center pt-8">
                <h1 className="text-2xl md:text-3xl font-bold drop-shadow-sm">
                    <span className={isRecording ? "text-[#40E0D0]" : "text-red-600"}>
                    {isRecording
                        ? `Recording (${currentRecording + 1}/${RECORDINGS_COUNT})`
                        : "Please hold still during this scan."}
                    </span>    
                </h1>
                {isRecording && (
                    <p className="text-lg text-black mt-2">
                        {faceDetected
                            ? `Time left: ${countdown}s`
                            : "No face detected, recording stopped."}
                    </p>
                )}
            </div>
            <div className="flex-grow flex items-center justify-center my-4">
                <div className="w-full max-w-xs mx-auto aspect-[3/4] rounded-2xl overflow-hidden relative md:max-w-sm bg-black shadow-2xl border-4 border-[#40E0D0]">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        style={{ background: "#000" }}
                    />
                    {/* Animated scan border */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-[90%] h-[90%] rounded-2xl border-2 border-dashed border-[#40E0D0] animate-pulse"></div>
                    </div>
                    {/* Optionally, overlay face box or feedback */}
                    {!faceDetected && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">No face detected</span>
                        </div>
                    )}
                </div>
            </div>
            {/* Progress bar for recording */}
            {isRecording && (
                <div className="w-full md:max-w-sm md:mx-auto mb-4">
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                            className="h-full bg-[#40E0D0] transition-all duration-500"
                            style={{ width: `${(countdown / MAX_SECONDS) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}
            {error && <div className="text-red-500 text-center mb-2">{error}</div>}
            <div className="mt-auto pb-4 md:max-w-sm md:mx-auto md:w-full">
                {!isRecording && currentRecording < RECORDINGS_COUNT && (
                    <button
                        onClick={handleStart}
                        className="w-full bg-[#40E0D0] text-white font-bold py-4 px-4 rounded-full shadow-lg hover:bg-[#34d3c3] transition-colors duration-300"
                        disabled={loading || !stream || !faceDetected}
                    >
                        {loading || !stream ? "Loading..." : "Start Recording"}
                    </button>
                )}
                <button
                    className="w-full text-gray-500 font-medium py-4 px-4 rounded-full mt-2 hover:bg-gray-100 transition-colors duration-300"
                    onClick={handleSkip}
                >
                    Skip this scan
                </button>
            </div>
        </div>
    );
}