import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { IPagination } from "../../../types"
import { createStudyPlanExamCategory, fetchStudyPlanExamCategory } from "../../../http/api"


export const useStudyPlanExamQuery = (pagination: IPagination) => {
    return useQuery({
        queryKey: ["study-plan-exam-category", pagination],
        queryFn: () => fetchStudyPlanExamCategory(pagination)
    })
}

export const useStudyPlanExamMutation = (cb: (data: boolean) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createStudyPlanExamCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["study-plan-exam-category"] });
            cb(false)
        }
    });
}