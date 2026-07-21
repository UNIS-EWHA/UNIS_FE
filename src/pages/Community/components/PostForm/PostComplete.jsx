// pages/Community/components/PostForm/PostComplete.jsx
import { useNavigate } from 'react-router-dom';

function PostComplete() {
  const navigate = useNavigate();

  return (
    <div className="flex mt-8 lg:mt-16 justify-center px-5">
      <div className="w-full lg:max-w-[600px]">
        <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] mb-2">
          Community
        </p>
        <p className="text-white text-[18px] lg:text-[38px] font-[700] mb-8 lg:mb-12">
          창업 정보 게시판
        </p>

        <div className="w-full lg:border lg:border-white/20 lg:rounded-[20px] lg:backdrop-blur-[50px] lg:bg-[#000000]/20 px-6 py-16 lg:px-10 lg:py-20 flex flex-col items-center gap-8">
          <p className="text-white text-[16px] lg:text-[20px] font-[700]">
            창업 정보가 등록되었습니다.
          </p>
          <button
            onClick={() => navigate('/community')}
            className="w-full max-w-[200px] py-3 bg-blue-primary text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px]"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostComplete;
