import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/pages/Application/components/ProgressBar';
import { createCommunityRecruitment } from '@/api/community';
import { partCodes } from '@/constants/community';

function AnimatedDivider({ isVisible }) {
  return (
    <div className="flex justify-center my-8 h-[80px] md:h-[100px] lg:h-[120px]">
      <div
        className={`w-0.5 transition-none ${isVisible ? 'animate-draw-line' : 'h-0'}`}
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.9))',
        }}
      />
    </div>
  );
}

const recruitTypes = [
  {
    id: 'STARTUP',
    title: '창업팀',
    description: '스타트업 공동 창업자 / 팀원',
  },
  {
    id: 'PROJECT',
    title: '프로젝트 팀',
    description: '사이드 프로젝트 함께할 팀원',
  },
  {
    id: 'HACKATHON',
    title: '해커톤 팀',
    description: '해커톤 함께할 팀원',
  },
  {
    id: 'STUDY',
    title: '스터디 팀',
    description: '스터디 함께할 팀원',
  },
];

function RecruitStep1({ selectedType, onSelect }) {
  return (
    <div className="w-full flex flex-col gap-6">
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
                ? 'text-black bg-white'
                : 'text-white border-white/20'
            }`}
          >
            <p className="text-[14px] font-[600]">{type.title}</p>
            <p className="text-[12px]">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

const partOptions = ['기획', '디자인', '프론트엔드', '백엔드'];

function RecruitStep2({ formData, onChange }) {
  return (
    <div className="w-full flex flex-col gap-6">
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

      <div className="flex flex-col gap-2">
        <p className="text-white text-[12px] lg:text-[20px] font-normal">
          프로젝트명/팀명
        </p>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => onChange('title', e.target.value.slice(0, 50))}
          placeholder="팀 또는 프로젝트 이름 (최대 50자)"
          maxLength={50}
          className="w-full border border-white rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[16px] placeholder:text-white-body outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-white text-[12px] lg:text-[20px] font-normal">
          한 줄 소개
        </p>
        <textarea
          value={formData.content || ''}
          onChange={(e) => onChange('content', e.target.value.slice(0, 100))}
          placeholder="연락 방법과 함께 어떤 것을 만드는 팀인지 작성해주세요. (최대 100자)"
          maxLength={100}
          rows={2}
          className="w-full border border-white rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[16px] placeholder:text-white-body outline-none resize-none"
        />
        <p className="text-white-body text-[11px] lg:text-[14px] text-right">
          {(formData.content || '').length}/100
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-white text-[12px] lg:text-[20px] font-normal">
          모집 파트
        </p>
        <div className="grid grid-cols-4 gap-2 lg:gap-4">
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
              className={`py-2 lg:py-2.5 rounded-[10px] border text-[12px] lg:text-[16px] transition-all duration-200 ${
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

      <div className="flex flex-col gap-2">
        <p className="text-white text-[12px] lg:text-[20px] font-normal">
          마감일
        </p>
        <input
          type="date"
          value={formData.deadline || ''}
          onChange={(e) => onChange('deadline', e.target.value)}
          className="w-full border border-white rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[16px] placeholder:text-white-body outline-none"
        />
      </div>
    </div>
  );
}

