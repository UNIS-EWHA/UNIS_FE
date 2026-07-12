import UnisLogo from '@/assets/ic_unis_logo_48.svg';

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

function CoreValues() {
  return (
    <div className="px-5 md:px-15 lg:px-45">
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
        Core Values
      </p>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
        UNIS 핵심 가치
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <ValueCard
          value="UNIque (독보성)"
          description="이화여대 유일의 실전 창업 학회로서, 아이디어를 실제 실행과 검증까지 이어가는 창업 경험을 제공합니다. 혁신적인 아이디어와 실행력을 바탕으로 직접 부딪히며 성장합니다."
        />
        <ValueCard
          value="UNIson (협력)"
          description="다양한 전공과 배경을 가진 학회원들이 모여 서로의 강점을 연결하고, 협업을 통해 더 큰 시너지를 만들어갑니다. 이를 바탕으로 함께 배우고 성장하는 협력 중심의 커뮤니티를 지향합니다."
        />
        <ValueCard
          value="Start Small, Think Big"
          description="작은 아이디어에서 출발해 실제 실행과 수익 창출까지 이어질 수 있도록 단계적으로 성장해나갑니다. 사소한 시도와 작은 성과의 가치를 중요하게 여기며, 더 큰 가능성과 미래를 향해 끊임없이 도전합니다."
        />
      </div>
    </div>
  );
}

export default CoreValues;
