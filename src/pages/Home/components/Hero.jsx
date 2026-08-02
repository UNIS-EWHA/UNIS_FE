import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from 'react';
import { getHomeHero } from '@/api/home';
import HeroBackground from '@/assets/img_Home_background.png';

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
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      <div className="relative w-full aspect-3/2 flex flex-col items-center justify-center">
        <img
          src={HeroBackground}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        <p className="text-white text-12px lg:text-[28px] font-bold mb-6 lg:mb-40">
          {hero.subTitle}
        </p>

        <h1 className="text-center font-extrabold text-[32px] md:text-[48px] lg:text-[128px] leading-tight mb-6 lg:mb-30">
          {titleLines.map((line, index) => (
            <Fragment key={index}>
              <span
                className={index === 0 ? 'text-white' : 'text-blue-primary'}
              >
                {line}
              </span>
              {index < titleLines.length - 1 && <br />}
            </Fragment>
          ))}
        </h1>

        <button
          onClick={() => navigate('/application')}
          className="border-2 border-blue-mint text-blue-mint text-[12px] lg:text-[24px] px-12 py-2 rounded-[40px]"
        >
          {hero.ctaText}
        </button>
      </div>

      <div className="text-center mt-16 lg:mt-50">
        <p className="text-white text-[14px] md:text-[16px] lg:text-[48px] font-bold leading-[150%]">
          세상을 밝힐 첫 걸음, UNIS 입니다.
        </p>
        <p className="text-white text-[14px] md:text-[16px] lg:text-[48px] font-bold leading-[150%]">
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
