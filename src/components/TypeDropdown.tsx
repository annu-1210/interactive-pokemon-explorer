import { useEffect, useRef, useState } from "react";

interface TypeDropdownProps {
  selected: string;
  types: string[];
  onSelect: (type: string) => void;
}

const TypeDropdown: React.FC<TypeDropdownProps> = ({
  selected,
  types,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown position-relative" ref={dropdownRef}>
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="btn custom-dropdown-toggle w-100 text-start"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || "All Types"}
        <span className="float-end">▾</span>
      </button>

      {isOpen && (
        <ul
          className="custom-dropdown-menu mt-2 shadow w-100"
          role="listbox"
          aria-label="Pokémon Type Filter"
        >
          <li
            className="custom-dropdown-item"
            onClick={() => {
              onSelect("");
              setIsOpen(false);
            }}
            role="option"
          >
            All Types
          </li>
          {types.map((type) => (
            <li
              key={type}
              className="custom-dropdown-item text-capitalize"
              onClick={() => {
                onSelect(type);
                setIsOpen(false);
              }}
              role="option"
            >
              {type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TypeDropdown;
