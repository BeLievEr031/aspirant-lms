/* eslint-disable react-hooks/exhaustive-deps */
import { FaFolder } from "react-icons/fa";
import CategoryCard from "../../components/CategoryCard";
import SearchFilterView from "../../components/ui/SearchFilterView";
import { useEffect, useRef, useState } from "react";
import useBreadCrumb from "../../store/breadCrumbStore";
import { memo } from "react"
import { IExamCategory, IPagination } from "../../types";
import { useTTExamQuery } from "../../store/pages/TimeTable/useTimeTableStore";
// const EXAM_CATEGORY = [
//     { id: "1", label: "UPSC Civil Services Exam" },
//     { id: "2", label: "SSC CGL (Staff Selection Commission - CGL)" },
//     { id: "3", label: "IBPS PO" },
//     { id: "4", label: "CAT (Common Admission Test)" },
//     { id: "5", label: "GATE (Graduate Aptitude Test in Engineering)" },
//     { id: "6", label: "NEET (National Eligibility cum Entrance Test)" },
//     { id: "7", label: "JEE Advanced (Joint Entrance Examination - Advanced)" },
//     { id: "8", label: "NDA (National Defence Academy Exam)" },
//     { id: "9", label: "RBI Grade B (Reserve Bank of India Grade B Exam)" },
//     { id: "10", label: "MPSC (Maharashtra Public Service Commission)" }
// ];



const TimeTableExamCategory = memo(() => {
    const { breadCrumb } = useBreadCrumb();
    const inputRef = useRef<HTMLInputElement>(null!)
    const [pagination, setPagination] = useState<IPagination>({
        limit: 20,
        order: "desc",
        page: 1,
        sortBy: "createdAt",
        belong: "time-table"
    })

    const handleSearch = () => {
        console.log(45);

        setPagination({
            ...pagination,
            order: "asc"
        })
    }

    useEffect(() => {
        console.log(breadCrumb);
    }, [])

    const { isPending, isError, error, data } = useTTExamQuery(pagination);

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    return (
        <div className="mt-4">
            <SearchFilterView inputRef={inputRef} handleSearch={handleSearch} />
            <div className="flex flex-wrap gap-2">
                {
                    data?.data?.data?.data.map((item: IExamCategory, index: number) => {
                        return <CategoryCard key={index} id={item._id!} Icon={<FaFolder size={40} />} label={item.label} handleMenuOpen={() => { }} />
                    })
                }
            </div>
        </div>
    )
})

export default TimeTableExamCategory