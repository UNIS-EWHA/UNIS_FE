import { useEffect, useRef, useState } from 'react';

function ActivityItem({ image, title, description, isEven }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} gap-4 md:gap-10 lg:gap-20
        ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <div className="w-full md:w-2/5 aspect-[16/9] bg-white/10 rounded-[10px] lg:rounded-[20px] overflow-hidden">
        {image && (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        )}
      </div>

      <div
        className={`w-full md:w-3/5 flex flex-col justify-center gap-2 lg:gap-6 ${isEven ? 'md:text-right' : 'md:text-left'}`}
      >
        <p className="text-white text-[14px] md:text-[18px] lg:text-[32px] font-[600] md:font-[700]">
          {title}
        </p>
        <p className="text-white-body text-[12px] lg:text-[20px] font-[400] leading-[160%]">
          {description}
        </p>
      </div>
    </div>
  );
}

function ActivitySection({ programs }) {
  return (
    <div className="px-5 md:px-15 lg:px-45">
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
        Activity
      </p>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
        UNIS 프로그램
      </p>

      <div className="flex flex-col gap-8 md:gap-4 lg:gap-14">
        {programs.map((program, index) => (
          <ActivityItem
            key={program.programId}
            image={program.imageUrl}
            title={program.title}
            description={program.description}
            isEven={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}

export default ActivitySection;
