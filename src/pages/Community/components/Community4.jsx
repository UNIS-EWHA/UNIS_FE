import { useState, useRef } from 'react';
import ProgressBar from '@/pages/Application/components/ProgressBar';

// 수직선 애니메이션 컴포넌트
function AnimatedDivider({ isVisible }) {
  return (
    <div className="flex justify-center my-8 h-[80px] md:h-[100px] lg:h-[120px]">
      <div
        className={`w-[1px] transition-none ${isVisible ? 'animate-draw-line' : 'h-0'}`}
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0))',
        }}
      />
    </div>
  );
}

// Step1 - 모집 유형 선택
const recruitTypes = [
  {
    id: 'STARTUP',
    title: '창업팀',
    description: '스타트업 공동 창업자 / 팀원',
  },
  {
    id: 'PROJECT',
    title: '창업팀',
    description: '스타트업 공동 창업자 / 팀원',
  },
  { id: 'STUDY', title: '창업팀', description: '스타트업 공동 창업자 / 팀원' },
  {
    id: 'CONTEST',
    title: '창업팀',
    description: '스타트업 공동 창업자 / 팀원',
  },
];

function RecruitStep1({ selectedType, onSelect }) {
  return (
    <div className="w-full lg:border lg:border-white/20 lg:rounded-[20px] lg:backdrop-blur-[50px] lg:p-10 flex flex-col gap-6">
      <ProgressBar
        currentStep={1}
        steps={['모집 유형', '상세 정보', '확인 및 제출']}
      />

      <div>
        <p className="text-white text-[14px] lg:text-[16px] font-[600]">
          Step1 - 모집 유형 선택
        </p>
        <p className="text-white-body text-[12px] lg:text-[14px]">
          어떤 팀원을 구하고 있나요?
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {recruitTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`w-full flex flex-col items-start px-4 py-3 rounded-[10px] border transition-all duration-200 ${
              selectedType === type.id
                ? 'border-blue-primary bg-blue-primary/10'
                : 'border-white/20 bg-white/5'
            }`}
          >
            <p className="text-white text-[14px] font-[600]">{type.title}</p>
            <p className="text-white-body text-[12px]">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// Step2 - 상세 정보 입력
const partOptions = ['기획', '디자인', '개발'];

function RecruitStep2({ formData, onChange }) {
  return (
    <div className="w-full lg:border lg:border-white/20 lg:rounded-[20px] lg:backdrop-blur-[50px] lg:p-10 flex flex-col gap-6">
      <ProgressBar
        currentStep={2}
        steps={['모집 유형', '상세 정보', '확인 및 제출']}
      />

      <div>
        <p className="text-white text-[14px] lg:text-[16px] font-[600]">
          Step2 - 상세 정보 입력
        </p>
        <p className="text-white-body text-[12px] lg:text-[14px]">
          어떤 팀인지 구체적으로 알려주세요.
        </p>
      </div>

      {/* 제목 */}
      <div className="flex flex-col gap-2">
        <p className="text-white text-[12px] lg:text-[14px] font-[500]">제목</p>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="제목을 입력해주세요."
          className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
        />
      </div>

      {/* 내용 */}
      <div className="flex flex-col gap-2">
        <p className="text-white text-[12px] lg:text-[14px] font-[500]">내용</p>
        <textarea
          value={formData.content || ''}
          onChange={(e) => onChange('content', e.target.value)}
          placeholder="팀에 대해 자세히 설명해주세요."
          rows={5}
          className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none resize-none"
        />
      </div>

      {/* 모집 파트 */}
      <div className="flex flex-col gap-2">
        <p className="text-white text-[12px] lg:text-[14px] font-[500]">
          모집 파트
        </p>
        <div className="flex gap-2">
          {partOptions.map((part) => (
            <button
              key={part}
              onClick={() => {
                const current = formData.parts || [];
                const updated = current.includes(part)
                  ? current.filter((p) => p !== part)
                  : [...current, part];
                onChange('parts', updated);
              }}
              className={`px-4 py-2 rounded-[8px] border text-[12px] lg:text-[14px] transition-all duration-200 ${
                (formData.parts || []).includes(part)
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white border-white/50'
              }`}
            >
              {part}
            </button>
          ))}
        </div>
      </div>

      {/* 마감일 */}
      <div className="flex flex-col gap-2">
        <p className="text-white text-[12px] lg:text-[14px] font-[500]">
          마감일
        </p>
        <input
          type="date"
          value={formData.deadline || ''}
          onChange={(e) => onChange('deadline', e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] outline-none"
        />
      </div>

      {/* 외부 링크 */}
      <div className="flex flex-col gap-2">
        <p className="text-white text-[12px] lg:text-[14px] font-[500]">
          외부 링크 (선택)
        </p>
        <input
          type="text"
          value={formData.externalUrl || ''}
          onChange={(e) => onChange('externalUrl', e.target.value)}
          placeholder="https://..."
          className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
        />
      </div>
    </div>
  );
}

// Step3 - 확인 및 제출
function RecruitStep3({ formData, onBack, onSubmit }) {
  return (
    <div className="w-full lg:border lg:border-white/20 lg:rounded-[20px] lg:backdrop-blur-[50px] lg:p-10 flex flex-col gap-6">
      <ProgressBar
        currentStep={3}
        steps={['모집 유형', '상세 정보', '확인 및 제출']}
      />

      <div>
        <p className="text-white text-[14px] lg:text-[16px] font-[600]">
          Step3 - 확인 및 제출
        </p>
        <p className="text-white-body text-[12px] lg:text-[14px]">
          내용 확인 후 제출을 눌러주세요.
        </p>
      </div>

      {/* 미리보기 카드 */}
      <div className="border border-white/20 rounded-[10px] p-4 flex flex-col gap-3 backdrop-blur-[50px]">
        {/* 파트 태그 */}
        <div className="flex items-center gap-2 flex-wrap">
          {(formData.parts || []).map((part) => (
            <span
              key={part}
              className="border border-white/50 text-white text-[12px] px-2 py-1 rounded-full"
            >
              {part}
            </span>
          ))}
          {formData.recruitType && (
            <span className="border border-white/50 text-white text-[12px] px-2 py-1 rounded-full">
              모집 중
            </span>
          )}
        </div>

        <p className="text-white text-[14px] font-[600]">
          {formData.title || '-'}
        </p>
        <p className="text-white-body text-[12px] leading-[160%] line-clamp-3">
          {formData.content || '-'}
        </p>

        <hr className="border-white/20" />

        <div className="flex items-center justify-between">
          <p className="text-white-body text-[12px]">작성자: 학회원</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white-body text-[12px]">2025.04.25</p>
          <p className="text-white-body text-[12px]">
            마감{' '}
            {formData.deadline
              ? formData.deadline.replaceAll('-', '.')
              : '미정'}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="w-1/3 py-3 border border-white text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px]"
        >
          수정하기
        </button>
        <button
          onClick={onSubmit}
          className="w-2/3 py-3 bg-blue-primary text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px]"
        >
          다음 →
        </button>
      </div>
    </div>
  );
}

// 메인 Community4
function Community4() {
  const [, setCurrentStep] = useState(1);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [formData, setFormData] = useState({
    recruitType: '',
    title: '',
    content: '',
    parts: [],
    deadline: '',
    externalUrl: '',
  });

  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  const handleFormChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleStep1Next = () => {
    if (!formData.recruitType) return;
    setShowStep2(true);
    setCurrentStep(2);
    setTimeout(() => {
      step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleStep2Next = () => {
    if (!formData.title || !formData.content) return;
    setShowStep3(true);
    setCurrentStep(3);
    setTimeout(() => {
      step3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSubmit = () => {
    // TODO: API 연결
    console.log('제출:', formData);
  };

  return (
    <div className="flex flex-col">
      {/* 상단 안내 */}
      <div className="mb-8">
        <p className="text-white text-[16px] lg:text-[24px] font-[700] mb-2">
          팀원 구인
        </p>
        <p className="text-white-body text-[12px] lg:text-[14px]">
          프로젝트, 창업팀, 해커톤, 스터디 팀원을 찾고 있다면 지금 바로 글을
          작성하세요.
        </p>
      </div>

      {/* Step1 */}
      <RecruitStep1
        selectedType={formData.recruitType}
        onSelect={(type) => handleFormChange('recruitType', type)}
      />

      {/* Step1 → Step2 버튼 */}
      {!showStep2 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleStep1Next}
            disabled={!formData.recruitType}
            className="px-8 py-2 bg-blue-primary text-white text-[14px] font-[700] rounded-[8px] disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}

      {/* 수직선 애니메이션 - Step1 → Step2 */}
      {showStep2 && <AnimatedDivider isVisible={showStep2} />}

      {/* Step2 */}
      {showStep2 && (
        <div ref={step2Ref}>
          <RecruitStep2 formData={formData} onChange={handleFormChange} />

          {/* Step2 → Step3 버튼 */}
          {!showStep3 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleStep2Next}
                disabled={!formData.title || !formData.content}
                className="px-8 py-2 bg-blue-primary text-white text-[14px] font-[700] rounded-[8px] disabled:opacity-50"
              >
                다음
              </button>
            </div>
          )}
        </div>
      )}

      {/* 수직선 애니메이션 - Step2 → Step3 */}
      {showStep3 && <AnimatedDivider isVisible={showStep3} />}

      {/* Step3 */}
      {showStep3 && (
        <div ref={step3Ref}>
          <RecruitStep3
            formData={formData}
            onBack={() => {
              setShowStep3(false);
              setCurrentStep(2);
            }}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}

export default Community4;
