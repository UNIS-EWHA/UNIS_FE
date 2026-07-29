import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from '@/components/Tag';
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
  const [tags, setTags] = useState([{ label: '', content: '' }]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleTagChange = (index, key, value) => {
    setTags((prev) =>
      prev.map((tag, i) => (i === index ? { ...tag, [key]: value } : tag))
    );
  };

  const addTag = () => {
    setTags((prev) => [...prev, { label: '', content: '' }]);
  };

  const removeTag = (index) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
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
        tags: tags.filter((t) => t.label && t.content),
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
    'w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none';
  const labelClass = 'text-white text-[12px] lg:text-[14px] font-[500]';

  return (
    <div className="flex mt-8 lg:mt-16 justify-center px-5">
      <div className="w-full lg:max-w-[600px]">
        <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] mb-2">
          Community
        </p>
        <p className="text-white text-[18px] lg:text-[38px] font-[700] mb-8 lg:mb-12">
          창업 정보 게시판
        </p>

        <div className="w-full lg:border lg:border-white/20 lg:rounded-[20px] lg:backdrop-blur-[50px] lg:bg-[#000000]/20 px-0 py-0 lg:px-10 lg:py-12 flex flex-col gap-6">
          <p className="text-white text-[16px] lg:text-[20px] font-[700] text-center">
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
                  className={`py-2 rounded-[8px] border text-[12px] lg:text-[14px] transition-all duration-200 ${
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
            <p className="text-white/50 text-[11px] text-right">
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
              <div className="w-full aspect-[16/9] rounded-[8px] overflow-hidden bg-white/10">
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

          {/* 추가 정보 태그 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className={labelClass}>추가 정보</p>
              <button
                onClick={addTag}
                className="text-blue-primary text-[12px] font-[500]"
              >
                + 추가
              </button>
            </div>
            {tags.map((tag, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={tag.label}
                  onChange={(e) =>
                    handleTagChange(index, 'label', e.target.value)
                  }
                  placeholder="라벨 (예: 기간)"
                  className={`${inputClass} w-[30%]`}
                />
                <input
                  type="text"
                  value={tag.content}
                  onChange={(e) =>
                    handleTagChange(index, 'content', e.target.value)
                  }
                  placeholder="내용 (예: 2026.04.25~05.28)"
                  className={`${inputClass} flex-1`}
                />
                {tags.length > 1 && (
                  <button
                    onClick={() => removeTag(index)}
                    className="text-white/50 text-[12px] shrink-0"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {errorMessage && (
            <p className="text-red text-[12px] text-center">{errorMessage}</p>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-2 bg-blue-primary text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px] disabled:opacity-50"
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
