import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "../components/ui/SideBar"
import Header from "../components/ui/Header"
import BreadCrumb from "../components/ui/BreadCrumb"
import { ISideBarItem } from "../types"
import { IoHome } from "react-icons/io5";
import { FaBookOpen, } from "react-icons/fa";
import { MdOutlineViewTimeline } from "react-icons/md";
import { AiOutlineContainer } from "react-icons/ai";
import { FaVideo } from "react-icons/fa6";
import { useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { FaRobot } from "react-icons/fa";
import useLocationState from "../hooks/useLocationState"

const sideItem: ISideBarItem[] = [
    {
        label: "home",
        href: '/dashboard',
        Icon: <IoHome />
    },
    {
        label: "study plan",
        href: '/study-plan',
        Icon: < MdOutlineViewTimeline />
    },
    {
        label: "study material",
        href: '/study-material',
        Icon: <FaBookOpen />
    },
    {
        label: "exam t.t",
        href: '/exam-time-table',
        Icon: < AiOutlineContainer />
    },
    {
        label: "upload Lectures",
        href: '/upload-lectures',
        Icon: < FaVideo />
    },
    {
        label: "A.I",
        href: '/ai',
        Icon: < FaRobot />
    },
    // {
    //     label: "upload Quizz",
    //     href: '/upload-quizz',
    //     Icon: < IoNewspaperOutline />
    // },
    // {
    //     label: "notification",
    //     href: '/notification',
    //     Icon: < IoIosNotifications />
    // },
]
function DashboardLayout() {
    const navigate = useNavigate();
    const { isSignedIn, isLoaded } = useUser()
    const { pathname } = useLocationState();


    useEffect(() => {
        if (!isSignedIn) {
            navigate("/auth")
        } else {
            navigate("/dashboard")
        }
    }, [isLoaded])

    if (!isLoaded) {
        return <div>Loading...</div>
    }


    return (
        <div className='flex h-[100vh] items-start'>
            <SideBar className="w-[20%] h-full fixed top-0" items={sideItem} />
            <div className="w-[80%] h-full ml-[20%]">
                <Header />
                <div className="w-full px-4 py-3 mt-12">
                    {!pathname.includes("ai") && <BreadCrumb />}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout