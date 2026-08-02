import { useNavigate } from 'react-router-dom';

function AuthRequiredModal({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-5">
      <div className="w-full max-w-100 md:max-w-140 lg:max-w-162.5 border-2 border-white-body rounded-[14px] md:rounded-2xl lg:rounded-[20px] backdrop-blur-[50px] bg-white/25 p-8 md:p-10 lg:p-14 flex flex-col items-center gap-8 md:gap-10 lg:gap-14">
        <p className="text-white text-[18px] md:text-[22px] lg:text-[28px] font-bold text-center">
          로그인이 필요합니다.
        </p>
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-10 w-full">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-2 md:py-2.5 lg:py-3 bg-white text-black text-[14px] md:text-[16px] lg:text-[20px] font-bold rounded-md md:rounded-lg"
          >
            로그인하기
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 md:py-2.5 lg:py-3 bg-white text-black text-[14px] md:text-[16px] lg:text-[20px] font-bold rounded-md md:rounded-lg"
          >
            나중에
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthRequiredModal;
