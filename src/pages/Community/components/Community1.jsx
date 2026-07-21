import { useNavigate } from 'react-router-dom';
import { posts } from '@/data/posts.js';
import Tag from '@/components/Tag';

function PostCard({ id, tags, title, content, source, views, date, deadline }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/community/${id}`)}
      className="border border-white/20 rounded-[10px] p-4 flex flex-col gap-3 backdrop-blur-[50px] cursor-pointer"
    >
      <div className="flex items-center gap-2">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} fixed={tag.length <= 5} />
        ))}
      </div>
      <p className="text-white text-[14px] font-[600]">{title}</p>
      <p className="text-white-body text-[12px] font-[400] leading-[160%] line-clamp-2">
        {content}
      </p>
      <hr className="border-white/20" />
      <div className="flex items-center justify-between">
        <p className="text-white-body text-[12px]">출처: {source}</p>
        <p className="text-white-body text-[12px]">조회수: {views}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-white-body text-[12px]">{date}</p>
        <p className="text-white-body text-[12px]">마감 {deadline}</p>
      </div>
    </div>
  );
}

function Community1({
  visiblePosts,
  showAll,
  setShowAll,
  defaultCount,
  totalCount,
}) {
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
        {visiblePosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div />

        {!showAll && totalCount > defaultCount && (
          <button
            onClick={() => setShowAll(true)}
            className="border border-white text-white text-[12px] lg:text-[20px] px-8 py-2 rounded-full ml-auto"
          >
            더보기
          </button>
        )}
      </div>
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
