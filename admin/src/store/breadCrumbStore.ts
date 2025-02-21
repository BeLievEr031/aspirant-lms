import { create } from "zustand";

// Define the type for breadcrumb items
export interface InewUrlData {
    id: string;
    label: string;
    url: string;
}

// Define the Zustand store's state and actions
interface BreadCrumbState {
    breadCrumb: InewUrlData[];
    addBreadCrumb: (newUrlData: InewUrlData[]) => void;
    removeLastBreadCrumb: () => void;
    resetBreadCrumb: () => void;
}

// Create the Zustand store with TypeScript typings
const useBreadCrumb = create<BreadCrumbState>((set) => ({
    breadCrumb: [],
    addBreadCrumb: (newUrlData) =>
        set(() => ({ breadCrumb: newUrlData })),

    removeLastBreadCrumb: () =>
        set((state) => ({
            breadCrumb: state.breadCrumb.slice(0, -1),
        })),

    resetBreadCrumb: () => set({ breadCrumb: [] }),
}));

export default useBreadCrumb;
