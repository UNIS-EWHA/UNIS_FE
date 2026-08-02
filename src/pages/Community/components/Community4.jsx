import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from '@/components/Tag';
import CardTag from '@/components/CardTag';
import EmptyMessage from '@/components/EmptyMessage';
import FilledBookmarkIcon from '@/assets/ic_filled_bookmark_40.svg';
import { getSavedPosts } from '@/api/saved';
import {
  toggleCommunityPostSave,
  toggleCommunityRecruitmentSave,
} from '@/api/community';
import { categoryLabels, recruitmentTypeLabels } from '@/constants/community';

const savedCategories = ['전체', '창업 정보', '팀원 구인'];
const categoryTypeMap = {
  전체: undefined,
  '창업 정보': 'POST',
  '팀원 구인': 'RECRUITMENT',
};
const PAGE_SIZE = 8;

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
        <CardTag
          label={
            isPost
              ? (categoryLabels[category] ?? category)
              : (recruitmentTypeLabels[recruitmentType] ?? recruitmentType)
          }
        />
        {dDayLabel && <CardTag label={dDayLabel} />}
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
  const [page, setPage] = useState(0);
  const [savedPosts, setSavedPosts] = useState([]);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    getSavedPosts({
      type: categoryTypeMap[activeCategory],
      page,
      size: PAGE_SIZE,
    })
      .then((res) => {
        setSavedPosts((prev) =>
          page === 0 ? res.data.saved : [...prev, ...res.data.saved],
        );
        setHasNext(res.data.hasNext);
      })
      .catch(() => {
        setSavedPosts([]);
        setHasNext(false);
      });
  }, [activeCategory, page]);

  const handleUnsave = (savedId) => {
    setSavedPosts((prev) => prev.filter((post) => post.savedId !== savedId));
  };

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
            onClick={() => {
              setPage(0);
              setActiveCategory(category);
            }}
          />
        ))}
      </div>

      {/* 카드 목록 */}
      {savedPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {savedPosts.map((post) => (
              <SavedPostCard
                key={post.savedId}
                {...post}
                onUnsave={handleUnsave}
              />
            ))}
          </div>
          {hasNext && (
            <div className="flex justify-end mt-6 lg:mt-10">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="border border-white text-white text-[12px] md:text-[14px] lg:text-[20px] px-8 py-2 rounded-full"
              >
                더보기
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyMessage />
      )}
    </div>
  );
}

export default Community4;
