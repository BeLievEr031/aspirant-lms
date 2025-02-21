import { FaFolder } from 'react-icons/fa'
import CategoryCard from '../../components/CategoryCard';
import { useEffect, useRef, useState } from 'react';
import SearchFilterView from '../../components/ui/SearchFilterView';
import Menu from '../../components/ui/Menu';
import { IPagination } from '../../types';
import { useLectureSubjectQuery } from '../../store/pages/Lectures/useLecture';
import useBreadCrumb from '../../store/breadCrumbStore';

// const UPSC_SUBJECTS = [
//     { id: "11", label: "History" },
//     { id: "12", label: "Geography" },
//     { id: "13", label: "Polity" },
//     { id: "14", label: "Economy" },
//     { id: "15", label: "Environment & Ecology" },
//     { id: "16", label: "Science & Technology" },
//     { id: "17", label: "International Relations" },
//     { id: "18", label: "Ethics, Integrity & Aptitude" },
//     { id: "19", label: "Essay" },
//     { id: "20", label: "Current Affairs" }
// ];

function LecturesSubject() {
    // Fetch Subject here
    const { breadCrumb } = useBreadCrumb();
    const [pagination, setPagination] = useState<IPagination>({
        limit: 20,
        order: "desc",
        page: 1,
        sortBy: "createdAt",
        parentId: breadCrumb[breadCrumb.length - 1].id
    })

    const menuRef = useRef<HTMLDivElement>(null!)
    const [menu, setMenu] = useState<null | { y: number, x: number, id: string; }>(null)
    const { isPending, isError, error, data } = useLectureSubjectQuery(pagination);

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
                    data?.data?.data?.data?.map((item: { _id: string, name: string }, index: number) => {
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

export default LecturesSubject;