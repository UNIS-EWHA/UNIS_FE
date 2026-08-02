import { useNavigate } from 'react-router-dom';

function PostComplete() {
  const navigate = useNavigate();

  return (
    <div className="px-5 md:px-15 lg:px-45 py-8 lg:py-20">
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-medium mb-2 lg:mb-4">
        Community
      </p>
      <p className="text-white text-[18px] lg:text-[38px] font-bold mb-8 lg:mb-12">
        창업 정보 게시판
      </p>

      <div className="w-full lg:max-w-225 mx-auto lg:border lg:border-white/20 lg:rounded-[24px] lg:backdrop-blur-[50px] lg:px-43 lg:py-27.5 flex flex-col items-center justify-center gap-6 min-h-100">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-white text-[18px] md:text-[20px] lg:text-[28px] font-bold">
            창업 정보가 등록되었습니다.
          </p>
          <p className="text-white-body text-[12px] md:text-[14px] lg:text-[20px] leading-[160%]">
            소중한 정보를 나눠주셔서 감사합니다.
          </p>
        </div>

        <button
          onClick={() => navigate('/community')}
          className="w-full max-w-75 py-3 bg-blue-primary text-white text-[14px] lg:text-[16px] font-bold rounded-lg"
        >
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default PostComplete;
