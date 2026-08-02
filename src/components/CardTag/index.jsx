function CardTag({ label }) {
  return (
    <div className="text-white px-2 lg:px-4 py-1 rounded-[20px] lg:rounded-[24px] border border-white text-[10px] lg:text-[20px] font-semibold lg:font-bold lg:leading-[150%]">
      {label}
    </div>
  );
}

export default CardTag;
