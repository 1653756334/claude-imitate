import React, { useState, useRef, useEffect } from "react";

const DropdownMenu: React.FC<DropDown.DropdownMenuProps> = ({
  items,
  callback,
  children,
  position = "bottom",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuWidth, setMenuWidth] = useState<number | undefined>(undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current && menuRef.current) {
      const buttonWidth = buttonRef.current.offsetWidth;
      const menuWidth = menuRef.current.offsetWidth;
      setMenuWidth(Math.max(buttonWidth, menuWidth));
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        className="text-xs flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white font-medium text-gray-700 hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          } left-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 border border-gray-300/60 z-50
          max-h-[200px] overflow-y-auto scrollbar`}
          style={{
            width: menuWidth ? `${menuWidth}px` : "auto",
            minWidth: "100%",
            [position === "top" ? "bottom" : "top"]: "100%",
          }}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer z-50 relative whitespace-nowrap"
                role="menuitem"
                onClick={() => {
                  callback(item);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
