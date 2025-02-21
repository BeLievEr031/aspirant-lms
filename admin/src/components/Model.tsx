import React, { useRef } from "react";
import Button from "./Button"
import Input from "./Input"
import { RxCross2 } from "react-icons/rx";
interface IModel {
    handleModelOpen: () => void;
    handleApiCall: (data: string) => void;
    isPending?: boolean
}
const Model: React.FC<IModel> = ({ handleModelOpen, handleApiCall, isPending }) => {
    const inputRef = useRef<HTMLInputElement>(null!);
    return (
        <div className='w-[400px] h-[200px] bg-white px-3 py-2 rounded-xl border-2 border-black'>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold my-2">Add Exam Category</h1>
                <RxCross2 size={25} className="cursor-pointer" onClick={handleModelOpen} />
            </div>
            <Input name="Add Category Input" className="my-2 focus:ring-black text-black focus:ring-2" inputRef={inputRef} />
            <div className="flex gap-2 justify-end">
                <Button className="my-2" onClick={() => handleApiCall(inputRef.current?.value)} isLoading={isPending}>Create</Button>
                <Button className="my-2" onClick={handleModelOpen} variant="danger">Cancel</Button>
            </div>
        </div>
    )
}

export default Model