import { useState } from 'react';
import { checkStudentId } from '@/api/application';

const parts = ['기획', '디자인', '프론트엔드', '백엔드'];
const partCodes = {
  기획: 'PLANNING',
  디자인: 'DESIGN',
  프론트엔드: 'FRONTEND',
  백엔드: 'BACKEND',
};

function Step1({ formData, onNext }) {
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
          : '이미 지원한 학번입니다.'
      );
    } catch (error) {
      setIsStudentIdAvailable(false);
      setStudentIdMessage(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '중복 확인에 실패했습니다.'
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
    <div className="flex flex-col gap-6.5">
      <div>
        <p className="text-white text-[16px] lg:text-[24px] font-medium">
          Step1 - 인적사항
        </p>
        <p className="text-white-body text-[12px] lg:text-[24px] font-medium mt-1">
          기본 정보를 입력해주세요.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-white text-[12px] lg:text-[20px] font-normal">
          이름
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요."
          className="w-full border border-white rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[16px] placeholder:text-white-body outline-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-white text-[12px] lg:text-[20px] font-normal">
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
            placeholder="학번을 입력해주세요"
            className="flex-1 border border-white rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[16px] placeholder:text-white-body outline-none"
          />
          <button
            onClick={handleCheckStudentId}
            disabled={isCheckingStudentId}
            className="shrink-0 whitespace-nowrap bg-white text-black text-[12px] lg:text-[14px] font-semibold px-4 py-2 lg:py-3 rounded-[10px] disabled:opacity-50"
          >
            {isCheckingStudentId ? '확인 중...' : '중복 확인'}
          </button>
        </div>
        {studentIdMessage && (
          <p className="text-blue-primary text-[12px] lg:text-[14px]">
            {studentIdMessage}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-white text-[12px] lg:text-[20px] font-normal">
          전화번호
        </p>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호를 입력해주세요."
          className="w-full border border-white rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[16px] placeholder:text-white-body outline-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-white text-[12px] lg:text-[20px] font-normal">
          전공(복수 전공)
        </p>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="현재 전공 및 복수 전공 중인 학과 이름을 입력해주세요."
          className="w-full border border-white rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[16px] placeholder:text-white-body outline-none"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-white text-[12px] lg:text-[20px] font-normal">
          지원 파트
        </p>
        <div className="grid grid-cols-4 gap-2 lg:gap-4">
          {parts.map((part) => (
            <button
              key={part}
              onClick={() => setSelectedPart(part)}
              className={`py-2 lg:py-2.5 rounded-[10px] border text-[12px] lg:text-[16px] transition-all duration-200 ${
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
        <p className="text-red text-[12px] lg:text-[14px] text-center">
          {errorMessage}
        </p>
      )}

      <button
        onClick={handleNext}
        className="w-full py-2 bg-blue-primary text-white text-[14px] lg:text-[20px] font-bold rounded-lg mt-2"
      >
        다음
      </button>
    </div>
  );
}

export default Step1;
