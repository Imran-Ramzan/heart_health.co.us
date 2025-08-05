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
    const [faceDetected, setFaceDetected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [videoBlobs, setVideoBlobs] = useState<Blob[]>([]);
    const [recordingStatus, setRecordingStatus] = useState<"idle" | "recording" | "stopped" | "failed">("idle");
    const [hasStartedFlow, setHasStartedFlow] = useState(false);
    const didFailRef = useRef(false);

    // Load models
    useEffect(() => {
        const loadModels = async () => {
            setLoading(true);
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models")
            ]);
            setLoading(false);
        };
        loadModels();
    }, []);

    // Start camera
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
    }, []);

    // Stop camera on unmount
    useEffect(() => {
        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, [stream]);

    // Attach stream
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    // Face detection
    useEffect(() => {
        let interval: number;
        if (videoRef.current && stream && !loading) {
            interval = window.setInterval(async () => {
                if (videoRef.current?.readyState === 4) {
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

    // Countdown
    useEffect(() => {
        let timer: number;
        if (isRecording) {
            if (!faceDetected) {
                didFailRef.current = true;
                stopRecording();
            } else if (countdown > 0) {
                timer = window.setTimeout(() => setCountdown(prev => prev - 1), 1000);
            } else {
                stopRecording();
            }
        }
        return () => clearTimeout(timer);
    }, [isRecording, countdown, faceDetected]);

    const startRecording = () => {
        if (!stream || !videoRef.current) return;
        if (!faceDetected) {
            setError("No face detected. Please align your face before starting.");
            return;
        }

        setCountdown(MAX_SECONDS);
        setIsRecording(true);
        setRecordingStatus("recording");
        setError(null);
        setHasStartedFlow(true);
        didFailRef.current = false;

        const recorder = new MediaRecorder(stream);
        let chunks: BlobPart[] = [];

        recorder.ondataavailable = e => chunks.push(e.data);

        recorder.onstop = () => {
            setIsRecording(false);

            if (didFailRef.current) {
                setRecordingStatus("failed");
                return;
            }

            const blob = new Blob(chunks, { type: "video/webm" });
            setVideoBlobs(prev => {
                const updated = [...prev];
                updated[currentRecording] = blob;
                return updated;
            });

            setRecordingStatus("stopped");
            setCurrentRecording(prev => prev + 1);
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
        startRecording();
    };

    const handleSkip = () => {
        setCurrentRecording(RECORDINGS_COUNT);
        onContinue();
    };

    // Auto-start next recording only after successful stop
    useEffect(() => {
        if (
            hasStartedFlow &&
            recordingStatus === "stopped" &&
            currentRecording < RECORDINGS_COUNT
        ) {
            const t = setTimeout(() => startRecording(), 1500);
            return () => clearTimeout(t);
        }
    }, [recordingStatus, currentRecording, hasStartedFlow]);

    // Finish flow
    useEffect(() => {
        if (currentRecording === RECORDINGS_COUNT) {
            const formData = new FormData();
            videoBlobs.forEach((blob, idx) => {
                formData.append(`video${idx + 1}`, blob, `recording${idx + 1}.webm`);
            });
            console.log("Final video blobs:", videoBlobs);
            console.log("FormData:", formData);
            onContinue();
        }
    }, [currentRecording, videoBlobs, onContinue]);

    return (
        <div className="flex flex-col h-full p-6 md:p-12 bg-gradient-to-br from-[#e0f7fa] via-[#f8fafc] to-[#f0fff4]">
            <div className="text-center pt-8">
                <h1 className="text-2xl md:text-3xl font-bold drop-shadow-sm">
                    <span className={isRecording ? "text-[#40E0D0]" : "text-red-600"}>
                        {isRecording
                            ? `Recording (${currentRecording + 1}/${RECORDINGS_COUNT})`
                            : recordingStatus === "failed"
                            ? `Recording ${currentRecording + 1} failed. Try again.`
                            : hasStartedFlow && currentRecording < RECORDINGS_COUNT
                            ? `Recording ${currentRecording} done!`
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
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-[90%] h-[90%] rounded-2xl border-2 border-dashed border-[#40E0D0] animate-pulse"></div>
                    </div>
                    {!faceDetected && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">No face detected</span>
                        </div>
                    )}
                </div>
            </div>

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

            {recordingStatus === "failed" && (
                <div className="text-red-600 text-center font-bold mb-2">
                    Recording {currentRecording + 1} failed. Please try again.
                </div>
            )}

            <div className="mt-auto pb-4 md:max-w-sm md:mx-auto md:w-full">
                {!isRecording && currentRecording < RECORDINGS_COUNT && (
                    <button
                        onClick={handleStart}
                        className="w-full bg-[#40E0D0] text-white font-bold py-4 px-4 rounded-full shadow-lg hover:bg-[#34d3c3] transition-colors duration-300"
                        disabled={loading || !stream}
                    >
                        {recordingStatus === "failed"
                            ? `Retry Recording ${currentRecording + 1}`
                            : `Start Recording`}
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