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
    <div className="flex flex-col items-center lg:gap-20">
      <div className="hidden lg:block shrink-0">
        <p className="text-white text-[24px] font-[700] mb-4">지원서 작성</p>
        <p className="text-white-body text-[14px] leading-[160%] mb-6">
          아이디어를 실전으로 만드는 곳, UNIS에 관심 가져주셔서 감사합니다. 아래
          지원서를 작성하여 제출해주시면 검토 후 결과를 안내드리겠습니다.
        </p>
        <p className="text-white text-[14px] font-[600] mb-2">
          지원서 작성 전 확인해주세요.
        </p>
        <ul className="flex flex-col gap-2 text-white-body text-[12px] leading-[160%] list-disc pl-4">
          <li>
            제출 후에는 내용 수정이 불가합니다. 작성 내용을 꼼꼼히 확인 후
            제출해주세요.
          </li>
          <li>
            포트폴리오는 최대 100MB까지 업로드 가능하며, 링크(노션, 구글
            드라이브, 깃허브 등)로 제출 시 PDF 문서 혹은 TXT 파일에 URL을
            첨부하여 파일로 제출해주세요.
          </li>
        </ul>
      </div>

      <div className="w-full lg:w-3/5 lg:border lg:border-white/20 lg:rounded-[20px] lg:backdrop-blur-[50px] lg:p-10 flex flex-col items-center justify-center gap-6 min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-white text-[18px] md:text-[20px] lg:text-[24px] font-[700]">
            지원서가 등록되었습니다.
          </p>
          <p className="text-white-body text-[12px] md:text-[14px] leading-[160%]">
            {announceDate && `서류 결과는 ${announceDate}에 이메일로 발송됩니다.`}
            <br />
            지원해 주셔서 감사합니다.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full max-w-[300px] py-3 bg-blue-primary text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px]"
        >
          완료하기
        </button>
      </div>
    </div>
  );
}

export default Step4;
