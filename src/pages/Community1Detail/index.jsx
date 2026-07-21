import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tag from '@/components/Tag';
import BookmarkIcon from '@/assets/ic_bookmark_40.svg';
import FilledBookmarkIcon from '@/assets/ic_filled_bookmark_40.svg';
import {
  getCommunityPostDetail,
  toggleCommunityPostSave,
} from '@/api/community';
import { categoryLabels } from '@/constants/community';

function Community1Detail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getCommunityPostDetail(id)
      .then((res) => setPost(res.data))
      .catch(() => setNotFound(true));
  }, [id]);

  const handleToggleSave = async () => {
    try {
      const res = await toggleCommunityPostSave(id);
      setPost((prev) => ({ ...prev, isSaved: res.data.isSaved }));
    } catch {
      // 저장 실패는 조용히 무시, 아이콘을 다시 클릭하면 재시도됨
    }
  };

  if (notFound) return <p className="text-white">게시글을 찾을 수 없어요.</p>;
  if (!post) return null;

  const {
    imageUrl,
    title,
    content,
    category,
    dDay,
    organizer,
    startDate,
    endDate,
    tags,
    externalUrl,
    deadline,
    isSaved,
  } = post;

  const dDayLabel = dDay <= 0 ? '마감' : `D-${dDay}`;

  const infoRows = [
    organizer && { label: '주최기관', value: organizer },
    (startDate || endDate) && {
      label: '기간',
      value: `${startDate ?? '미정'} ~ ${endDate ?? '미정'}`,
    },
    deadline && { label: '마감', value: deadline },
    ...tags.map((tag) => ({ label: tag.label, value: tag.content })),
  ].filter(Boolean);

  return (
    <div className="w-full mx-auto px-5 md:px-15 lg:px-45 py-8 lg:py-14">
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <p className="text-white text-[16px] md:text-[20px] lg:text-[32px] font-[700]">
          {title}
        </p>
        <img
          src={isSaved ? FilledBookmarkIcon : BookmarkIcon}
          alt="bookmark"
          className="w-4 h-4 md:w-5 md:h-5 lg:w-10 lg:h-10 cursor-pointer"
          onClick={handleToggleSave}
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-4 lg:mb-10">
        <Tag label={categoryLabels[category] ?? category} />
        <Tag label={dDayLabel} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-20">
        <div className="w-full lg:w-3/5 flex flex-col gap-4 lg:gap-10">
          <div className="w-full aspect-[16/9] bg-white/10 rounded-[10px] lg:rounded-[20px] overflow-hidden">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <p className="text-white-body text-[12px] md:text-[14px] lg:text-[20px] font-[400] leading-[160%]">
            {content}
          </p>
        </div>

        <div className="w-full lg:w-2/5 flex flex-col gap-6 lg:gap-10">
          <div>
            <p className="text-white text-[16px] lg:text-[28px] font-[700] mb-3 lg:mb-6">
              주요 내용
            </p>
            <div className="flex flex-col gap-2 lg:gap-4">
              {infoRows.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center gap-2 lg:gap-4"
                >
                  <Tag label={detail.label} fixed={detail.label.length <= 5} />
                  <p className="text-white-body text-[12px] lg:text-[20px]">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-white-body" />

          <div>
            <p className="text-white text-[16px] lg:text-[28px] font-[700] mb-3 lg:mb-6">
              자세한 정보 확인하기
            </p>
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 lg:py-3 text-center text-black bg-white rounded-[8px] text-[14px] lg:text-[20px] font-[700] block"
              >
                Link
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community1Detail;
