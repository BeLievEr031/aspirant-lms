import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "../components/ui/SideBar"
import Header from "../components/ui/Header"
import BreadCrumb from "../components/ui/BreadCrumb"
import { ISideBarItem } from "../types"
import { IoHome, IoNewspaperOutline } from "react-icons/io5";
import { FaBookOpen, } from "react-icons/fa";
import { MdOutlineViewTimeline } from "react-icons/md";
import { AiOutlineContainer } from "react-icons/ai";
import { FaVideo } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { useEffect } from "react"
import { useUser } from "@clerk/clerk-react"

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
        label: "upload Quizz",
        href: '/upload-quizz',
        Icon: < IoNewspaperOutline />
    },
    {
        label: "notification",
        href: '/notification',
        Icon: < IoIosNotifications />
    },
]
function DashboardLayout() {
    const navigate = useNavigate();
    const { isSignedIn, isLoaded } = useUser()


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
                    <BreadCrumb />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout