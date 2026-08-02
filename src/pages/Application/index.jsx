import { useEffect, useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import ProgressBar from './components/ProgressBar';
import { getRecruitInfo } from '@/api/application';

function Application() {
  const [step, setStep] = useState(1);
  const [recruitInfo, setRecruitInfo] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    studentId: '',
    department: '',
    part: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    portfolioUrl: '',
    portfolioFileName: '',
  });

  useEffect(() => {
    getRecruitInfo()
      .then((res) => setRecruitInfo(res.data))
      .catch(() => setRecruitInfo(null));
  }, []);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            formData={formData}
            onNext={(data) => {
              updateFormData(data);
              setStep(2);
            }}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            onNext={(data) => {
              updateFormData(data);
              setStep(3);
            }}
            onBack={() => setStep(1)}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            onSubmitted={(result) => {
              setSubmitResult(result);
              setStep(4);
            }}
            onBack={() => setStep(2)}
          />
        );
      case 4:
        return <Step4 submitResult={submitResult} />;
      default:
        return null;
    }
  };

  return (
    <div className="px-5 md:px-15 lg:px-45 py-8 lg:py-20">
      <div className={step === 4 ? 'hidden lg:block' : ''}>
        <p className="text-white text-[18px] md:text-[24px] lg:text-[28px] font-bold mb-3 lg:mb-4">
          지원서 작성
        </p>
        <p className="text-white-body text-[12px] md:text-[14px] lg:text-[20px] leading-[160%] mb-4 lg:mb-6">
          아이디어를 실현으로 만드는 곳, UNIS에 관심 가져주셔서 감사합니다.{' '}
          <br />
          아래 지원서를 작성하여 제출해주시면 검토 후 결과를 안내드리겠습니다.
        </p>
        <div className="flex flex-col gap-2 mb-8 lg:mb-20">
          <p className="text-white text-[12px] md:text-[14px] lg:text-[20px]">
            지원서 작성 전 확인해주세요.
          </p>
          <ul className="flex flex-col gap-1 text-white-body text-[12px] md:text-[12px] lg:text-[20px] leading-[160%] list-disc pl-4">
            <li>
              제출 후에는 내용 수정이 불가합니다. 작성 내용을 꼼꼼히 확인 후
              제출해주세요.
            </li>
            <li>
              포트폴리오는 최대 100MB까지 업로드 가능하며, 웹 링크(노션, 구글
              드라이브, 깃허브 등)로 제출 시 PDF 문서 혹은 TXT 파일에 URL을
              첨부하여 제출해주세요.
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full lg:max-w-[906px] mx-auto lg:border lg:border-white/20 lg:rounded-[24px] lg:backdrop-blur-[50px] lg:px-43 lg:py-27.5 flex flex-col gap-6 lg:gap-12.5">
        {step < 4 && <ProgressBar currentStep={step} />}
        {recruitInfo && step === 1 && (
          <div className="border border-white/20 rounded-[10px] px-4 py-3 flex flex-col gap-1">
            <p className="text-white text-[12px] lg:text-[16px] font-semibold">
              {recruitInfo.generation}기 모집{' '}
              {recruitInfo.status === 'OPEN'
                ? '중'
                : recruitInfo.status === 'PREPARING'
                  ? '준비 중'
                  : '마감'}{' '}
              · 정원{' '}
              {recruitInfo.capacity}명
            </p>
            <p className="text-white-body text-[11px] lg:text-[12px]">
              모집 기간: {recruitInfo.schedule} · 지원 마감:{' '}
              {recruitInfo.endDate}
            </p>
          </div>
        )}
        {renderStep()}
      </div>
    </div>
  );
}

export default Application;
