import { useRef, useState } from "react"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { RxCross2 } from "react-icons/rx";
import { getPreSignedUrl } from "../../http/api";
import axios, { AxiosProgressEvent } from "axios";
import ProgressBar from "../../components/ProgressBar";
import { useLectureResourcQuery, useLecturResourceMutation } from "../../store/pages/Lectures/useLecture";
import useBreadCrumb from "../../store/breadCrumbStore";
import VideoCard from "../../components/VideoCard";
import { IPagination } from "../../types";
interface IUploader {
    isUploading: boolean,
    percentage: number
}

function LecturesResource() {
    const { breadCrumb } = useBreadCrumb();
    const [pagination] = useState<IPagination>({
        limit: 20,
        order: "desc",
        page: 1,
        sortBy: "createdAt",
        belong: "upload-lectures",
        chapterId: breadCrumb[breadCrumb.length - 1].id
    })
    const [isUploadModel, setUploadModel] = useState<boolean>(false)
    const titleRef = useRef<HTMLInputElement>(null!)
    const fileRef = useRef<HTMLInputElement>(null!)
    const [uploader, setUploader] = useState<IUploader | null>(null)
    const { mutate } = useLecturResourceMutation(setUploadModel);
    const { data, isPending, isError, error } = useLectureResourcQuery(pagination);
    const handleUpload = async () => {
        const file = fileRef?.current?.files?.[0];
        if (!file || !titleRef || titleRef.current?.value === "") return alert("All fields required!")
        if (!file.type.includes("video/mp4")) {
            alert("Upload video file only...")
            return
        }

        try {
            const { data } = await getPreSignedUrl({
                fileType: "video/mp4",
                fileName: file.name
            });

            const preSignedUrl = data.data
            const response = await axios.put(preSignedUrl, file, {
                headers: {
                    "Content-Type": file.type,
                },
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploader({
                            isUploading: true,
                            percentage: progress
                        })
                    }
                },
            });

            if (response.status === 200) {
                mutate({
                    chapterId: breadCrumb[breadCrumb.length - 1].id,
                    name: titleRef.current?.value,
                    url: preSignedUrl.split("?")[0]
                })

                setUploader(null);
                setUploadModel(false);

                alert("Video uploaded successfully.")
                return preSignedUrl.split("?")[0];
            } else {
                throw new Error(`Upload failed: ${response.status}`);
            }

        } catch (error) {
            console.log(error);
        }

    };

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    return (
        <div className="w-full">
            <div className="flex justify-end">
                <Button onClick={() => setUploadModel(true)}>Upload Video</Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {
                    data?.data?.data?.data.map((item: { name: string, url: string }, index: number) => {
                        return <VideoCard key={index} title={item.name} url={item.url} />
                    })
                }
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
                    <div className="my-4">
                        <Input name="video-file" label="Select Video" type="file" inputRef={fileRef} />
                    </div>

                    {uploader && <div>
                        <div className="w-full text-right">{uploader.percentage}%</div>
                        <ProgressBar progress={uploader.percentage} />
                    </div>}
                    <div className="flex gap-2 justify-end my-4">
                        <Button onClick={handleUpload} disabled={uploader || isPending ? true : false}>Upload</Button>
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

