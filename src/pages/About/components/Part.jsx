import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect } from 'react';
import useInView from '@/hooks/useInView';
import PlanningIcon from '@/assets/ic_planning.svg';
import DesignIcon from '@/assets/ic_design.svg';
import FrontendIcon from '@/assets/ic_frontend.svg';
import BackendIcon from '@/assets/ic_backend.svg';

function PartCard({ icon, title, description, tags }) {
  return (
    <div className="w-full min-h-[270px] md:min-h-[300px] lg:min-h-[450px] flex flex-col items-center gap-6 backdrop-blur-[50px] border border-white/20 rounded-[10px] lg:rounded-[20px] p-6 lg:p-10">
      <img
        src={icon}
        alt="icon"
        className="w-6 h-6 md:w-4 md:h-4 lg:w-[30px] lg:h-[30px]"
      />
      <p className="text-white text-[16px] lg:text-[28px] font-[600] lg:font-[700] leading-[150%] text-center line-clamp-1">
        {title}
      </p>

      <p className="text-white-body text-[12px] lg:text-[20px] font-[400] leading-[160%]">
        {description}
      </p>

      <div className="flex items-center gap-4 mt-auto">
        {tags.map((tag) => (
          <button
            key={tag}
            className="border border-white text-white text-[12px] lg:text-[16px] px-2 lg:px-4 py-1 rounded-[20px]"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

const partIcons = {
  기획: PlanningIcon,
  디자인: DesignIcon,
  프론트엔드: FrontendIcon,
  백엔드: BackendIcon,
};

function Part({ parts }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { ref, isVisible } = useInView();

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <div
      ref={ref}
      className={`pl-5 md:pl-15 lg:pl-45 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
        Parts
      </p>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
        UNIS 파트 및 역할
      </p>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {parts.map((part, index) => (
            <div
              key={part.name}
              className="flex-none w-[85%] md:w-[45%] lg:w-[32%] pr-3 lg:pr-6"
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
            >
              <PartCard
                icon={partIcons[part.name]}
                title={part.name}
                description={part.description}
                tags={part.tags}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        {parts.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              selectedIndex === index ? 'w-7 bg-white' : 'w-2 bg-white-body'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Part;
