import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCommunityPost } from '@/api/community';

const categoryOptions = [
  { label: '지원사업', value: 'SUPPORT' },
  { label: '공모전', value: 'CONTEST' },
  { label: '해커톤', value: 'HACKATHON' },
  { label: '교내 프로그램', value: 'CAMPUS' },
];

function PostForm() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    organizer: '',
    startDate: '',
    endDate: '',
    deadline: '',
    externalUrl: '',
    imageUrl: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setErrorMessage('');

    if (!category) return setErrorMessage('카테고리를 선택해주세요.');
    if (!formData.title || !formData.content)
      return setErrorMessage('제목과 본문을 입력해주세요.');

    try {
      setIsSubmitting(true);
      await createCommunityPost({
        category,
        title: formData.title,
        content: formData.content,
        organizer: formData.organizer || undefined,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        deadline: formData.deadline || undefined,
        externalUrl: formData.externalUrl || undefined,
        imageUrl: formData.imageUrl || undefined,
      });
      navigate('/community/complete');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '게시글 등록에 실패했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full border border-white rounded-[10px] px-4 py-3 text-white text-[12px] lg:text-[16px] placeholder:text-white-body outline-none';
  const labelClass = 'text-white text-[12px] lg:text-[20px] font-normal';

  return (
    <div className="px-5 md:px-15 lg:px-45 py-8 lg:py-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-white-body text-[12px] lg:text-[16px] mb-4"
      >
        ← 뒤로가기
      </button>
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-medium mb-2 lg:mb-4">
        Community
      </p>
      <p className="text-white text-[18px] lg:text-[38px] font-bold mb-8 lg:mb-12">
        창업 정보 게시판
      </p>

      <div className="w-full lg:max-w-225 mx-auto lg:border lg:border-white/20 lg:rounded-[24px] lg:backdrop-blur-[50px] lg:px-43 lg:py-27.5 flex flex-col gap-6 lg:gap-8">
        <p className="text-white text-[16px] lg:text-[24px] font-medium text-center">
          창업 정보에 대해 자세히 알려주세요.
        </p>

        {/* 카테고리 */}
        <div className="flex flex-col gap-2">
          <p className={labelClass}>카테고리 *</p>
          <div className="grid grid-cols-2 gap-2">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCategory(option.value)}
                className={`py-2 lg:py-2.5 rounded-[10px] border text-[12px] lg:text-[16px] transition-all duration-200 ${
                  category === option.value
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white/50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-2">
          <p className={labelClass}>제목 *</p>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="제목을 입력해주세요. (최대 50자)"
            maxLength={50}
            className={inputClass}
          />
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-2">
          <p className={labelClass}>본문 *</p>
          <textarea
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            placeholder="내용을 자세히 설명해주세요. (최대 500자)"
            maxLength={500}
            rows={5}
            className={`${inputClass} resize-none`}
          />
          <p className="text-white-body text-[11px] lg:text-[14px] text-right">
            {formData.content.length}/500
          </p>
        </div>

        {/* 이미지 URL */}
        <div className="flex flex-col gap-2">
          <p className={labelClass}>이미지 URL</p>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            placeholder="이미지 URL을 입력해주세요."
            className={inputClass}
          />
          {formData.imageUrl && (
            <div className="w-full aspect-[16/9] rounded-[10px] overflow-hidden bg-white/10">
              <img
                src={formData.imageUrl}
                alt="미리보기"
                className="w-full h-full object-cover"
                onError={(e) => (e.target.style.display = 'none')}
              />
            </div>
          )}
        </div>

        {/* 외부 링크 */}
        <div className="flex flex-col gap-2">
          <p className={labelClass}>외부 링크</p>
          <input
            type="text"
            value={formData.externalUrl}
            onChange={(e) => handleChange('externalUrl', e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

        {/* 주최 기관 */}
        <div className="flex flex-col gap-2">
          <p className={labelClass}>주최 기관</p>
          <input
            type="text"
            value={formData.organizer}
            onChange={(e) => handleChange('organizer', e.target.value)}
            placeholder="주최 기관 혹은 출처를 기재해주세요."
            className={inputClass}
          />
        </div>

        {/* 시작일 / 종료일 */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-2 flex-1">
            <p className={labelClass}>시작일</p>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <p className={labelClass}>종료일</p>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* 마감일 */}
        <div className="flex flex-col gap-2">
          <p className={labelClass}>마감일</p>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
            className={inputClass}
          />
        </div>

        {errorMessage && (
          <p className="text-red text-[12px] lg:text-[14px] text-center">
            {errorMessage}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-primary text-white text-[14px] lg:text-[20px] font-bold rounded-lg disabled:opacity-50"
        >
          {isSubmitting ? '등록 중...' : '등록하기'}
        </button>
      </div>
    </div>
  );
}

export default PostForm;
