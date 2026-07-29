import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from '@/components/Tag';
import BookmarkIcon from '@/assets/ic_bookmark_40.svg';
import FilledBookmarkIcon from '@/assets/ic_filled_bookmark_40.svg';

const savedCategories = ['전체', '창업 정보', '팀원 구인'];

const mockSavedPosts = [
  {
    postId: 1,
    type: 'recruit',
    parts: ['디자인', '백엔드'],
    title: '이화 헬스테크 해커톤 같이 나가실 분 구합니다!',
    content: '저랑 제발 같은 팀 해주세요..',
    viewCount: 67,
    createdAt: '2025-04-25',
    deadline: '2025-05-28',
    isSaved: true,
  },
  {
    postId: 2,
    type: 'recruit',
    parts: ['디자인', '백엔드'],
    title: '이화 헬스테크 해커톤 같이 나가실 분 구합니다!',
    content: '저랑 제발 같은 팀 해주세요..',
    viewCount: 67,
    createdAt: '2025-04-25',
    deadline: '2025-05-28',
    isSaved: true,
  },
  {
    postId: 3,
    type: 'info',
    category: 'HACKATHON',
    dDay: 21,
    title: '이화 헬스테크 해커톤 같이 나가실 분 구합니다!',
    content: '저랑 제발 같은 팀 해주세요..',
    organizer: '이화 의료원',
    viewCount: 67,
    createdAt: '2025-04-25',
    deadline: '2025-05-28',
    isSaved: true,
  },
  {
    postId: 4,
    type: 'info',
    category: 'HACKATHON',
    dDay: 21,
    title: '이화 헬스테크 해커톤 같이 나가실 분 구합니다!',
    content: '저랑 제발 같은 팀 해주세요..',
    organizer: '이화 의료원',
    viewCount: 67,
    createdAt: '2025-04-25',
    deadline: '2025-05-28',
    isSaved: true,
  },
];

function SavedPostCard({
  postId,
  type,
  parts,
  category,
  dDay,
  title,
  content,
  organizer,
  viewCount,
  createdAt,
  deadline,
  isSaved: initialIsSaved,
}) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  const handleToggleSave = (e) => {
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  return (
    <div
      onClick={() => navigate(`/community/${postId}`)}
      className="relative border border-white/20 rounded-[10px] p-4 flex flex-col gap-3 backdrop-blur-[50px] cursor-pointer"
    >
      <img
        src={isSaved ? FilledBookmarkIcon : BookmarkIcon}
        alt="bookmark"
        onClick={handleToggleSave}
        className="absolute top-4 right-4 w-4 h-4 lg:w-5 lg:h-5 cursor-pointer"
      />

      {/* 태그 */}
      <div className="flex items-center gap-2 flex-wrap pr-6">
        {type === 'recruit' ? (
          (parts || []).map((part) => (
            <Tag key={part} label={part} fixed={false} />
          ))
        ) : (
          <>
            <Tag label={category} fixed={false} />
            {dDay !== undefined && (
              <Tag label={dDay <= 0 ? '마감' : `D-${dDay}`} />
            )}
          </>
        )}
      </div>

      {/* 제목 */}
      <p className="text-white text-[14px] font-[600]">{title}</p>

      {/* 내용 */}
      <p className="text-white-body text-[12px] font-[400] leading-[160%] line-clamp-2">
        {content}
      </p>

      <hr className="border-white/20" />

      {/* 출처/조회수 */}
      <div className="flex items-center justify-between">
        {type === 'info' && organizer && (
          <p className="text-white-body text-[12px]">출처: {organizer}</p>
        )}
        <p className="text-white-body text-[12px] ml-auto">
          조회수: {viewCount}
        </p>
      </div>

      {/* 날짜/마감 */}
      <div className="flex items-center justify-between">
        <p className="text-white-body text-[12px]">
          {createdAt?.slice(0, 10).replaceAll('-', '.')}
        </p>
        <p className="text-white-body text-[12px]">
          마감 {deadline ? deadline.replaceAll('-', '.') : '미정'}
        </p>
      </div>
    </div>
  );
}

function Community4() {
  const [activeCategory, setActiveCategory] = useState('전체');

  const filteredPosts = mockSavedPosts.filter((post) => {
    if (activeCategory === '전체') return true;
    if (activeCategory === '창업 정보') return post.type === 'info';
    if (activeCategory === '팀원 구인') return post.type === 'recruit';
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPosts.map((post) => (
          <SavedPostCard key={post.postId} {...post} />
        ))}
      </div>
    </div>
  );
}

export default Community4;
