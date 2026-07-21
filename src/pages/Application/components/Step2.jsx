import { useState } from 'react';
import ProgressBar from './ProgressBar';

const questions = [
  {
    id: 'q1',
    label: '1. 간단한 자기소개를 부탁드립니다. (300자 이내)',
    placeholder: '답변을 입력해주세요.',
    maxLength: 300,
  },
  {
    id: 'q2',
    label: '2. UNIS 8기에 지원한 동기를 적어주세요. (500자 이내)',
    placeholder: '답변을 입력해주세요.',
    maxLength: 500,
  },
  {
    id: 'q3',
    label:
      '3. 가장 기억에 남는 프로젝트와 본인의 역할, 그리고 이를 통해 배운 점을 설명해 주세요. (500자 이내)',
    placeholder: '답변을 입력해주세요.',
    maxLength: 500,
  },
  {
    id: 'q4',
    label:
      '4. 협업 중 의견 충돌 혹은 갈등이라는 본인만의 갈등 대처 방식을 구체적으로 사례와 구체적인 사례에서 사용하는 방식을 설명해주세요. (500자 이내)',
    placeholder: '답변을 입력해주세요.',
    maxLength: 500,
  },
  {
    id: 'q5',
    label:
      '5. 자신의 역량을 잘 나타낼 수 있는 포트폴리오가 있다면 첨부해 주세요.',
    placeholder: null,
    isFile: true,
  },
];

function Step2({ formData, onNext, onBack }) {
  const [answers, setAnswers] = useState({
    q1: formData.q1 || '',
    q2: formData.q2 || '',
    q3: formData.q3 || '',
    q4: formData.q4 || '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    onNext({ ...answers, portfolio: file });
  };

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
            포트폴리오는 최대 100MB까지 업로드 가능하며, 붙 링크(노션, 구글
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

        <ProgressBar currentStep={2} />

        <p className="hidden lg:block text-white text-[16px] font-[600] mb-2">
          Step2 - 세부 정보
        </p>

        <p className="lg:hidden text-white text-[16px] font-[600]">세부 정보</p>

        {questions.map((q) =>
          q.isFile ? (
            <div key={q.id} className="flex flex-col gap-2">
              <p className="text-white text-[12px] lg:text-[14px] font-[500]">
                {q.label}
              </p>
              <p className="text-white-body text-[11px] leading-[160%]">
                최대 100MB까지 가능하며, 붙 링크(노션, 구글 드라이브, 깃허브
                등)로 제출 시 PDF 문서 혹은 TXT 파일에 URL을 첨부하여 파일로
                제출해주세요.
              </p>
              <label className="w-full py-3 border border-white/20 rounded-[8px] text-white text-[12px] lg:text-[14px] text-center cursor-pointer bg-white/10">
                파일 첨부
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              {file && (
                <p className="text-white-body text-[12px]">{file.name}</p>
              )}
            </div>
          ) : (
            <div key={q.id} className="flex flex-col gap-2">
              <p className="text-white text-[12px] lg:text-[14px] font-[500]">
                {q.label}
              </p>
              <textarea
                value={answers[q.id]}
                onChange={(e) => handleChange(q.id, e.target.value)}
                placeholder={q.placeholder}
                maxLength={q.maxLength}
                rows={5}
                className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none resize-none"
              />
              <p className="text-white-body text-[11px] text-right">
                {answers[q.id].length}/{q.maxLength}
              </p>
            </div>
          )
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

export default Step2;
