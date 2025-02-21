import { FaFolder } from 'react-icons/fa'
import CategoryCard from '../../components/CategoryCard';
import { useEffect, useRef, useState } from 'react';
import SearchFilterView from '../../components/ui/SearchFilterView';
import { useLectureChapterQuery } from '../../store/pages/Lectures/useLecture';
import { IPagination } from '../../types';
import Menu from '../../components/ui/Menu';
import useBreadCrumb from '../../store/breadCrumbStore';

// const HISTORY_CHAPTERS = [
//     { id: "21", label: "Ancient India Prehistoric to Vedic Age" },
//     { id: "22", label: "Maurya and Gupta Empires" },
//     { id: "23", label: "Post-Gupta and Early Medieval Period" },
//     { id: "24", label: "Delhi Sultanate and Mughal Empire" },
//     { id: "25", label: "Bhakti and Sufi Movements" },
//     { id: "26", label: "Advent of Europeans and British Conquest" },
//     { id: "27", label: "Indian Renaissance and Social Reforms" },
//     { id: "28", label: "Indian National Movement 1857 to 1947" },
//     { id: "29", label: "Post-Independence India (1947-Present)" },
//     { id: "30", label: "World History Revolutions and World Wars" }
// ];

function LecturesChapter() {
    const { breadCrumb } = useBreadCrumb();
    const [pagination, setPagination] = useState<IPagination>({
        limit: 20,
        order: "desc",
        page: 1,
        sortBy: "createdAt",
        // belong: "upload-lectures"
        parentId: breadCrumb[breadCrumb.length - 1].id

    })

    const menuRef = useRef<HTMLDivElement>(null!)
    const [menu, setMenu] = useState<null | { y: number, x: number, id: string; }>(null)
    const { isPending, isError, error, data } = useLectureChapterQuery(pagination);

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

    const inputRef = useRef<HTMLInputElement>(null!)
    const handleSearch = () => {
        setPagination({
            ...pagination,
            order: "asc"
        })
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
                    data?.data?.data?.data.map((item: { _id: string, name: string }, index: number) => {
                        return <CategoryCard key={index} id={item._id!} Icon={<FaFolder size={40} />} label={item.name} handleMenuOpen={handleMenuOpen} />
                    })
                }
            </div>
            {
                menu && <Menu menu={menu} menuRef={menuRef} />
            }
        </div>
    )
}

export default LecturesChapter