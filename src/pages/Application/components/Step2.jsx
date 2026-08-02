import { useState } from 'react';
import { uploadPortfolio } from '@/api/application';

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
      '4. 협업 중 겪은 갈등 해결 경험(또는 본인만의 갈등 대처 방식)을 구체적으로 서술해 주세요. (500자 이내)',
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

const MAX_FILE_SIZE = 100 * 1024 * 1024;

function Step2({ formData, onNext, onBack }) {
  const [answers, setAnswers] = useState({
    q1: formData.q1 || '',
    q2: formData.q2 || '',
    q3: formData.q3 || '',
    q4: formData.q4 || '',
  });
  const [fileName, setFileName] = useState(formData.portfolioFileName || '');
  const [portfolioUrl, setPortfolioUrl] = useState(formData.portfolioUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleChange = (id, value, maxLength) => {
    setAnswers((prev) => ({ ...prev, [id]: value.slice(0, maxLength) }));
  };

  const handleFileSelect = async (file) => {
    if (!file) return;
    setUploadError('');
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('파일 크기는 100MB를 초과할 수 없습니다.');
      return;
    }
    try {
      setIsUploading(true);
      const res = await uploadPortfolio(file);
      setPortfolioUrl(res.data.fileUrl);
      setFileName(file.name);
    } catch (error) {
      setUploadError(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '파일 업로드에 실패했습니다.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleNext = () => {
    onNext({ ...answers, portfolioUrl, portfolioFileName: fileName });
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-white text-[16px] lg:text-[24px] font-bold">
        Step2 - 세부 정보
      </p>

      {questions.map((q) =>
        q.isFile ? (
          <div key={q.id} className="flex flex-col gap-2">
            <p className="text-white text-[12px] lg:text-[16px] font-normal">
              {q.label}
            </p>
            <p className="text-white-body text-[11px] lg:text-[12px] leading-[160%]">
              최대 100MB까지 가능하며, 웹 링크(노션, 구글 드라이브, 깃허브 등)로
              제출 시 PDF 문서 혹은 TXT 파일에 URL을 첨부하여 제출해주세요.
            </p>
            <label className="w-full py-3 mt-10 px-4 bg-white-body rounded-[10px] text-black text-[12px] lg:text-[20px] text-center truncate cursor-pointer">
              {isUploading ? '업로드 중...' : fileName || '파일 첨부'}
              <input
                type="file"
                accept=".pdf,.txt"
                disabled={isUploading}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  e.target.value = '';
                  handleFileSelect(file);
                }}
              />
            </label>
            {uploadError && (
              <p className="text-red text-[12px]">{uploadError}</p>
            )}
          </div>
        ) : (
          <div key={q.id} className="flex flex-col gap-6">
            <p className="text-white text-[12px] lg:text-[20px] font-normal">
              {q.label}
            </p>
            <textarea
              value={answers[q.id]}
              onChange={(e) => handleChange(q.id, e.target.value, q.maxLength)}
              placeholder={q.placeholder}
              maxLength={q.maxLength}
              rows={7}
              className="w-full border border-white rounded-[10px] p-6 text-white text-[12px] lg:text-[20px] placeholder:text-white-body outline-none resize-none"
            />
            <p className="text-white-body text-[11px] lg:text-[16px] text-right">
              {answers[q.id].length}/{q.maxLength}
            </p>
          </div>
        )
      )}

      <div className="flex gap-3 mt-20">
        <button
          onClick={onBack}
          className="w-1/2 py-3 border border-white text-white text-[14px] lg:text-[16px] font-bold rounded-lg"
        >
          이전
        </button>
        <button
          onClick={handleNext}
          className="w-1/2 py-3 bg-blue-primary text-white text-[14px] lg:text-[16px] font-bold rounded-lg"
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Step2;
