import ProgressBar from './ProgressBar';

const parts = ['기획', '디자인', '프론트엔드', '백엔드'];

function Step3({ formData, onNext, onBack }) {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-20">
      <div className="hidden lg:block lg:w-2/5 shrink-0">
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
      <div className="w-full lg:w-3/5 lg:border lg:border-white/20 lg:rounded-[20px] lg:backdrop-blur-[50px] lg:p-10 flex flex-col gap-6">
        <div className="lg:hidden">
          <p className="text-white text-[18px] md:text-[24px] font-[700] mb-3">
            지원서 작성
          </p>
          <p className="text-white-body text-[12px] md:text-[14px] leading-[160%] mb-4">
            아이디어를 실전으로 만드는 곳, UNIS에 관심 가져주셔서 감사합니다.
            아래 지원서를 작성하여 제출해주시면 검토 후 결과를 안내드리겠습니다.
          </p>
        </div>
        <ProgressBar currentStep={3} />

        <div className="flex flex-col gap-4">
          <p className="text-white text-[16px] font-[600]">인적사항</p>

          <div className="flex flex-col gap-2">
            <p className="text-white-body text-[12px] lg:text-[14px]">이름</p>
            <div className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px]">
              {formData.name || '-'}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-white-body text-[12px] lg:text-[14px]">학번</p>
            <div className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px]">
              {formData.studentId || '-'}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-white-body text-[12px] lg:text-[14px]">이메일</p>
            <div className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px]">
              {formData.email || '-'}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-white-body text-[12px] lg:text-[14px]">
              전공(복수 전공)
            </p>
            <div className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px]">
              {formData.major || '-'}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-white-body text-[12px] lg:text-[14px]">
              지원 파트
            </p>
            <div className="grid grid-cols-4 gap-2">
              {parts.map((part) => (
                <div
                  key={part}
                  className={`py-2 rounded-[8px] border text-[12px] lg:text-[14px] text-center ${
                    formData.part === part
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-white/30 border-white/20'
                  }`}
                >
                  {part}
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-white/20" />

        <div className="flex flex-col gap-4">
          <p className="text-white text-[16px] font-[600]">세부 정보</p>

          {[
            {
              label: '1. 간단한 자기소개를 부탁드립니다. (300자 이내)',
              value: formData.q1,
            },
            {
              label: '2. UNIS 8기에 지원한 동기를 적어주세요. (500자 이내)',
              value: formData.q2,
            },
            {
              label:
                '3. 가장 기억에 남는 프로젝트와 본인의 역할, 그리고 이를 통해 배운 점을 설명해 주세요. (500자 이내)',
              value: formData.q3,
            },
            {
              label:
                '4. 협업 중 의견 충돌 혹은 갈등이라는 본인만의 갈등 대처 방식을 구체적으로 사례와 구체적인 사례에서 사용하는 방식을 설명해주세요. (500자 이내)',
              value: formData.q4,
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-white text-[12px] lg:text-[14px] font-[500]">
                {item.label}
              </p>
              <div className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] min-h-[100px]">
                {item.value || '-'}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <p className="text-white text-[12px] lg:text-[14px] font-[500]">
              5. 자신의 역량을 잘 나타낼 수 있는 포트폴리오가 있다면 첨부해
              주세요.
            </p>
            <div className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px]">
              {formData.portfolio ? formData.portfolio.name : '-'}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={onBack}
            className="w-1/2 py-3 border border-white text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px]"
          >
            수정하기
          </button>
          <button
            onClick={onNext}
            className="w-1/2 py-3 bg-blue-primary text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px]"
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step3;
