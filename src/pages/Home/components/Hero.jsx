import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 relative">
      <p className="text-white-body text-[12px] lg:text-[16px] font-[400] mb-6 lg:mb-10">
        이화여대 중앙실전 IT 창업 학회
      </p>

      <h1 className="text-center font-[700] text-[32px] md:text-[48px] lg:text-[64px] leading-tight mb-6 lg:mb-10">
        <span className="text-white">Be UNIque,</span>
        <br />
        <span className="text-blue-primary">Work in UNIson.</span>
      </h1>

      <button
        onClick={() => navigate('/application')}
        className="border border-white text-white text-[12px] lg:text-[16px] px-6 py-2 rounded-full mb-20 lg:mb-32"
      >
        지원하기
      </button>
      <div className="text-center">
        <p className="text-white text-[14px] md:text-[16px] lg:text-[20px] font-[500] leading-[160%]">
          세상을 밝힐 첫 걸음, UNIS 입니다.
        </p>
        <p className="text-white text-[14px] md:text-[16px] lg:text-[20px] font-[500] leading-[160%]">
          당신의 반짝이는 열정은 세상을 바꿀 빛이 됩니다.
        </p>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-white/20" />
    </div>
  );
}

export default Hero;
