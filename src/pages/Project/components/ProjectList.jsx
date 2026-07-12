import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '@/data/projects';
import Tag from '@/components/Tag';

function ProjectCard({ id, image, title, description, tags }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/project/${id}`)}
      className="border border-white/20 rounded-[10px] lg:rounded-[20px] p-4 lg:p-10 flex flex-col gap-3 lg:gap-10 backdrop-blur-[50px]"
    >
      <div className="w-full aspect-[16/9] bg-white/10 rounded-[10px] lg:rounded-[20px] overflow-hidden">
        {image && (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        )}
      </div>

      <p className="text-white text-[12px] md:text-[14px] lg:text-[28px] font-[600] lg:font-[700] leading=[160%] md:leading-normal">
        {title}
      </p>

      {description && (
        <p className="hidden lg:block text-white-body text-[20px] font-[400] leading-[160%]">
          {description}
        </p>
      )}

      <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </div>
  );
}

function ProjectList() {
  const [showAll, setShowAll] = useState(false);

  const getDefaultCount = () => {
    if (window.innerWidth >= 768) return 6;
    return 3;
  };

  const [defaultCount, setDefaultCount] = useState(getDefaultCount);

  useEffect(() => {
    const handleResize = () => setDefaultCount(getDefaultCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, defaultCount);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
      {!showAll && projects.length > defaultCount && (
        <div className="flex justify-end mt-6 lg:mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="border border-white text-white text-[12px] md:text-[14px] lg:text-[20px] px-8 py-2 rounded-full"
          >
            더보기
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
