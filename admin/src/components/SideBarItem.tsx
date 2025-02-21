import { Link, useLocation } from 'react-router-dom'
import { ISideBarItem } from '../types'
import clsx from 'clsx'

function SideBarItem({ label, href, Icon }: ISideBarItem) {
    const location = useLocation();
    return (
        <Link to={href} className={
            clsx("block w-full border-b-2 px-2 py-2 text-md cursor-pointer hover:bg-button-hover hover:text-white font-semibold transition-all",
                location.pathname.includes(href) ? "bg-button-hover text-white" : ""
            )
        }>
            <div className='flex gap-2 items-center capitalize'>
                {Icon}
                {label}
            </div>
        </Link>
    )
}

export default SideBarItem