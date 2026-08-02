import { useNavigate } from 'react-router-dom';

function formatAnnounceDate(iso) {
  if (!iso) return null;
  const date = new Date(iso);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}. ${date.getHours()}시`;
}

function Step4({ submitResult }) {
  const navigate = useNavigate();
  const announceDate = formatAnnounceDate(submitResult?.resultAnnounceAt);

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-100">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-white text-[18px] md:text-[20px] lg:text-[28px] font-bold">
          지원서가 등록되었습니다.
        </p>
        <p className="text-white-body text-[12px] md:text-[14px] lg:text-[20px] leading-[160%]">
          {announceDate && `서류 결과는 ${announceDate}에 이메일로 발송됩니다.`}
          <br />
          지원해 주셔서 감사합니다.
        </p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="w-full max-w-75 py-3 bg-blue-primary text-white text-[14px] lg:text-[16px] font-bold rounded-lg"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default Step4;
