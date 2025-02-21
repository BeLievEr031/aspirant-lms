import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTimeTableExamCategory, fetchTimeTableExamCategory } from "../../../http/api"
import { IPagination } from "../../../types"

export const useTTExamMutation = (cb: (data: boolean) => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTimeTableExamCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["time-table-exam-category"] })
            cb(false)
        }
    })
}

export const useTTExamQuery = (pagination: IPagination) => {
    return useQuery({
        queryKey: ['time-table-exam-category', pagination],
        queryFn: () => fetchTimeTableExamCategory(pagination)
    })
}