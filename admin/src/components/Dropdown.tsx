import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
    options: { label: string; value: string }[];
    onSelect: (value: string) => void;
    placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, placeholder = "Select an option" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
        setSelected(value);
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-64" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2 border rounded-lg flex justify-between items-center bg-white shadow-md"
            >
                {selected ? options.find((opt) => opt.value === selected)?.label : placeholder}
                <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
                <ul className="absolute w-full mt-1 border rounded-lg bg-white shadow-md z-10">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
