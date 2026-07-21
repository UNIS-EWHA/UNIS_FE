import { useEffect, useRef, useState } from 'react';

function useCountUp(target, duration = 2500) {
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
      className="flex flex-col items-center justify-center border border-white/20 rounded-[10px] p-8 lg:p-12 backdrop-blur-[50px] gap-2"
    >
      <p className="text-blue-mint text-[32px] lg:text-[48px] font-[700]">
        {count}
        {suffix}
      </p>
      <p className="text-white-body text-[12px] lg:text-[16px] font-[400]">
        {label}
      </p>
    </div>
  );
}

const stats = [
  { number: '130+', label: '누적 학회원' },
  { number: '52+', label: '프로젝트' },
  { number: '18+', label: '수상 성과' },
];

function Stats() {
  return (
    <div className="px-5 md:px-15 lg:px-45">
      <p className="text-white text-[16px] lg:text-[28px] font-[700] mb-6 lg:mb-10">
        7기수 활동 기록
      </p>
      <div className="grid grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}

export default Stats;
