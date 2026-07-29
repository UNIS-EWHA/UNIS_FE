import { useState } from 'react';
import SearchIcon from '@/assets/ic_search_36.svg';

function SearchBar({ placeholder, value, onChange, onSearch }) {
  const [internalValue, setInternalValue] = useState('');
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(currentValue);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(currentValue);
    }
  };

  return (
    <div className="flex items-center gap-2 lg:gap-6 w-full border border-white rounded-[10px] lg:rounded-[24px] px-4 py-2 md:py-2.5 lg:px-6 lg:py-4">
      <button
        type="button"
        onClick={handleSearchClick}
        aria-label="검색"
        className="shrink-0"
      >
        <img src={SearchIcon} alt="search" className="w-[17px] lg:w-9" />
      </button>

      <input
        type="text"
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-transparent text-white text-[12px] md:text-[14px] lg:text-[24px] placeholder:text-white-body outline-none"
      />
    </div>
  );
}

export default SearchBar;
