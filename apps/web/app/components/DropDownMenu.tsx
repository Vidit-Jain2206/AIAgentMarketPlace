"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";

interface DropdownSelectProps {
  options: string[];
  defaultValue?: string;
  selectedState: string;
  setSelectedState: (value: string) => void;
}

export default function DropdownSelect({
  options,
  defaultValue,
  setSelectedState,
  selectedState,
}: DropdownSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const handleSelect = (option: string) => {
    setIsOpen(false);
    setSelectedState(option);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between  px-4 py-2  text-white border-[1px] border-white rounded-lg  transition"
      >
        <span>{selectedState || defaultValue}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 w-full shadow-lg z-50 bg-black border-[1px] border-gray-300">
          <ul className="flex flex-col gap-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className={`flex items-center justify-between px-4 py-1 cursor-pointer transition text-sm hover:bg-gray-800
                  ${selectedState === option ? "text-white" : "text-gray-300  hover:text-white"}
                `}
              >
                <span>{option}</span>
                {selectedState === option && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
