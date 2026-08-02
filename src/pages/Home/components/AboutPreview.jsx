import { useNavigate } from 'react-router-dom';
import UnisIcon from '@/assets/ic_unis_logo_48.svg';
import useInView from '@/hooks/useInView';

const features = [
  {
    icon: UnisIcon,
    title: '실전 프로젝트',
    description:
      '아이디어를 실제 서비스로, 기획부터 배포까지 한 학기 만에 완성합니다.',
  },
  {
    icon: UnisIcon,
    title: '파트 간 협업',
    description: '개발·디자인·기획이 하나의 팀으로 실제 협업 경험을 쌓습니다.',
  },
  {
    icon: UnisIcon,
    title: '창업 네트워크',
    description:
      '이화 안팎의 IT·창업 커뮤니티와 연결됩니다. 사람이 자산이 되는 경험을 만듭니다.',
  },
];

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center gap-4 border border-white/20 rounded-[10px] p-6 lg:p-8 backdrop-blur-[50px]">
      <img src={icon} alt={title} className="w-10 h-10 lg:w-14 lg:h-14" />
      <p className="text-white text-[16px] lg:text-[24px] font-[600] text-center">
        {title}
      </p>
      <p className="text-white-body text-[12px] lg:text-[16px] font-[400] leading-[160%] text-start">
        {description}
      </p>
    </div>
  );
}

function AboutPreview() {
  const navigate = useNavigate();
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`px-5 md:px-15 lg:px-45 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <div className="mb-4 md:mb-6 lg:mb-8">
        <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-4">
          <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400]">
            About UNIS
          </p>
          <button
            onClick={() => navigate('/about')}
            className="text-white text-[12px] md:text-[14px] lg:text-[20px] font-[400] shrink-0"
          >
            About 더보기 →
          </button>
        </div>
        <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] mb-3 md:mb-4 lg:mb-6">
          아이디어를 실전으로 만드는 곳
        </p>
        <p className="text-white-body text-[12px] md:text-[14px] lg:text-[20px] font-[400] leading-[160%]">
          실전 프로젝트를 통해 개발, 디자인, 기획의 다직군이 함께 성장하고
          이대 IT 네트워크의 중심을 만들어갑니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
}

export default AboutPreview;
