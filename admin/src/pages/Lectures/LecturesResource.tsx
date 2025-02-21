import { useRef, useState } from "react"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { RxCross2 } from "react-icons/rx";
import { getPreSignedUrl } from "../../http/api";
import axios, { AxiosProgressEvent } from "axios";
import ProgressBar from "../../components/ProgressBar";
interface IUploader {
    isUploading: boolean,
    percentage: number
}
function LecturesResource() {
    const [isUploadModel, setUploadModel] = useState<boolean>(false)
    const titleRef = useRef<HTMLInputElement>(null!)
    // const descRef = useRef<HTMLInputElement>(null!)
    const fileRef = useRef<HTMLInputElement>(null!)
    const [uploader, setUploader] = useState<IUploader | null>(null)
    const handleUpload = async () => {

        const file = fileRef?.current?.files?.[0];

        if (!file || !titleRef || titleRef.current?.value === "") return alert("All fields required!")

        const imgUrl = URL.createObjectURL(file)
        console.log(imgUrl);
        console.log(file);
        console.log(titleRef.current?.value);


        if (!file.type.includes("video/mp4")) {
            alert("Upload video file only...")
            return
        }
        try {
            const { data } = await getPreSignedUrl({
                fileType: "video/mp4",
                fileName: file.name
            });

            console.log(data.data);
            const preSignedUrl = data.data
            const response = await axios.put(preSignedUrl, file, {
                headers: {
                    "Content-Type": file.type, // Ensure correct MIME type
                    // "x-amz-acl": "public-read", // Optional: Make file public
                },
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploader({
                            isUploading: true,
                            percentage: progress
                        })

                        if (progress === 100) {
                            setUploader(null);
                            setUploadModel(false);
                            alert("Video uploaded successfully.")
                        }
                    }
                },
            });

            if (response.status === 200) {
                console.log("File uploaded successfully!");
                return preSignedUrl.split("?")[0]; // Returns the uploaded file URL
            } else {
                throw new Error(`Upload failed: ${response.status}`);
            }

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="w-full">
            <div className="flex justify-end">
                <Button onClick={() => setUploadModel(true)}>Upload Video</Button>
            </div>

            {isUploadModel && <div className="absolute w-[80%] h-5/6 bg-white bottom-0 left-[20%] rounded-t-3xl shadow-[0px_-4px_8px_rgba(17,17,26,0.2)] pt-4">
                <div className="w-1/2 mx-auto">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">Upload Your video</h1>
                        <RxCross2 size={25} onClick={() => {
                            setUploader(null);
                            setUploadModel(false)
                        }} className="cursor-pointer" />
                    </div>

                    <div className="my-2 mt-6">
                        <Input name="video-title" label="Video Title" inputRef={titleRef} />
                    </div>
                    {/* <div className="my-3">
                        <Input name="video-description" label="Video Description" inputRef={descRef} />

                    </div> */}
                    <div className="my-4">
                        <Input name="video-file" label="Select Video" type="file" inputRef={fileRef} />
                    </div>

                    {uploader && <div>
                        <div className="w-full text-right">{uploader.percentage}%</div>
                        <ProgressBar progress={uploader.percentage} />
                    </div>}
                    <div className="flex gap-2 justify-end my-4">
                        <Button onClick={handleUpload} disabled={uploader ? true : false}>Upload</Button>
                        <Button variant="danger" onClick={() => {
                            setUploader(null);
                            setUploadModel(false)
                        }}>Cancel</Button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default LecturesResource

