import useEmblaCarousel from 'embla-carousel-react';
import { useState, useEffect } from 'react';
import PlanningIcon from '@/assets/ic_planning.svg';
import DesignIcon from '@/assets/ic_design.svg';
import FrontendIcon from '@/assets/ic_frontend.svg';
import BackendIcon from '@/assets/ic_backend.svg';

function PartCard({ icon, title, description, tags }) {
  return (
    <div className="w-full h-[270px] md:h-[300px] lg:h-[450px] flex flex-col items-center gap-6 backdrop-blur-[50px] border border-white/20 rounded-[10px] lg:rounded-[20px] p-6 lg:p-10">
      <img
        src={icon}
        alt="icon"
        className="md:w-4 md:h-auto lg:w-[30px] lg:h-auto"
      />
      <p className="text-white text-[16px] lg:text-[28px] font-[600] lg:font-[700] leading-[150%] text-center">
        {title}
      </p>

      <p className="text-white-body text-[12px] lg:text-[20px] font-[400] leading-[160%]">
        {description}
      </p>

      <div className="flex items-center gap-4 mt-3">
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

const partCards = [
  {
    icon: PlanningIcon,
    title: '기획',
    description:
      '사용자의 문제를 발견하고, 이를 해결할 수 있는 서비스 구조와 방향성을 설계합니다. 아이디어를 구체화하며 기능 기획, 사용자 흐름 설계, 서비스 전략 수립, 마케팅 등을 담당합니다.',
    tags: ['프로덕트 기획', '프로젝트 관리'],
  },
  {
    icon: DesignIcon,
    title: '디자인',
    description:
      '사용자 경험을 중심으로 서비스의 화면과 브랜드 경험을 디자인합니다. 직관적인 UI와 일관된 디자인 시스템을 통해 서비스를 더 매력적이고 사용하기 쉽게 만듭니다.',
    tags: ['Figma 활용', 'UIUX 디자인'],
  },
  {
    icon: FrontendIcon,
    title: '프론트엔드',
    description:
      '사용자가 직접 마주하는 웹·앱 화면을 구현하며, 서비스의 사용자 경험을 완성합니다. 기획과 디자인을 실제 인터페이스로 구현하여 직관적이고 자연스러운 사용 흐름을 만듭니다.',
    tags: ['UI 구현', '인터렉션 구현'],
  },
  {
    icon: BackendIcon,
    title: '백엔드',
    description:
      '서비스가 안정적으로 운영될 수 있도록 서버와 데이터 구조를 설계하고 개발합니다. 사용자 데이터 관리, API 개발, 데이터베이스 설계, 서버 로직 구현 등을 담당합니다.',
    tags: ['데이터 구조', 'API 구현'],
  },
];

function Part() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <div className="pl-5 md:pl-15 lg:pl-45">
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
        Parts
      </p>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
        UNIS 파트 및 역할
      </p>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {partCards.map((card, index) => (
            <div
              key={index}
              className="flex-none w-[85%] md:w-[45%] lg:w-[32%] pr-3 lg:pr-6"
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
            >
              <PartCard {...card} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        {partCards.map((_, index) => (
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
