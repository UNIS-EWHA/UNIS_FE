import { useEffect, useRef, useState } from 'react';
import { getHomeStats } from '@/api/home';
import useInView from '@/hooks/useInView';

function useCountUp(target, duration = 1000) {
  const startValue = Math.floor(target * 0.8);
  const [count, setCount] = useState(startValue);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = startValue;
    const increment = (target - startValue) / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return { count, ref };
}

function StatCard({ number, label }) {
  const numericValue = parseInt(number);
  const suffix = number.replace(String(numericValue), '');
  const { count, ref } = useCountUp(numericValue);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center border border-white/20 rounded-[10px] p-8 md:p-10 lg:p-12 backdrop-blur-[50px] gap-2"
    >
      <p className="text-blue-mint text-[28px] md:text-[34px] lg:text-[38px] font-[700]">
        {count}
        {suffix}
      </p>
      <p className="text-white-body text-[8px] md:text-[16px] lg:text-[20px] font-[400]">
        {label}
      </p>
    </div>
  );
}

function Stats() {
  const [stats, setStats] = useState(null);
  const { ref, isVisible } = useInView();

  useEffect(() => {
    getHomeStats()
      .then((res) => setStats(res.data))
      .catch(() => setStats(null));
  }, []);

  const statCards = stats
    ? [
        { number: `${stats.memberCount}+`, label: '누적 학회원' },
        { number: `${stats.projectCount}+`, label: '프로젝트' },
        { number: `${stats.awardCount}+`, label: '수상 성과' },
      ]
    : [];

  return (
    <div
      ref={ref}
      className={`px-5 md:px-15 lg:px-45 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      {stats && (
        <>
          <p className="text-white text-[16px] md:text-[24px] lg:text-[38px] font-[700] mb-6 md:mb-8 lg:mb-10">
            {stats.generation}기수 활동 기록
          </p>
          <div className="grid grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {statCards.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Stats;
