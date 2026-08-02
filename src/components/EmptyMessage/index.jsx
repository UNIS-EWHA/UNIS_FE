function EmptyMessage({
  mainMessage = '일치하는 결과가 없습니다.',
  subMessage = '다른 조건으로 다시 검색해보세요.',
}) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full py-20">
      <p className="text-white text-[14px] md:text-[20px] lg:text-[28px]">
        {mainMessage}
      </p>
      <p className="text-white-body text-[12px] md:text-[16px] lg:text-[24px]">
        {subMessage}
      </p>
    </div>
  );
}

export default EmptyMessage;
