import FooterImage from '@/assets/img_footer.png';
import { useNavigate } from 'react-router-dom';
import useRecruitInfo from '@/hooks/useRecruitInfo';

function Footer() {
  const navigate = useNavigate();
  const { applyButtonLabel, isApplyDisabled } = useRecruitInfo();
  return (
    <div className="relative w-full aspect-16/7">
      {/* 배경 이미지 */}
      <img
        src={FooterImage}
        alt="footer"
        className="w-full h-full object-cover"
      />

      {/* 이미지 위 글씨 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-white text-[14px] font-bold leading-[150%] tracking-[0%] mb-2 md:text-[18px] md:leading-normal lg:text-[38px] lg:mb-8">
          UNIS와 함께 할 8기 학회원을 모집합니다.
        </p>
        <p className="text-white-body text-[8px] font-[400] leading-[150%] tracking-[0%] mb-3 md:text-[12px] md:leading-[160%] md:mb-[29px] lg:text-[24px] font-[500] lg:leading-[150%] lg:mb-[53px]">
          아이디어를 현실로 만드는 여정, 지금 UNIS에서 시작하세요.
        </p>
        <button
          onClick={() => {
            if (isApplyDisabled) return;
            navigate('/application');
          }}
          disabled={isApplyDisabled}
          className="border-[0.82px] md:border-[2.13px] lg:-border-4 border-blue-mint text-[10px] md:text-[16px] lg:text-[28px] text-[#91f8ff] font-[700] leading-normal rounded-[20px] md:rounded-[52px] lg:rounded-[40px] flex items-center justify-center min-w-18 h-[21px] px-3 md:min-w-[122px] md:h-[34px] lg:min-w-[276px] lg:h-18 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {applyButtonLabel}
        </button>
      </div>
    </div>
  );
}

export default Footer;
