import { FaFolder } from 'react-icons/fa'
import CategoryCard from '../../components/CategoryCard';
import { useRef, useState } from 'react';
import useBreadCrumb from '../../store/breadCrumbStore';
import SearchFilterView from '../../components/ui/SearchFilterView';
import { IChapter, IPagination } from '../../types';
import { useStudyMaterialChapterQuery } from '../../store/pages/StudyMaterial/useStudyMaterialStore';
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

function Chapter() {
    // Fetch chapter here
    const { breadCrumb } = useBreadCrumb();
    const [pagination, setPagination] = useState<IPagination>({
        limit: 20,
        order: "desc",
        page: 1,
        sortBy: "createdAt",
        parentId: breadCrumb[breadCrumb.length - 1].id
    })

    const inputRef = useRef<HTMLInputElement>(null!)
    const handleSearch = () => {
        setPagination({
            ...pagination
        })
    }

    const { isPending, isError, error, data } = useStudyMaterialChapterQuery(pagination)

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
                    data?.data?.data?.data?.map((item: IChapter, index: number) => {
                        return <CategoryCard key={index} id={item._id!} Icon={<FaFolder size={40} />} label={item.name} />
                    })
                }
            </div>
        </div>
    )
}

export default Chapter