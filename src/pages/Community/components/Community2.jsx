import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from '@/components/Tag';
import BookmarkIcon from '@/assets/ic_bookmark_40.svg';
import FilledBookmarkIcon from '@/assets/ic_filled_bookmark_40.svg';

const mockPosts = [
  {
    postId: 1,
    category: 'DESIGN',
    title: '이화 헬스테크 해커톤 같이 나가실 분 구합니다!',
    content: '기한 제한 공고 및 해주세요.',
    parts: ['디자인', '백엔드'],
    organizer: '출처: 이화',
    viewCount: 67,
    createdAt: '2025-04-22',
    deadline: '2025-05-24',
    dDay: 21,
    isSaved: false,
  },
  {
    postId: 2,
    category: 'DESIGN',
    title: '이화 헬스테크 해커톤 같이 나가실 분 구합니다!',
    content: '기한 제한 공고 및 해주세요.',
    parts: ['디자인', '백엔드'],
    organizer: '출처: 이화',
    viewCount: 67,
    createdAt: '2025-04-22',
    deadline: '2025-05-24',
    dDay: 21,
    isSaved: false,
  },
  {
    postId: 3,
    category: 'DESIGN',
    title: '이화 헬스테크 해커톤 같이 나가실 분 구합니다!',
    content: '기한 제한 공고 및 해주세요.',
    parts: ['디자인', '백엔드'],
    organizer: '출처: 이화',
    viewCount: 67,
    createdAt: '2025-04-22',
    deadline: '2025-05-24',
    dDay: 21,
    isSaved: false,
  },
  {
    postId: 4,
    category: 'DESIGN',
    title: '이화 헬스테크 해커톤 같이 나가실 분 구합니다!',
    content: '기한 제한 공고 및 해주세요.',
    parts: ['디자인', '백엔드'],
    organizer: '출처: 이화',
    viewCount: 67,
    createdAt: '2025-04-22',
    deadline: '2025-05-24',
    dDay: 21,
    isSaved: true,
  },
  {
    postId: 5,
    category: 'FRONTEND',
    title: '이화 헬스테크 해커톤 같이 나가실 분 구합니다!',
    content: '기한 제한 공고 및 해주세요.',
    parts: ['프론트엔드'],
    organizer: '출처: 이화',
    viewCount: 41,
    createdAt: '2025-04-23',
    deadline: '2025-05-28',
    dDay: 3,
    isSaved: false,
  },
  {
    postId: 6,
    category: 'PLANNING',
    title: '이화 헬스테크 해커톤 같이 나가실 분 구합니다!',
    content: '내용내용내용내용내용내용내용내용내용내용내용내용',
    parts: ['기획'],
    organizer: '출처: 이화',
    viewCount: 41,
    createdAt: '2025-04-23',
    deadline: '2025-05-28',
    dDay: 0,
    isSaved: false,
  },
];

function RecruitCard({
  title,
  content,
  parts,
  viewCount,
  createdAt,
  deadline,
  isSaved: initialIsSaved,
}) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  const handleToggleSave = (e) => {
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  return (
    <div className="relative border border-white/20 rounded-[10px] p-4 flex flex-col gap-3 backdrop-blur-[50px]">
      {/* 북마크 */}
      <img
        src={isSaved ? FilledBookmarkIcon : BookmarkIcon}
        alt="bookmark"
        onClick={handleToggleSave}
        className="absolute top-4 right-4 w-4 h-4 lg:w-5 lg:h-5 cursor-pointer"
      />

      {/* 파트 태그 - 상단 */}
      <div className="flex items-center gap-2 flex-wrap pr-6">
        {parts.map((part) => (
          <Tag key={part} label={part} fixed={false} />
        ))}
      </div>

      {/* 제목 */}
      <p className="text-white text-[14px] font-[600]">{title}</p>

      {/* 내용 */}
      <p className="text-white-body text-[12px] font-[400] leading-[160%] line-clamp-4">
        {content}
      </p>

      <hr className="border-white/20" />

      {/* 조회수 */}
      <p className="text-white-body text-[12px]">조회수: {viewCount}</p>

      {/* 날짜 / 마감 */}
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
function Community2() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);
  const visiblePosts = mockPosts.slice(0, visibleCount);
  const hasMore = visibleCount < mockPosts.length;

  return (
    <div>
      <div className="flex justify-end md:mb-5">
        <button
          onClick={() => navigate('/community/write')}
          className="hidden md:block border border-white text-white text-[16px] px-6 py-2 rounded-full"
        >
          게시글 작성
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {visiblePosts.map((post) => (
          <RecruitCard key={post.postId} {...post} />
        ))}
      </div>

      {hasMore && (
        <div className="flex items-center justify-end mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="border border-white text-white text-[12px] lg:text-[20px] px-8 py-2 rounded-full"
          >
            더보기
          </button>
        </div>
      )}

      <button
        onClick={() => navigate('/community/write')}
        className="md:hidden fixed bottom-8 right-8 w-12 h-12 bg-blue-primary rounded-full text-white text-[24px] flex items-center justify-center z-50"
      >
        +
      </button>
    </div>
  );
}

export default Community2;
