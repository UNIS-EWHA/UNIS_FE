import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from '@/components/Tag';
import { categoryLabels } from '@/constants/community';
import { toggleCommunityPostSave } from '@/api/community';
import BookmarkIcon from '@/assets/ic_bookmark_40.svg';
import FilledBookmarkIcon from '@/assets/ic_filled_bookmark_40.svg';

function PostCard({
  postId,
  category,
  title,
  content,
  organizer,
  viewCount,
  createdAt,
  deadline,
  dDay,
  isSaved: initialIsSaved,
}) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const dDayLabel = dDay <= 0 ? '마감' : `D-${dDay}`;

  const handleToggleSave = async (e) => {
    e.stopPropagation();
    try {
      const res = await toggleCommunityPostSave(postId);
      setIsSaved(res.data.isSaved);
    } catch {
      // 저장 실패는 조용히 무시, 다시 클릭하면 재시도됨
    }
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
      <div className="flex items-center gap-2 pr-6">
        <Tag label={categoryLabels[category] ?? category} />
        <Tag label={dDayLabel} />
      </div>
      <p className="text-white text-[14px] font-[600]">{title}</p>
      <p className="text-white-body text-[12px] font-[400] leading-[160%] line-clamp-2">
        {content}
      </p>
      <hr className="border-white/20" />
      <div className="flex items-center justify-between">
        <p className="text-white-body text-[12px]">출처: {organizer}</p>
        <p className="text-white-body text-[12px]">조회수: {viewCount}</p>
      </div>
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

function Community1({ posts, hasNext, onLoadMore }) {
  const navigate = useNavigate();
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
        {posts.map((post) => (
          <PostCard key={post.postId} {...post} />
        ))}
      </div>

      {hasNext && (
        <div className="flex items-center justify-end mt-6">
          <button
            onClick={onLoadMore}
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

export default Community1;
