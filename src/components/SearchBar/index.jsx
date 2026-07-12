import { useState } from 'react';
import SearchIcon from '@/assets/ic_search_36.svg';

function SearchBar({ placeholder }) {
  const [value, setValue] = useState('');

  return (
    <div className="flex items-center gap-2 lg:gap-6 w-full border border-white rounded-[10px] lg:rounded-[24px] px-4 py-2 md:py-2.5 lg:px-6 lg:py-4">
      <img src={SearchIcon} alt="search" className="w-[17px] lg:w-9" />

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-white text-[12px] md:text-[14px] lg:text-[24px] placeholder:text-white-body outline-none"
      />
    </div>
  );
}

export default SearchBar;
