import playBtnSrc from "../assets/images/pdf.png";
import Button from "./Button";
import { useState } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.min.js"; // Ensure the worker is bundled

interface IPDFCard {
    title: string;
    url: string;
}

function PDFCard({ title, url }: IPDFCard) {
    const [isPDF, setPDF] = useState(false);

    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    return (
        <div>
            <div className="w-[300px] px-2 py-1 border-2 border-black rounded-xl cursor-pointer">
                <img src={playBtnSrc} alt="play-button-image" className="w-[100px] h-[100px] mx-auto" />
                <h1 className="font-bold text-right">{title}</h1>
                <Button onClick={() => setPDF(true)}>View</Button>
            </div>

            {isPDF && (
                <div className="absolute top-0 left-[20%] w-[80%] h-full bg-slate-400/80">
                    <Viewer fileUrl={url} />
                    <Button variant="danger" onClick={() => setPDF(false)} className="my-2">
                        Close
                    </Button>
                </div>
            )}
        </div>
    );
}

export default PDFCard;
