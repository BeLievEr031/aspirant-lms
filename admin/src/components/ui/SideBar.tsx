import clsx from "clsx"
import { ISideBar, ISideBarItem } from '../../types'
import Logo from "../Logo"
import LogoSrc from "../../assets/images/logo.png"
import SideBarItem from "../SideBarItem"
import { CgProfile } from "react-icons/cg";
function SideBar({ className, items }: ISideBar) {
    return (
        <div className={clsx("shadow-md", className)}>
            <Logo src={LogoSrc} className="mb-4" />

            {items.map((item: ISideBarItem, index: number) => {
                return <SideBarItem key={index} label={item.label} href={item.href} Icon={item.Icon} />
            })}

            <div className="absolute bottom-0 w-full">
                <SideBarItem label={"profile"} href={"/profile"} Icon={<CgProfile />} />
            </div>

        </div>
    )
}

export default SideBar