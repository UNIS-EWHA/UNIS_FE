import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from 'react';
import { getHomeHero } from '@/api/home';

const DEFAULT_HERO = {
  mainTitle: 'Be UNIque,\nWork in UNIson.',
  subTitle: '이화여대 중앙실전 IT 창업 학회',
  ctaText: '지원하기',
};

function Hero() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hero, setHero] = useState(DEFAULT_HERO);
  const lineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (lineRef.current) observer.observe(lineRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    getHomeHero()
      .then((res) => setHero(res.data))
      .catch(() => setHero(DEFAULT_HERO));
  }, []);

  const titleLines = hero.mainTitle.split('\n');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 relative">
      <p className="text-white-body text-[12px] lg:text-[16px] font-[400] mb-6 lg:mb-10">
        {hero.subTitle}
      </p>

      <h1 className="text-center font-[700] text-[32px] md:text-[48px] lg:text-[64px] leading-tight mb-6 lg:mb-10">
        {titleLines.map((line, index) => (
          <Fragment key={index}>
            <span className={index === 0 ? 'text-white' : 'text-blue-primary'}>
              {line}
            </span>
            {index < titleLines.length - 1 && <br />}
          </Fragment>
        ))}
      </h1>

      <button
        onClick={() => navigate('/application')}
        className="border border-white text-white text-[12px] lg:text-[16px] px-6 py-2 rounded-full mb-20 lg:mb-32"
      >
        {hero.ctaText}
      </button>
      <div className="text-center">
        <p className="text-white text-[14px] md:text-[16px] lg:text-[20px] font-[500] leading-[160%]">
          세상을 밝힐 첫 걸음, UNIS 입니다.
        </p>
        <p className="text-white text-[14px] md:text-[16px] lg:text-[20px] font-[500] leading-[160%]">
          당신의 반짝이는 열정은 세상을 바꿀 빛이 됩니다.
        </p>
      </div>
      <div
        ref={lineRef}
        className="flex justify-center mt-16 h-[150px] md:h-[250px] lg:h-[400px]"
      >
        <div
          className={`w-[1px] ${isVisible ? 'animate-draw-line' : 'h-0'}`}
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.3))',
          }}
        />
      </div>
    </div>
  );
}

export default Hero;
