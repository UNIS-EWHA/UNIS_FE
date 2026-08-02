import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import Tag from '@/components/Tag';
import Community1 from './components/Community1';
import Community2 from './components/Community2';
import Community4 from './components/Community4';
import Footer from '@/components/Footer';
import { getCommunityPosts } from '@/api/community';
import { categoryCodes } from '@/constants/community';

const tabs = ['창업 정보 공유', '팀원 구인', '저장한 글'];

const categoryMap = {
  '창업 정보 공유': ['전체', '지원사업', '공모전', '해커톤', '교내 프로그램'],
  '팀원 구인': ['전체', '기획', '디자인', '프론트엔드', '백엔드'],
  '저장한 글': [],
};

const PAGE_SIZE = 8;

function Community() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('창업 정보 공유');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [searchInput, setSearchInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    if (activeTab !== '창업 정보 공유') return;

    getCommunityPosts({
      category: categoryCodes[activeCategory],
      keyword: keyword || undefined,
      page,
      size: PAGE_SIZE,
    })
      .then((res) => {
        setPosts((prev) =>
          page === 0 ? res.data.posts : [...prev, ...res.data.posts]
        );
        setHasNext(res.data.hasNext);
      })
      .catch(() => {
        setPosts([]);
        setHasNext(false);
      });
  }, [activeTab, activeCategory, keyword, page]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveCategory('전체');
    setPage(0);
  };

  const renderContent = () => {
    switch (activeTab) {
      case '창업 정보 공유':
        return (
          <Community1
            posts={posts}
            hasNext={hasNext}
            onLoadMore={() => setPage((p) => p + 1)}
          />
        );
      case '팀원 구인':
        return <Community2 activeCategory={activeCategory} keyword={keyword} />;
      case '저장한 글':
        return <Community4 />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="px-5 md:px-15 lg:px-45 py-8 lg:py-14">
        <p className="text-blue-primary text-[12px] lg:text-[24px] font-medium mb-4">
          Community
        </p>
        <p className="text-white text-[18px] lg:text-[38px] font-bold mb-6 lg:mb-20">
          창업 정보 게시판
        </p>

        <div className="flex items-center border-b border-white/20 mb-4 lg:mb-14">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`text-[12px] lg:text-[24px] font-medium pb-4 mr-6 border-b-2 transition-all duration-200 ${
                activeTab === tab
                  ? 'text-blue-mint border-blue-mint'
                  : 'text-white-body border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-4 lg:mb-8">
          <SearchBar
            placeholder="검색어를 입력해주세요."
            value={searchInput}
            onChange={setSearchInput}
            onSearch={() => {
              setPage(0);
              setKeyword(searchInput);
            }}
          />
        </div>

        {categoryMap[activeTab].length > 0 && (
          <div className="flex items-center justify-between gap-4 mb-4 lg:mb-20">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categoryMap[activeTab].map((category) => (
                <Tag
                  key={category}
                  label={category}
                  fixed={category.length <= 5}
                  isActive={activeCategory === category}
                  onClick={() => {
                    setPage(0);
                    setActiveCategory(category);
                  }}
                />
              ))}
            </div>
            {(activeTab === '창업 정보 공유' || activeTab === '팀원 구인') && (
              <button
                onClick={() =>
                  navigate(
                    activeTab === '창업 정보 공유'
                      ? '/community/write'
                      : '/community/recruit-write'
                  )
                }
                className="hidden md:block shrink-0 border border-blue-mint text-blue-mint text-[12px] px-3 py-1 rounded-[20px] lg:text-[20px] lg:px-7.5 lg:py-2 rounded-[40px] font-bold"
              >
                게시글 작성
              </button>
            )}
          </div>
        )}

        {renderContent()}
      </div>
      <Footer />
    </>
  );
}

export default Community;
