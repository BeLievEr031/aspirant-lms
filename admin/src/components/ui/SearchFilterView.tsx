import React, { useState } from "react";
import Button from "../Button";
import Input from "../Input"
import { CiSearch } from "react-icons/ci";
// import Dropdown from "../Dropdown";
import { MdOutlineAddBox } from "react-icons/md";
import OverlayModel from "./OverlayModel";

interface SearchFilterViewProps {
    inputRef: React.RefObject<HTMLInputElement>;
    handleSearch: () => void
}

const SearchFilterView: React.FC<SearchFilterViewProps> = ({ inputRef, handleSearch }) => {
    const [isOpen, setOpen] = useState(false)
    const handleModelOpen = () => {
        setOpen(!isOpen)
    }

    return (
        <React.Fragment>
            <div className="flex  justify-between sticky top-12 bg-white py-3">
                <div className="w-1/2 flex">
                    <Input name="search-input" inputRef={inputRef}
                        className="w-[300px]"
                        icon={CiSearch}
                    />
                    <Button className="mx-2" onClick={handleSearch} >
                        Search
                    </Button>
                </div>
                <div>
                    <Button iconRight={MdOutlineAddBox} onClick={handleModelOpen}>Add</Button>
                </div>

            </div>
            {isOpen && <OverlayModel isOpen={isOpen} handleModelOpen={handleModelOpen} />}
        </React.Fragment>

    )
}

export default SearchFilterView