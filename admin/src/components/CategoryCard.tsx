import useBreadCrumb, { InewUrlData } from '../store/breadCrumbStore';
import { ICategoryCard } from '../types'
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEllipsisVertical } from "react-icons/fa6";
function CategoryCard({ id, Icon, label, handleMenuOpen }: ICategoryCard) {
    const navigate = useNavigate();
    const location = useLocation();
    const { breadCrumb, addBreadCrumb } = useBreadCrumb();

    const handleNavigation = () => {
        const isInBread = breadCrumb.findIndex((item: InewUrlData) => item.id === id)
        // console.log(`${location.pathname} / ${label.split(" ").join("-")}`);

        if (isInBread === -1) {
            breadCrumb.push({
                id,
                label: `/${label.split(" ").join("-")}`,
                url: `${location.pathname}/${label.split(" ").join("-")}`
            })
            addBreadCrumb(breadCrumb)
        }

        navigate(`${location.pathname}/${label.split(" ").join("-")}`, {
            state: { from: id }
        });
    }

    return (
        <div className='flex justify-between h-[60px] w-[19%] bg-gray-900/5 hover:bg-blue-900/10 border-2 border-black mt-4 gap-2  items-center rounded-md cursor-pointer select-none'>
            <div className='flex items-center gap-2 px-2 py-1 h-full w-full' onDoubleClick={handleNavigation}>
                {Icon}
                <p className='text-xl font-semibold uppercase'>{label.length > 11 ? label.substring(0, 10) + "..." : label}</p>
            </div>

            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleMenuOpen(e, id)}>
                <FaEllipsisVertical size={25} />
            </button>

        </div>
    )


}

export default CategoryCard