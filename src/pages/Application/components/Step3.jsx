import { useState } from 'react';
import { submitApplication } from '@/api/application';

const parts = ['기획', '디자인', '프론트엔드', '백엔드'];

function Step3({ formData, onSubmitted, onBack }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setErrorMessage('');
    try {
      setIsSubmitting(true);
      const res = await submitApplication({
        name: formData.name,
        phone: formData.phone,
        studentId: formData.studentId,
        department: formData.department,
        part: formData.partCode,
        selfIntroduction: formData.q1,
        motivation: formData.q2,
        projectExperience: formData.q3,
        conflictExperience: formData.q4,
        portfolioUrl: formData.portfolioUrl || undefined,
      });
      onSubmitted(res.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '지원서 제출에 실패했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-white text-[16px] lg:text-[24px] font-bold">
        Step3 - 확인 및 제출
      </p>

      <div className="flex flex-col gap-4">
        <p className="text-white text-[14px] lg:text-[20px] font-semibold">
          인적사항
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-white-body text-[12px] lg:text-[20px]">이름</p>
          <div className="w-full border border-white/20 rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[20px]">
            {formData.name || '-'}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white-body text-[12px] lg:text-[20px]">학번</p>
          <div className="w-full border border-white/20 rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[20px]">
            {formData.studentId || '-'}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white-body text-[12px] lg:text-[20px]">
            전화번호
          </p>
          <div className="w-full border border-white/20 rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[20px]">
            {formData.phone || '-'}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white-body text-[12px] lg:text-[20px]">
            전공(복수 전공)
          </p>
          <div className="w-full border border-white/20 rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[20px]">
            {formData.department || '-'}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white-body text-[12px] lg:text-[20px]">
            지원 파트
          </p>
          <div className="grid grid-cols-4 gap-2 lg:gap-4">
            {parts.map((part) => (
              <div
                key={part}
                className={`py-2 lg:py-2.5 rounded-[10px] border text-[12px] lg:text-[20px] text-center ${
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
        <p className="text-white text-[14px] lg:text-[20px] font-semibold">
          세부 정보
        </p>

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
            <p className="text-white text-[12px] lg:text-[20px] font-normal">
              {item.label}
            </p>
            <div className="w-full border border-white/20 rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[20px] min-h-25">
              {item.value || '-'}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] lg:text-[20px] font-normal">
            5. 자신의 역량을 잘 나타낼 수 있는 포트폴리오가 있다면 첨부해
            주세요.
          </p>
          <div className="w-full border border-white/20 rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[20px]">
            {formData.portfolioFileName || '-'}
          </div>
        </div>
      </div>

      {errorMessage && (
        <p className="text-red text-[12px] text-center">{errorMessage}</p>
      )}

      <div className="flex gap-3 mt-2">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="w-1/2 py-3 border border-white text-white text-[14px] lg:text-[16px] font-bold rounded-lg disabled:opacity-50"
        >
          수정하기
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-1/2 py-3 bg-blue-primary text-white text-[14px] lg:text-[16px] font-bold rounded-lg disabled:opacity-50"
        >
          {isSubmitting ? '제출 중...' : '제출하기'}
        </button>
      </div>
    </div>
  );
}

export default Step3;
