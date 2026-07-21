import { useState } from 'react';

const parts = ['기획', '디자인', '프론트엔드', '백엔드'];

function ProgressBar({ currentStep }) {
  const steps = ['인적사항', '세부 정보', '확인 및 제출'];

  return (
    <div className="flex items-center justify-center gap-4 mb-8 lg:mb-12">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;

        return (
          <div key={label} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-[700] border-2 ${
                  isActive || isDone
                    ? 'bg-blue-primary border-blue-primary text-white'
                    : 'bg-transparent border-white/30 text-white/30'
                }`}
              >
                {stepNum}
              </div>
              <p
                className={`text-[10px] lg:text-[12px] ${isActive ? 'text-white' : 'text-white/30'}`}
              >
                {label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="w-8 lg:w-16 h-[1px] bg-white/20 mb-4" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Step1({ formData, onNext }) {
  const [name, setName] = useState(formData.name || '');
  const [studentId, setStudentId] = useState(formData.studentId || '');
  const [email, setEmail] = useState(formData.email || '');
  const [major, setMajor] = useState(formData.major || '');
  const [selectedPart, setSelectedPart] = useState(formData.part || '');

  const handleNext = () => {
    onNext({ name, studentId, email, major, part: selectedPart });
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-20">
      <div className="hidden lg:block lg:w-2/5 shrink-0">
        <p className="text-white text-[24px] font-[700] mb-4">지원서 작성</p>
        <p className="text-white-body text-[14px] leading-[160%] mb-6">
          아이디어를 실전으로 만드는 곳, UNIS에 관심 가져주셔서 감사합니다. 아래
          지원서를 작성하여 제출해주시면 검토 후 결과를 안내드리겠습니다.
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-white text-[14px] font-[600] mb-2">
            지원서 작성 전 확인해주세요.
          </p>
          <ul className="flex flex-col gap-2 text-white-body text-[12px] leading-[160%] list-disc pl-4">
            <li>
              제출 후에는 내용 수정이 불가합니다. 작성 내용을 꼼꼼히 확인 후
              제출해주세요.
            </li>
            <li>
              포트폴리오는 최대 100MB까지 업로드 가능하며, 붙 링크(노션, 구글
              드라이브, 깃허브 등)로 제출 시 PDF 문서 혹은 TXT 파일에 URL을
              첨부하여 파일로 제출해주세요.
            </li>
          </ul>
        </div>
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
          <p className="text-white text-[12px] font-[600] mb-2">
            지원서 작성 전 확인해주세요.
          </p>
          <ul className="flex flex-col gap-1 text-white-body text-[11px] leading-[160%] list-disc pl-4 mb-6">
            <li>
              제출 후에는 내용 수정이 불가합니다. 작성 내용을 꼼꼼히 확인 후
              제출해주세요.
            </li>
            <li>
              포트폴리오는 최대 100MB까지 업로드 가능하며, 붙 링크(노션, 구글
              드라이브, 깃허브 등)로 제출 시 PDF 문서 혹은 TXT 파일에 URL을
              첨부하여 파일로 제출해주세요.
            </li>
          </ul>
        </div>

        <ProgressBar currentStep={1} />

        <p className="hidden lg:block text-white text-[16px] font-[600] mb-2">
          Step1. 인적사항
          <br />
          <span className="text-white-body text-[14px] font-[400]">
            기본 정보를 입력해주세요.
          </span>
        </p>

        <p className="lg:hidden text-white text-[16px] font-[600]">인적사항</p>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] lg:text-[14px] font-[500]">
            이름
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] lg:text-[14px] font-[500]">
            학번
          </p>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="학번을 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] lg:text-[14px] font-[500]">
            이메일
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] lg:text-[14px] font-[500]">
            전공(복수 전공)
          </p>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="현재 전공 또는 복수 전공 중인 학과 이름을 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] lg:text-[14px] font-[500]">
            지원 파트
          </p>
          <div className="grid grid-cols-4 gap-2">
            {parts.map((part) => (
              <button
                key={part}
                onClick={() => setSelectedPart(part)}
                className={`py-2 rounded-[8px] border text-[12px] lg:text-[14px] transition-all duration-200 ${
                  selectedPart === part
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white/50'
                }`}
              >
                {part}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="w-full py-3 bg-blue-primary text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px] mt-2"
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Step1;
