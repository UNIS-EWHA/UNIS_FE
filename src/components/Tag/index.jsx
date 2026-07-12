function Tag({ label, isActive, onClick, fixed = true }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[20px] lg:rounded-[40px] border border-white text-[10px] md:text-[12px] lg:text-[20px] font-[600] lg:font-[700] lg:leading-[150%] transition-all duration-200
        ${fixed ? 'w-[60px] h-[21px] md:w-[66px] md:h-[27px] lg:w-[120px] lg:h-[44px]' : 'px-2 py-[2.5px]'}
        ${isActive ? 'bg-white text-black' : 'bg-transparent text-white'}`}
    >
      {label}
    </button>
  );
}

export default Tag;
