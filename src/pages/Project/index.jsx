import SearchBar from '@/components/SearchBar';
import GenerationFilter from './components/GenerationaFilter';
import ProjectList from './components/ProjectList';
import Footer from '@/components/Footer';

function Project() {
  return (
    <div className="flex flex-col gap-14 md:gap-20 lg:gap-30 mt-8 lg:mt-14">
      <div className="px-5 md:px-15 lg:px-45">
        <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
          Project
        </p>
        <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
          UNIS에서 진행된 프로젝트
        </p>

        <SearchBar placeholder="프로젝트명, 기술 스택으로 검색하세요." />
        <div className="h-3 md:h-4 lg:h-8" />
        <GenerationFilter />
        <div className="h-6 lg:h-20" />
        <ProjectList />
      </div>
      <Footer />
    </div>
  );
}

export default Project;