function RecruitStep3({
  formData,
  onBack,
  onSubmit,
  isSubmitting,
  errorMessage,
}) {
  return (
    <div className="w-full flex flex-col gap-6">
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

      <div className="border border-white/20 rounded-[10px] p-4 flex flex-col gap-3 backdrop-blur-[50px]">
        <div className="flex items-center gap-2 flex-wrap">
          {(formData.parts || []).map((part) => (
            <span
              key={part}
              className="border border-white/50 text-white text-[12px] px-2 py-1 rounded-full"
            >
              {part}
            </span>
          ))}
        </div>

        <p className="text-white text-[14px] font-[600]">
          {formData.title || '-'}
        </p>
        <p className="text-white-body text-[12px] leading-[160%] line-clamp-3">
          {formData.content || '-'}
        </p>

        <hr className="border-white/20" />

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

      {errorMessage && (
        <p className="text-red text-[12px] text-center">{errorMessage}</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="w-1/3 py-3 border border-white text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px] disabled:opacity-50"
        >
          수정하기
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-2/3 py-3 bg-blue-primary text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px] disabled:opacity-50"
        >
          {isSubmitting ? '등록 중...' : '등록하기'}
        </button>
      </div>
    </div>
  );
}

const LINE_ANIMATION_DURATION = 800;

function Community3() {
  const navigate = useNavigate();
  const [, setCurrentStep] = useState(1);
  const [showStep2, setShowStep2] = useState(false);
  const [revealStep2, setRevealStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [revealStep3, setRevealStep3] = useState(false);
  const [formData, setFormData] = useState({
    recruitType: '',
    title: '',
    content: '',
    parts: [],
    deadline: '',
  });
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const step2SectionRef = useRef(null);
  const step3SectionRef = useRef(null);

  const handleFormChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectRecruitType = (type) => {
    handleFormChange('recruitType', type);
    if (!showStep2) {
      setShowStep2(true);
      setCurrentStep(2);
    }
  };

  const handleStep2Next = () => {
    if (!formData.title || !formData.content) return;
    setShowStep3(true);
    setCurrentStep(3);
  };

  useEffect(() => {
    if (!showStep2) return undefined;
    step2SectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    const id = setTimeout(() => setRevealStep2(true), LINE_ANIMATION_DURATION);
    return () => clearTimeout(id);
  }, [showStep2]);

  useEffect(() => {
    if (!showStep3) return undefined;
    step3SectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    const id = setTimeout(() => setRevealStep3(true), LINE_ANIMATION_DURATION);
    return () => clearTimeout(id);
  }, [showStep3]);

  const handleSubmit = async () => {
    setErrorMessage('');
    try {
      setIsSubmitting(true);
      await createCommunityRecruitment({
        type: formData.recruitType,
        title: formData.title,
        content: formData.content,
        parts: formData.parts.map((part) => partCodes[part] ?? part),
        deadline: formData.deadline || undefined,
      });
      setIsComplete(true);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '구인글 등록에 실패했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-5 md:px-15 lg:px-45 py-8 lg:py-20">
      {!isComplete && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-white-body text-[12px] lg:text-[16px] mb-4"
        >
          ← 뒤로가기
        </button>
      )}
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-medium mb-2 lg:mb-4">
        Community
      </p>
      <p className="text-white text-[18px] lg:text-[38px] font-bold mb-8 lg:mb-12">
        Startup Hub
      </p>

      {isComplete ? (
        <div className="w-full lg:max-w-225 mx-auto lg:border lg:border-white/20 lg:rounded-[24px] lg:backdrop-blur-[50px] lg:px-43 lg:py-27.5 flex flex-col items-center gap-6 min-h-100 justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-white text-[16px] lg:text-[20px] font-[700]">
              구인 글이 등록되었습니다.
            </p>
            <p className="text-white-body text-[12px] lg:text-[14px] leading-[160%]">
              팀원 찾는 글이 커뮤니티에 등록되었어요.
              <br />
              좋은 팀원을 만나실 날을 바랍니다!
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => (window.location.href = '/community')}
              className="w-full py-3 bg-blue-primary text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px]"
            >
              목록으로 돌아가기
            </button>
            <button
              onClick={() => {
                setIsComplete(false);
                setShowStep2(false);
                setRevealStep2(false);
                setShowStep3(false);
                setRevealStep3(false);
                setCurrentStep(1);
                setFormData({
                  recruitType: '',
                  title: '',
                  content: '',
                  parts: [],
                  deadline: '',
                });
              }}
              className="w-full py-3 bg-white text-black text-[14px] lg:text-[16px] font-[700] rounded-[8px]"
            >
              다른 구인 글 작성하기
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <p className="text-white text-[16px] lg:text-[24px] font-[700] mb-2">
              팀원 구인
            </p>
            <p className="text-white-body text-[12px] lg:text-[14px]">
              프로젝트, 창업팀, 해커톤, 스터디 팀원을 찾고 있다면 게시글을
              작성하세요.
            </p>
          </div>

          <div className="w-full lg:max-w-225 mx-auto lg:border lg:border-white/20 lg:rounded-[24px] lg:backdrop-blur-[50px] lg:px-43 lg:py-27.5 flex flex-col gap-6">
            <RecruitStep1
              selectedType={formData.recruitType}
              onSelect={handleSelectRecruitType}
            />

            {showStep2 && (
              <div ref={step2SectionRef}>
                <AnimatedDivider isVisible={showStep2} />
                {revealStep2 && (
                  <div className="animate-fade-up">
                    <RecruitStep2
                      formData={formData}
                      onChange={handleFormChange}
                    />
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
              </div>
            )}

            {showStep3 && (
              <div ref={step3SectionRef}>
                <AnimatedDivider isVisible={showStep3} />
                {revealStep3 && (
                  <div className="animate-fade-up">
                    <RecruitStep3
                      formData={formData}
                      onBack={() => {
                        setShowStep3(false);
                        setRevealStep3(false);
                        setCurrentStep(2);
                      }}
                      onSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      errorMessage={errorMessage}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Community3;
