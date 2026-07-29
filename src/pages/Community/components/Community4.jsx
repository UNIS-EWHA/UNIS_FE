import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from '@/components/Tag';
import FilledBookmarkIcon from '@/assets/ic_filled_bookmark_40.svg';
import { getSavedPosts } from '@/api/saved';
import {
  toggleCommunityPostSave,
  toggleCommunityRecruitmentSave,
} from '@/api/community';
import { categoryLabels } from '@/constants/community';

const savedCategories = ['전체', '창업 정보', '팀원 구인'];

function SavedPostCard({
  savedId,
  type,
  targetId,
  title,
  category,
  recruitmentType,
  deadline,
  dDay,
  onUnsave,
}) {
  const navigate = useNavigate();
  const isPost = type === 'POST';
  const dDayLabel =
    dDay === null || dDay === undefined
      ? null
      : dDay <= 0
        ? '마감'
        : `D-${dDay}`;

  const handleToggleSave = async (e) => {
    e.stopPropagation();
    try {
      if (isPost) {
        await toggleCommunityPostSave(targetId);
      } else {
        await toggleCommunityRecruitmentSave(targetId);
      }
      onUnsave(savedId);
    } catch {
      // 저장 취소 실패는 조용히 무시, 다시 클릭하면 재시도됨
    }
  };

  return (
    <div
      onClick={isPost ? () => navigate(`/community/${targetId}`) : undefined}
      className={`relative border border-white/20 rounded-[10px] p-4 flex flex-col gap-3 backdrop-blur-[50px] ${isPost ? 'cursor-pointer' : ''}`}
    >
      {/* 북마크 (이 목록은 전부 저장된 항목이므로 항상 채워진 아이콘) */}
      <img
        src={FilledBookmarkIcon}
        alt="저장 취소"
        onClick={handleToggleSave}
        className="absolute top-4 right-4 w-4 h-4 lg:w-5 lg:h-5 cursor-pointer"
      />

      {/* 태그 */}
      <div className="flex items-center gap-2 flex-wrap pr-6">
        <Tag
          label={isPost ? (categoryLabels[category] ?? category) : recruitmentType}
          fixed={false}
        />
        {dDayLabel && <Tag label={dDayLabel} />}
      </div>

      {/* 제목 */}
      <p className="text-white text-[14px] font-[600]">{title}</p>

      <hr className="border-white/20" />

      {/* 마감 */}
      <div className="flex items-center justify-end">
        <p className="text-white-body text-[12px]">
          마감 {deadline ? deadline.replaceAll('-', '.') : '미정'}
        </p>
      </div>
    </div>
  );
}

function Community4() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    getSavedPosts()
      .then((res) => setSavedPosts(res.data.saved))
      .catch(() => setSavedPosts([]));
  }, []);

  const handleUnsave = (savedId) => {
    setSavedPosts((prev) => prev.filter((post) => post.savedId !== savedId));
  };

  const filteredPosts = savedPosts.filter((post) => {
    if (activeCategory === '전체') return true;
    if (activeCategory === '창업 정보') return post.type === 'POST';
    if (activeCategory === '팀원 구인') return post.type === 'RECRUITMENT';
    return true;
  });

  return (
    <div>
      {/* 카테고리 필터 */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 lg:mb-8">
        {savedCategories.map((category) => (
          <Tag
            key={category}
            label={category}
            fixed={category.length <= 5}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      {/* 카드 목록 */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <SavedPostCard key={post.savedId} {...post} onUnsave={handleUnsave} />
          ))}
        </div>
      ) : (
        <p className="text-white-body text-[12px] text-center py-10">
          저장한 글이 없습니다.
        </p>
      )}
    </div>
  );
}

export default Community4;
