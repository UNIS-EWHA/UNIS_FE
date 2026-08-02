import { useNavigate } from 'react-router-dom';
import CardTag from '@/components/CardTag';
import EmptyMessage from '@/components/EmptyMessage';

function ProjectCard({ projectId, thumbnailUrl, name, description, techStacks }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/project/${projectId}`)}
      className="border border-white/20 rounded-[10px] lg:rounded-[20px] p-4 lg:p-10 flex flex-col gap-3 lg:gap-10 backdrop-blur-[50px]"
    >
      <div className="w-full aspect-[16/9] bg-white/10 rounded-[10px] lg:rounded-[20px] overflow-hidden">
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <p className="text-white text-[12px] md:text-[14px] lg:text-[28px] font-[600] lg:font-[700] leading=[160%] md:leading-normal">
        {name}
      </p>

      {description && (
        <p className="hidden lg:block text-white-body text-[20px] font-[400] leading-[160%]">
          {description}
        </p>
      )}

      <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
        {techStacks.map((tech) => (
          <CardTag key={tech} label={tech} />
        ))}
      </div>
    </div>
  );
}

function ProjectList({ projects, hasNext, onLoadMore }) {
  return (
    <div>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.projectId} {...project} />
          ))}
        </div>
      ) : (
        <EmptyMessage />
      )}
      {hasNext && (
        <div className="flex justify-end mt-6 lg:mt-10">
          <button
            onClick={onLoadMore}
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
