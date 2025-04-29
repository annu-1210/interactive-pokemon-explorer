// components/SearchBar.tsx
import TypeDropdown from "./TypeDropdown";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
  types: string[];
}

const SearchBar = ({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  types,
}: SearchBarProps) => (
  <section className="search-filter container my-4" aria-label="Search and filter Pokémon">
    <div className="row g-3 align-items-center">
      <div className="col-12 col-md-6">
        <input
          type="search"
          className="form-control custom-input"
          placeholder="🔍 Search Pokémon"
          aria-label="Search Pokémon by name"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-6">
        <TypeDropdown
          selected={typeFilter}
          types={types}
          onSelect={onTypeChange}
        />
      </div>
    </div>
  </section>
);

export default SearchBar;
