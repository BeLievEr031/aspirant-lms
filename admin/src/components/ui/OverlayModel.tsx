import React, { useEffect } from "react";
import Model from "../Model"
import useLocationState from "../../hooks/useLocationState";
import { useCreateExamCategory, useStudyMaterialChapterMutation, useStudyMaterialSubjecMutation } from "../../store/pages/StudyMaterial/useStudyMaterialStore";
import useBreadCrumb from "../../store/breadCrumbStore";
import { useTTExamMutation } from "../../store/pages/TimeTable/useTimeTableStore";
import { useStudyPlanExamMutation } from "../../store/pages/StudyPlan/useStudyPlan";
import { useLectureChapterMutation, useLectureExamMutation, useLectureStudyMaterialSubjectMutation } from "../../store/pages/Lectures/useLecture";

interface IOverlayModel {
    isOpen: boolean;
    handleModelOpen: () => void
}

const OverlayModel: React.FC<IOverlayModel> = ({ isOpen, handleModelOpen }) => {
    const { isPending, mutate } = useCreateExamCategory(handleModelOpen);
    const { mutate: subjectMutate } = useStudyMaterialSubjecMutation(handleModelOpen);
    const { mutate: chapterMutate } = useStudyMaterialChapterMutation(handleModelOpen);
    const { mutate: TTexamMutate } = useTTExamMutation(handleModelOpen);
    const { mutate: studyPlanExamMutate } = useStudyPlanExamMutation(handleModelOpen)
    const { mutate: lectureExamMutate } = useLectureExamMutation(handleModelOpen)
    const { mutate: lectureSubjectMutate } = useLectureStudyMaterialSubjectMutation(handleModelOpen);
    const { mutate: lectureChapterMutate } = useLectureChapterMutation(handleModelOpen);
    const { breadCrumb } = useBreadCrumb();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => { document.body.style.overflow = "auto" };
    }, [isOpen]);

    const { pathname } = useLocationState();

    const handleApiCall = (data: string) => {
        data = data.trim();
        if (data === "" && data.length === 0) {
            alert("All fields reuired.")
            return;
        }

        decideApiCall(data);
    }

    const decideApiCall = (data: string) => {
        const breadCrumbUrlArr = pathname.split("/").filter(item => item)
        if (pathname.includes("/study-material")) {

            if (breadCrumbUrlArr.length === 1) {
                mutate({ label: data, belong: "study-material" });
            } else if (breadCrumbUrlArr.length === 2) {
                subjectMutate({ name: data, examId: breadCrumb[breadCrumb.length - 1].id })
            } else if (breadCrumbUrlArr.length === 3) {
                console.log("Chapter created");
                chapterMutate({ name: data, subjectId: breadCrumb[breadCrumb.length - 1].id })
            } else {
                console.log("Resource created");
            }

        } else if (pathname.includes("/exam-time-table")) {
            if (breadCrumbUrlArr.length === 1) {
                TTexamMutate({ label: data, belong: "time-table" });
            }

        } else if (pathname.includes("/study-plan")) {

            if (breadCrumbUrlArr.length === 1) {
                studyPlanExamMutate({ label: data, belong: "study-plan" });
            }
        } else if (pathname.includes("/upload-lectures")) {
            if (breadCrumbUrlArr.length === 1) {
                lectureExamMutate({ label: data, belong: "upload-lectures" });
            } else if (breadCrumbUrlArr.length === 2) {
                lectureSubjectMutate({ name: data, examId: breadCrumb[breadCrumb.length - 1].id });
            } else if (breadCrumbUrlArr.length === 3) {
                console.log("Chapter created");
                lectureChapterMutate({ name: data, subjectId: breadCrumb[breadCrumb.length - 1].id })
            }
        }
    }

    return (
        <div className="h-[100vh] w-full fixed top-0 left-0 bg-gray-900/50 z-50 flex justify-center items-center">
            <Model
                handleModelOpen={handleModelOpen}
                handleApiCall={handleApiCall}
                isPending={isPending}
            />
        </div>
    )
}

export default OverlayModel