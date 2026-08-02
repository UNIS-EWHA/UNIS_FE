import useInView from '@/hooks/useInView';

function CurriculumItem({ title, description, index, isVisible }) {
  return (
    <div
      className={`flex items-center gap-4 md:gap-5 lg:gap-16 px-[3px] lg:px-14 ${isVisible ? 'animate-fade-down' : 'opacity-0'}`}
      style={isVisible ? { animationDelay: `${index * 0.15}s` } : undefined}
    >
      <div className="relative z-10 w-[6px] h-[6px] lg:w-5 lg:h-5 rounded-full bg-white shrink-0" />

      <div className="w-full border border-white/20 rounded-[10px] lg:rounded-[20px] px-4 py-3 md:p-4 lg:px-10 lg:py-8 backdrop-blur-[50px]">
        <p className="text-white text-[14px] md:text-[16px] lg:text-[32px] font-[600] mb-1 md:mb-2 lg:mb-4">
          {title}
        </p>
        <p className="text-white-body text-[10px] md:text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-[160%] lg:leading-[150%]">
          {description}
        </p>
      </div>
    </div>
  );
}

function Curriculum({ curriculum }) {
  const { ref, isVisible } = useInView();

  return (
    <div ref={ref} className="px-5 md:px-15 lg:px-45">
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
        Curriculum
      </p>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
        학기별 세션 타임라인
      </p>

      <div className="relative">
        <div
          className={`absolute left-[5px] lg:left-16 top-0 bottom-0 w-[1px] lg:w-[3px] origin-top ${isVisible ? 'animate-grow-down' : 'scale-y-0'}`}
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.2) 10%, rgba(255,255,255,0.2) 90%, rgba(255,255,255,0))',
          }}
        />

        <div className="flex flex-col gap-4 lg:gap-16">
          {curriculum.map((item, index) => (
            <CurriculumItem
              key={item.order}
              title={item.title}
              description={item.description}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Curriculum;
