import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from '@/components/Tag';
import BookmarkIcon from '@/assets/ic_bookmark_40.svg';
import FilledBookmarkIcon from '@/assets/ic_filled_bookmark_40.svg';
import {
  getCommunityRecruitments,
  toggleCommunityRecruitmentSave,
} from '@/api/community';
import { partCodes, partLabels } from '@/constants/community';

const PAGE_SIZE = 8;

function RecruitCard({
  recruitmentId,
  title,
  content,
  parts,
  viewCount,
  createdAt,
  deadline,
  isSaved: initialIsSaved,
}) {
  const [isSaved, setIsSaved] = useState(!!initialIsSaved);

  const handleToggleSave = async (e) => {
    e.stopPropagation();
    try {
      const res = await toggleCommunityRecruitmentSave(recruitmentId);
      setIsSaved(res.data.isSaved);
    } catch {
      // 저장 실패는 조용히 무시, 다시 클릭하면 재시도됨
    }
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
          <Tag key={part} label={partLabels[part] ?? part} fixed={false} />
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
function Community2({ activeCategory, keyword }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [recruitments, setRecruitments] = useState([]);
  const [hasNext, setHasNext] = useState(false);

  const filterKey = `${activeCategory}|${keyword}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(0);
  }

  useEffect(() => {
    getCommunityRecruitments({
      part: partCodes[activeCategory],
      keyword: keyword || undefined,
      page,
      size: PAGE_SIZE,
    })
      .then((res) => {
        setRecruitments((prev) =>
          page === 0
            ? res.data.recruitments
            : [...prev, ...res.data.recruitments]
        );
        setHasNext(res.data.hasNext);
      })
      .catch(() => {
        setRecruitments([]);
        setHasNext(false);
      });
  }, [activeCategory, keyword, page]);

  return (
    <div>
      <div className="flex justify-end md:mb-5">
        <button
          onClick={() => navigate('/community/recruit-write')}
          className="hidden md:block border border-white text-white text-[16px] px-6 py-2 rounded-full"
        >
          게시글 작성
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recruitments.map((post) => (
          <RecruitCard key={post.recruitmentId} {...post} />
        ))}
      </div>

      {hasNext && (
        <div className="flex items-center justify-end mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="border border-white text-white text-[12px] lg:text-[20px] px-8 py-2 rounded-full"
          >
            더보기
          </button>
        </div>
      )}

      <button
        onClick={() => navigate('/community/recruit-write')}
        className="md:hidden fixed bottom-8 right-8 w-12 h-12 bg-blue-primary rounded-full text-white text-[24px] flex items-center justify-center z-50"
      >
        +
      </button>
    </div>
  );
}

export default Community2;
