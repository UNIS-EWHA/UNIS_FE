// pages/Community/components/PostForm/index.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from '@/components/Tag';
import { createCommunityPost } from '@/api/community';
import { categoryCodes } from '@/constants/community';

const categoryOptions = Object.keys(categoryCodes);

function PostForm() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    source: '',
    startDate: '',
    deadline: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setErrorMessage('');

    if (!category) {
      setErrorMessage('카테고리를 선택해주세요.');
      return;
    }
    if (!formData.title || !formData.content) {
      setErrorMessage('프로젝트 명과 소개를 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await createCommunityPost({
        category: categoryCodes[category],
        title: formData.title,
        content: formData.content,
        organizer: formData.source || undefined,
        startDate: formData.startDate || undefined,
        deadline: formData.deadline || undefined,
      });
      navigate('/community/complete');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '게시글 등록에 실패했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex mt-8 lg:mt-16 justify-center px-5">
      <div className="w-full lg:max-w-[600px]">
        <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] mb-2">
          Community
        </p>
        <p className="text-white text-[18px] lg:text-[38px] font-[700] mb-8 lg:mb-12">
          창업 정보 게시판
        </p>
        <div className="w-full lg:border lg:border-white/20 lg:rounded-[20px] lg:backdrop-blur-[50px] lg:bg-[#000000]/20 px-6 py-8 lg:px-10 lg:py-12 flex flex-col gap-6">
          <p className="text-white text-[16px] lg:text-[20px] font-[700] text-center">
            창업 정보에 대해 자세히 알려주세요.
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-white text-[12px] lg:text-[14px] font-[500]">
              카테고리
            </p>
            <div className="flex gap-2 flex-wrap">
              {categoryOptions.map((option) => (
                <Tag
                  key={option}
                  label={option}
                  isActive={category === option}
                  onClick={() => setCategory(option)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white text-[12px] lg:text-[14px] font-[500]">
              담당 프로젝트 명
            </p>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="프로젝트 이름 (최대 50자)"
              className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white text-[12px] lg:text-[14px] font-[500]">
              프로젝트 소개
            </p>
            <input
              type="text"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="프로젝트에 대해 자세히 설명해주세요. (최대 500자)"
              className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white text-[12px] lg:text-[14px] font-[500]">
              출처
            </p>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => handleChange('source', e.target.value)}
              placeholder="주최 기관 혹은 출처를 기재해주세요."
              className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white text-[12px] lg:text-[14px] font-[500]">
              시작일
            </p>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white text-[12px] lg:text-[14px] font-[500]">
              마감일
            </p>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => handleChange('deadline', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-[12px] text-center">
              {errorMessage}
            </p>
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
