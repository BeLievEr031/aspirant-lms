import { createLectureExamCategory, createStudyMaterialChapter, createStudyMaterialSubject, fetchLectureExamCategory, fetchStudyMaterialChapter, fetchStudyMaterialSubject, getPreSignedUrl } from "../../../http/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IPagination } from "../../../types";


// CRUD Exam Category
export const useLectureExamMutation = (cb: (isModel: boolean) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createLectureExamCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lecture-exam-ctaegory"] });
            cb(false)
        }
    });
};

export const useLectureExamCategoryQuery = (pagination: IPagination) => {
    return useQuery(
        {
            queryKey: ['lecture-exam-ctaegory', pagination],
            queryFn: () => fetchLectureExamCategory(pagination),
            staleTime: 60 * 1000 * 10,
        }
    )
}


// CRUD Exam Category
export const useLectureStudyMaterialSubjectMutation = (cb: (isModel: boolean) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createStudyMaterialSubject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subject-for-lectures"] });
            cb(false)
        }
    });
}

export const useLectureSubjectQuery = (pagination: IPagination) => {
    return useQuery(
        {
            queryKey: ['subject-for-lectures', pagination],
            queryFn: () => fetchStudyMaterialSubject(pagination),
            staleTime: 60 * 1000 * 10,
        }
    )
}

// CRUD Exam Resource
export const useLectureChapterMutation = (cb: (isModel: boolean) => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createStudyMaterialChapter,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chapter-for-lecture"] });
            cb(false)
        }
    });
}

export const useLectureChapterQuery = (pagination: IPagination) => {
    return useQuery(
        {
            queryKey: ['chapter-for-lecture', pagination],
            queryFn: () => fetchStudyMaterialChapter(pagination),
            staleTime: 60 * 1000 * 10,
        }
    )
}

export const useGetPreSignedUrl = (query: { fileType: string; fileName: string }) => {
    return useQuery(
        {
            queryKey: ['get-pre-signed-url'],
            queryFn: () => getPreSignedUrl(query),
            staleTime: 60 * 1000 * 10,
        }
    )
}

