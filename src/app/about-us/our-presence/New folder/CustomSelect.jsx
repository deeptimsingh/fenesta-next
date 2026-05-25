"use client";
import { useState, useRef, useEffect, useMemo } from "react";

export default function CustomSelect({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select"
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Dedupe so we never show repeated options
  const uniqueOptions = useMemo(
    () => Array.from(new Set(options)),
    [options]
  );

  // close dropdown outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-auto max-w-1/2 min-w-[calc(50%-30px)]">

      {/* label */}
      <label className="text-base text-theme mb-1 block">
        {label}
      </label>

      {/* select box */}
      <div
        onClick={() => setOpen(!open)}
        className="border  border-[#D9D9D9] px-4 py-3 flex items-center justify-between cursor-pointer bg-white "
      >
        <span className="text-base text-[#555555]">
          {value || placeholder}
        </span>

        <svg
          className={`w-6 h-6 transition ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="#0094DA"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* dropdown */}
      {open && (
        <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-[#D9D9D9]  shadow-lg z-20">
          {uniqueOptions.map((item, index) => (
            <li
              key={item ?? index}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))}

        </ul>
      )}
    </div>
  );
}