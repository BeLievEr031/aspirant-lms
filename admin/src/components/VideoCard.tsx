import playBtnSrc from "../assets/images/playbutton.png"
import Button from "./Button"
import { useState } from "react";
import FaceDetectionComponent from "./FaceDetection";
interface IVideoCard {
    title: string;
    url: string;
}
function VideoCard({ title, url }: IVideoCard) {

    const [isVideo, setVideo] = useState(false);

    return (

        <div>
            <div className="w-[300px] px-2 py-1 border-2 border-black rounded-xl cursor-pointer">
                <img src={playBtnSrc} alt="play-button-image" className="w-[100px] h-[100px] mx-auto" />
                <h1 className="font-bold text-right">{title}</h1>
                <Button onClick={() => setVideo(true)}>Play</Button>
            </div>

            {
                isVideo && <div className="absolute top-0 left-[20%] w-[80%] h-full bg-slate-400/80">
                    <video src={url} className="w-full h-[500px] rounded-2xl" controls />
                    <Button variant="danger" onClick={() => setVideo(false)} className="my-2">Close</Button>

                    <FaceDetectionComponent />
                </div>
            }
        </div>
    )
}

export default VideoCard