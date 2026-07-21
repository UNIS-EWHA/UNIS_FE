import { useNavigate } from 'react-router-dom';

function AuthRequiredModal({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 px-5">
      <div className="w-full max-w-[360px] border border-white/20 rounded-[20px] backdrop-blur-[50px] bg-[#000000]/40 px-6 py-10 flex flex-col items-center gap-6">
        <p className="text-white text-[16px] font-[700] text-center">
          로그인이 필요한 서비스입니다.
        </p>
        <p className="text-white-body text-[12px] text-center">
          로그인 후 이용해주세요.
        </p>
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-white text-white text-[14px] font-[700] rounded-[8px]"
          >
            닫기
          </button>
          <button
            onClick={() => navigate('/login')}
            className="flex-1 py-3 bg-white text-black text-[14px] font-[700] rounded-[8px]"
          >
            로그인하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthRequiredModal;
