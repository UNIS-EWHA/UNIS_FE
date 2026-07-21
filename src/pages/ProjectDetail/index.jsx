import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Tag from '@/components/Tag';
import BookmarkIcon from '@/assets/ic_bookmark_40.svg';
import FilledBookmarkIcon from '@/assets/ic_filled_bookmark_40.svg';
import { getProjectDetail } from '@/api/project';

const partLabels = {
  PLANNING: '기획',
  DESIGN: '디자인',
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
};

function ProjectDetail() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getProjectDetail(id)
      .then((res) => setProject(res.data))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound)
    return <p className="text-white">프로젝트를 찾을 수 없어요.</p>;
  if (!project) return null;

  const {
    thumbnailUrl: image,
    name: title,
    techStacks: tags,
    description,
    members: team,
    githubUrl,
    serviceUrl,
  } = project;

  return (
    <div className="w-full max-w-[2800px] mx-auto px-5 md:px-15 lg:px-45 py-8 lg:py-14">
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <p className="text-white text-[16px] md:text-[20px] lg:text-[32px] font-[700]">
          {title}
        </p>
        <img
          src={isBookmarked ? FilledBookmarkIcon : BookmarkIcon}
          alt="bookmark"
          className="w-4 h-4 md:w-5 md:h-5 lg:w-10 lg:h-10 cursor-pointer"
          onClick={() => setIsBookmarked(!isBookmarked)}
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-4 lg:mb-10">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-20">
        <div className="w-full lg:w-3/5 flex flex-col gap-4 lg:gap-10">
          <div className="w-full aspect-[16/9] max-w-230 bg-white/10 rounded-[10px] lg:rounded-[20px] overflow-hidden">
            {image && (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <p className="text-white-body text-[12px] md:text-[14px] lg:text-[20px] font-[400] leading-[160%]">
            {description}
          </p>
        </div>

        <div className="w-full lg:w-2/5 flex flex-col gap-8 lg:gap-10">
          <div>
            <p className="text-white text-[16px] lg:text-[28px] font-[700] mb-3 lg:mb-6">
              팀 구성
            </p>
            <div className="flex flex-col gap-2 lg:gap-4">
              {team.map((member) => (
                <div
                  key={member.part}
                  className="flex items-center gap-2 lg:gap-4"
                >
                  <Tag label={partLabels[member.part] ?? member.part} />
                  <p className="text-white-body text-[14px] lg:text-[24px]">
                    {member.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-white-body" />

          <div>
            <p className="text-white text-[16px] lg:text-[28px] font-[700] mb-3 lg:mb-6">
              결과물 링크
            </p>
            <div className="flex flex-col gap-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 lg:py-3 text-center text-black bg-white rounded-[8px] text-[14px] lg:text-[20px] font-[700]"
                >
                  Github
                </a>
              )}
              {serviceUrl && (
                <a
                  href={serviceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 lg:py-3 text-center text-black bg-white rounded-[8px] text-[14px] lg:text-[20px] font-[700]"
                >
                  서비스 바로가기
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
