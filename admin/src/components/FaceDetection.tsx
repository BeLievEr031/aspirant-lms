/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { FaceDetection } from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import adSrc from "../assets/song/siren.mp3"
const FaceDetectionComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null!);
    const canvasRef = useRef<HTMLCanvasElement>(null!);
    const audioRef = useRef<HTMLAudioElement>(null!);
    let camera: Camera | null = null;

    useEffect(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const faceDetector = new FaceDetection({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
        });

        faceDetector.setOptions({
            model: "short", // Use 'short' for better speed, 'full' for better accuracy
            minDetectionConfidence: 0.5,
        });

        faceDetector.onResults((results) => {
            if (!canvasRef.current || !videoRef.current) return;
            const canvasCtx = canvasRef.current.getContext("2d");
            if (!canvasCtx) return;

            // Clear canvas
            canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            canvasCtx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

            if (results.detections.length === 0) {
                console.log("Face not detected");
                if (audioRef.current) {
                    audioRef.current.play().catch((error) => console.log("Audio play failed:", error));
                }
            } else {
                // Draw detection boxes
                audioRef.current.pause()
                results.detections.forEach((detection) => {
                    const box = detection.boundingBox;
                    canvasCtx.strokeStyle = "red";
                    canvasCtx.lineWidth = 2;
                    canvasCtx.strokeRect(
                        box.xCenter * canvasRef.current.width - box.width / 2,
                        box.yCenter * canvasRef.current.height - box.height / 2,
                        box.width,
                        box.height
                    );
                });
            }
        });

        camera = new Camera(videoRef.current, {
            onFrame: async () => {
                await faceDetector.send({ image: videoRef.current! });
            },
        });

        camera.start();

        return () => {
            camera?.stop();
        };
    }, []);

    return (
        <div className="relative w-[300px] h-[200px]">
            <video ref={videoRef} className="absolute w-[50px] h-[50px] top-0 left-0 " autoPlay playsInline />
            <canvas ref={canvasRef} className="absolute w-[300px] h-[150px]" />
            <audio ref={audioRef} src={adSrc} />
        </div>
    );
};

export default FaceDetectionComponent;
