/* eslint-disable react-hooks/exhaustive-deps */
import { FaFolder } from "react-icons/fa";
import CategoryCard from "../../components/CategoryCard";
import SearchFilterView from "../../components/ui/SearchFilterView";
import { useEffect, useRef, useState } from "react";
import useBreadCrumb from "../../store/breadCrumbStore";
import { memo } from "react"
import { useExamCategoryFetch } from "../../store/pages/StudyMaterial/useStudyMaterialStore";
import { IExamCategory, IPagination } from "../../types";
import Menu from "../../components/ui/Menu";
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



const ExamCategory = memo(() => {
    const { breadCrumb } = useBreadCrumb();
    const inputRef = useRef<HTMLInputElement>(null!)
    const [pagination, setPagination] = useState<IPagination>({
        limit: 20,
        order: "desc",
        page: 1,
        sortBy: "createdAt",
        belong: "study-material"
    })

    const menuRef = useRef<HTMLDivElement>(null!)
    const [menu, setMenu] = useState<null | { y: number, x: number, id: string; }>(null)

    const handleSearch = () => {
        setPagination({
            ...pagination,
            order: "asc"
        })
    }

    useEffect(() => {
        console.log(breadCrumb);
    }, [])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenu(null);
            }
        }

        if (menu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menu])

    const { isPending, isError, error, data } = useExamCategoryFetch(pagination);
    if (isPending) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>{error.message}</div>
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        event.preventDefault();

        const menuWidth = 150;
        const menuHeight = 120;
        const padding = 10;

        let x = event.clientX;
        let y = event.clientY;

        // Ensure menu stays within viewport
        if (x + menuWidth > window.innerWidth - padding) {
            x = window.innerWidth - menuWidth - padding; // Shift left
        }
        if (y + menuHeight > window.innerHeight - padding) {
            y = window.innerHeight - menuHeight - padding; // Shift up
        }

        setMenu({ x, y, id: id });

    }

    // const handleClose = () => {
    //     setMenu(null);
    // };

    return (
        <div className="mt-4">
            <SearchFilterView inputRef={inputRef} handleSearch={handleSearch} />
            <div className="flex flex-wrap gap-2">
                {
                    data?.data?.data?.data.map((item: IExamCategory, index: number) => {
                        return <CategoryCard key={index} id={item._id!} Icon={<FaFolder size={40} />} label={item.label} handleMenuOpen={handleMenuOpen} />
                    })
                }
            </div>
            {
                menu && <Menu menu={menu} menuRef={menuRef} />
            }
        </div>
    )
})

export default ExamCategory