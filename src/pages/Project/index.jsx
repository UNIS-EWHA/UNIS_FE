import { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import GenerationFilter from './components/GenerationaFilter';
import ProjectList from './components/ProjectList';
import Footer from '@/components/Footer';
import { getProjects } from '@/api/project';

const PAGE_SIZE = 6;

function Project() {
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [generation, setGeneration] = useState('전체');
  const [page, setPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    const generationValue =
      generation === '전체' ? undefined : parseInt(generation);

    getProjects({
      generation: generationValue,
      keyword: keyword || undefined,
      page,
      size: PAGE_SIZE,
    })
      .then((res) => {
        setProjects((prev) =>
          page === 0 ? res.data.projects : [...prev, ...res.data.projects],
        );
        setHasNext(res.data.hasNext);
      })
      .catch(() => {
        setProjects([]);
        setHasNext(false);
      });
  }, [generation, keyword, page]);

  return (
    <div className="flex flex-col gap-14 md:gap-20 lg:gap-30 mt-8 lg:mt-14">
      <div className="px-5 md:px-15 lg:px-45">
        <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
          Project
        </p>
        <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
          UNIS에서 진행된 프로젝트
        </p>

        <SearchBar
          placeholder="프로젝트명, 기술 스택으로 검색하세요."
          value={searchInput}
          onChange={setSearchInput}
          onSearch={() => {
            setPage(0);
            setKeyword(searchInput);
          }}
        />
        <div className="h-3 md:h-4 lg:h-8" />
        <GenerationFilter
          selected={generation}
          onSelect={(value) => {
            setPage(0);
            setGeneration(value);
          }}
        />
        <div className="h-6 lg:h-20" />
        <ProjectList
          projects={projects}
          hasNext={hasNext}
          onLoadMore={() => setPage((p) => p + 1)}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Project;
