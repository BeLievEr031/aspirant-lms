import { RefObject } from "react";

interface IMenu {
    menu: {
        y: number;
        x: number;
        id: string;
    },
    menuRef: RefObject<HTMLDivElement>
}
function Menu({ menu, menuRef }: IMenu) {

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent click from closing the menu
        // console.log(`Clicked: ${action}`);
        console.log(menu);
    };

    return (
        <div
            className="absolute bg-white shadow-lg rounded-lg border p-2 space-y-1 
                       animate-fadeIn scale-95 transform transition duration-200 ease-out"
            style={{ top: menu.y, left: menu.x, minWidth: "150px" }}
            ref={menuRef}
        >
            <ul className="text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md transition">
                    Open
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md transition" onClick={handleDelete}>
                    Delete
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md transition">
                    Edit
                </li>
            </ul>
        </div>
    )
}

export default Menu