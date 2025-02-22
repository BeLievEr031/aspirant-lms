import { ReactNode, } from "react";

export interface className {
    className?: string
}
export interface ISideBar extends className {
    id?: number;
    items: ISideBarItem[];
}

export interface ILogo extends className {
    src: string
}

export interface ISideBarItem extends className {
    label: string;
    href: string;
    Icon: ReactNode;
}


export interface ICategoryCard extends className {
    id: string;
    label: string;
    Icon: ReactNode;
    handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}


export interface IExamCategory {
    _id?: string,
    label: string;
    belong: string | "study-material" | 'time-table' | 'study-plan' | 'upload-lectures' | 'upload-quizz'
}

export interface IPagination {
    page: number;
    limit: number;
    order: "asc" | "desc";
    sortBy: string;
    parentId?: string;
    chapterId?: string;
    belong?: string;
}

export interface ISubject {
    name: string;
    examId: string;
}

export interface IChapter {
    _id?: string;
    name: string;
    subjectId: string;
}

export interface ILectureResource {
    _id?: string;
    name: string;
    chapterId: string;
    url: string;
    belong: string | "study-material" | 'time-table' | 'study-plan' | 'upload-lectures' | 'upload-quizz';
}