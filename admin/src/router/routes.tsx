import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout";
import StudyMaterial from "../pages/StudyMaterial/StudyMaterial";
import StudyPlan from "../pages/StudyPlan/StudyPlan";
import ExamCategory from "../pages/StudyMaterial/ExamCategory";
import Subject from "../pages/StudyMaterial/Subject";
import Chapter from "../pages/StudyMaterial/Chapter";
import NotFound from "../pages/NotFound/NotFound";
import Lectures from "../pages/Lectures/Lectures";
import Quizz from "../pages/Quizz/Quizz";
import Notification from "../pages/Notification/Notification";
import Dashboard from "../pages/Dashboard/Dashboard";
import ExamTT from "../pages/ExamTT/ExamTT";
import Profile from "../pages/Profile/Profile";
import RootLayout from "../layouts/RootLayout";
import { Auth } from "../pages/Auth/Auth";
import LecturesExamCategory from "../pages/Lectures/LecturesExamCategory";
import LecturesSubject from "../pages/Lectures/LecturesSubject";
import LecturesChapter from "../pages/Lectures/LecturesChapter";
import LecturesResource from "../pages/Lectures/LecturesResource";
import StudyPlanExamCategory from "../pages/StudyPlan/StudyPlanExamCategory";
import TimeTableExamCategory from "../pages/ExamTT/TimeTableExamCategory";
import TimeTableResource from "../pages/ExamTT/TimeTableResource";
import StudyMaterialResource from "../pages/StudyMaterial/Resources";
import PlanResources from "../pages/StudyPlan/StudyPlanResource";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: '',
                element: <DashboardLayout />,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: 'study-material',
                        element: <StudyMaterial />,
                        children: [
                            {
                                path: "",
                                element: <ExamCategory />,
                            },
                            {
                                path: ":category-id/",
                                element: <Subject />,

                            },
                            {
                                path: ":category-id/:subject-id",
                                element: <Chapter />
                            },

                            {
                                path: ":category-id/:subject-id/:chapter-id",
                                element: <StudyMaterialResource />
                            },
                        ]
                    },
                    {
                        path: "study-plan",
                        element: <StudyPlan />,
                        children: [
                            {
                                path: "",
                                element: <StudyPlanExamCategory />,
                            },
                            {
                                path: ":category-id",
                                element: <PlanResources />
                            },
                        ]
                    },
                    {
                        path: "upload-lectures",
                        element: <Lectures />,
                        children: [
                            {
                                path: "",
                                element: <LecturesExamCategory />,
                            },
                            {
                                path: ":category-id/",
                                element: <LecturesSubject />,

                            },
                            {
                                path: ":category-id/:subject-id",
                                element: <LecturesChapter />
                            },

                            {
                                path: ":category-id/:subject-id/:chapter-id",
                                element: <LecturesResource />
                            },
                        ]
                    },
                    {
                        path: "upload-quizz",
                        element: <Quizz />
                    },
                    {
                        path: "notification",
                        element: <Notification />
                    },
                    {
                        path: "exam-time-table",
                        element: <ExamTT />,
                        children: [
                            {
                                path: "",
                                element: <TimeTableExamCategory />,
                            },
                            {
                                path: ":category-id",
                                element: <TimeTableResource />
                            },
                        ]
                    },
                    {
                        path: "profile",
                        element: <Profile />
                    },
                ]
            },
            {
                path: "auth",
                element: <Auth />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;