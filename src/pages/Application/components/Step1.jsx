import { useState } from 'react';
import { checkStudentId } from '@/api/application';

const parts = ['기획', '디자인', '프론트엔드', '백엔드'];
const partCodes = {
  기획: 'PLANNING',
  디자인: 'DESIGN',
  프론트엔드: 'FRONTEND',
  백엔드: 'BACKEND',
};

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

function Step1({ formData, recruitInfo, onNext }) {
  const [name, setName] = useState(formData.name || '');
  const [phone, setPhone] = useState(formData.phone || '');
  const [studentId, setStudentId] = useState(formData.studentId || '');
  const [department, setDepartment] = useState(formData.department || '');
  const [selectedPart, setSelectedPart] = useState(formData.part || '');
  const [isStudentIdAvailable, setIsStudentIdAvailable] = useState(false);
  const [isCheckingStudentId, setIsCheckingStudentId] = useState(false);
  const [studentIdMessage, setStudentIdMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckStudentId = async () => {
    if (!studentId) {
      setStudentIdMessage('학번을 입력해주세요.');
      return;
    }
    setStudentIdMessage('');
    try {
      setIsCheckingStudentId(true);
      const res = await checkStudentId(studentId);
      setIsStudentIdAvailable(res.data.available);
      setStudentIdMessage(
        res.data.available
          ? '지원 가능한 학번입니다.'
          : '이미 지원한 학번입니다.',
      );
    } catch (error) {
      setIsStudentIdAvailable(false);
      setStudentIdMessage(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '중복 확인에 실패했습니다.',
      );
    } finally {
      setIsCheckingStudentId(false);
    }
  };

  const handleNext = () => {
    setErrorMessage('');

    if (!name || !phone || !studentId || !department || !selectedPart) {
      setErrorMessage('필수 항목을 모두 입력해주세요.');
      return;
    }
    if (!isStudentIdAvailable) {
      setErrorMessage('학번 중복 확인을 완료해주세요.');
      return;
    }

    onNext({
      name,
      phone,
      studentId,
      department,
      part: selectedPart,
      partCode: partCodes[selectedPart],
    });
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

        {recruitInfo && (
          <div className="border border-white/20 rounded-[8px] px-4 py-3 flex flex-col gap-1">
            <p className="text-white text-[12px] lg:text-[14px] font-[600]">
              {recruitInfo.generation}기 모집{' '}
              {recruitInfo.status === 'OPEN' ? '중' : '마감'} · 정원{' '}
              {recruitInfo.capacity}명
            </p>
            <p className="text-white-body text-[11px] lg:text-[12px]">
              전형 일정: {recruitInfo.schedule} · 지원 마감:{' '}
              {recruitInfo.endDate}
            </p>
          </div>
        )}

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
          <div className="flex gap-2">
            <input
              type="text"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setIsStudentIdAvailable(false);
              }}
              placeholder="학번을 입력해주세요."
              className="flex-1 bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
            />
            <button
              onClick={handleCheckStudentId}
              disabled={isCheckingStudentId}
              className="shrink-0 bg-white text-black text-[12px] px-3 py-2 rounded-[8px] disabled:opacity-50"
            >
              {isCheckingStudentId ? '확인 중...' : '중복 확인'}
            </button>
          </div>
          {studentIdMessage && (
            <p className="text-[12px] text-blue-primary">{studentIdMessage}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] lg:text-[14px] font-[500]">
            전화번호
          </p>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="전화번호를 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] lg:text-[14px] font-[500]">
            전공(복수 전공)
          </p>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
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

        {errorMessage && (
          <p className="text-red-500 text-[12px] text-center">{errorMessage}</p>
        )}

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
