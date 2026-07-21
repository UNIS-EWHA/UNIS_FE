import { useEffect, useRef, useState } from 'react';

const activities = [
  {
    image: null,
    title: '정규 세션',
    description:
      '창업과 비즈니스에 대한 이론을 넘어 실제 프로젝트를 수행하며 문제를 정의하고 해결합니다. 시장을 바라보는 시야를 넓히고 고객을 이해하는 경험을 통해 창업가로서의 역량을 키워나갑니다.',
  },
  {
    image: null,
    title: '네트워킹',
    description:
      '학회원, 창업가, 투자자 등 다양한 사람들과의 만남을 통해 인사이트를 넓히고 의미 있는 관계를 만들어갑니다. 함께 고민하고 협업하는 과정 속에서 새로운 기회와 성장을 경험할 수 있습니다.',
  },
  {
    image: null,
    title: '직무 스터디',
    description:
      '기획, 디자인, 프론트엔드, 백엔드 분야별 스터디를 진행하며 직무 역량을 강화합니다. 실습과 협업을 통해 실제 프로젝트에 필요한 실무 경험을 쌓을 수 있습니다.',
  },
];

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

function ActivitySection() {
  return (
    <div className="px-5 md:px-15 lg:px-45">
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
        Activity
      </p>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
        UNIS 프로그램
      </p>

      <div className="flex flex-col gap-8 md:gap-4 lg:gap-14">
        {activities.map((item, index) => (
          <ActivityItem key={index} {...item} isEven={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
}

export default ActivitySection;
