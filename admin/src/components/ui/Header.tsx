import clsx from "clsx";
import { className } from "../../types";
import { useEffect, useState } from "react";

function Header({ className }: className) {
    const [currDateTime, setCurrDateTime] = useState(new Date().toLocaleString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrDateTime(new Date().toLocaleString());
        }, 1000);

        // Cleanup function to clear interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div className={clsx("h-12 bg-white shadow-md fixed top-0 w-full", className)}>
            <div className="fixed right-0 text-2xl mr-2 mr-1/2 mt-2 font-semibold">
                {currDateTime}
            </div>
        </div>
    );
}

export default Header;
