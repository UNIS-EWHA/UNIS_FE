import UnisLogo from '@/assets/ic_unis_logo_48.svg';
import useInView from '@/hooks/useInView';

function ValueCard({ value, description }) {
  return (
    <div className="w-full flex flex-col items-center gap-4 lg:gap-6 backdrop-blur-[50px] border border-white/20 rounded-[10px] lg:rounded-[20px] p-6 md:pb-10 lg:p-8">
      <img src={UnisLogo} alt="unis logo" className="w-6 h-6 lg:w-8 lg:h-8" />

      <p className="text-white text-[14px] md:text-[16px] lg:text-[28px] font-[600] lg:font-[700] text-center">
        {value}
      </p>

      <p className="text-white-body text-[12px] lg:text-[20px] font-[400] leading-[160%]">
        {description}
      </p>
    </div>
  );
}

function CoreValues({ coreValues }) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`px-5 md:px-15 lg:px-45 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
        Core Values
      </p>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
        UNIS 핵심 가치
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {coreValues.map((coreValue) => (
          <ValueCard
            key={coreValue.title}
            value={coreValue.title}
            description={coreValue.description}
          />
        ))}
      </div>
    </div>
  );
}

export default CoreValues;
