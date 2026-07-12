import { useState } from 'react';
import { posts } from '@/data/posts.js';
import SearchBar from '@/components/SearchBar';
import Tag from '@/components/Tag';
import Community1 from './components/Community1';
import Community2 from './components/Community2';
import Community3 from './components/Community3';
import Footer from '@/components/Footer';

const tabs = ['창업 정보 공유', '팀원 구인', '저장한 글'];
const categories = ['전체', '지원사업', '공모전', '해커톤', '교내 프로그램'];

function PostCard({ tags, title, content, source, views, date, deadline }) {
  return (
    <div className="border border-white/20 rounded-[10px] p-4 flex flex-col gap-3 backdrop-blur-[50px]">
      <div className="flex items-center gap-2">
        {tags.map((tag) => (
          <Tag key={tag} label={tag} />
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

function Community() {
  const [activeTab, setActiveTab] = useState('창업 정보 공유');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [showAll, setShowAll] = useState(false);

  const getDefaultCount = () => {
    if (window.innerWidth >= 1510) return 6;
    return 3;
  };
  const [defaultCount, setDefaultCount] = useState(getDefaultCount);
  const visiblePosts = showAll ? posts : posts.slice(0, defaultCount);

  const renderContent = () => {
    switch (activeTab) {
      case '창업 정보 공유':
        return (
          <Community1
            visiblePosts={visiblePosts}
            visiblePosts={visiblePosts}
            showAll={showAll}
            setShowAll={setShowAll}
            defaultCount={defaultCount}
            totalCount={posts.length}
          />
        );
      case '팀원 구인':
        return <Community2 />;
      case '저장한 글':
        return <Community3 />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="px-5 md:px-15 lg:px-45 py-8">
        <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] mb-2">
          Community
        </p>
        <p className="text-white text-[18px] lg:text-[38px] font-[700] mb-6 lg:mb-10">
          창업 정보 게시판
        </p>

        <div className="flex items-center border-b border-white/20 mb-4 lg:mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[12px] lg:text-[20px] font-[500] pb-2 mr-6 border-b-2 transition-all duration-200 ${
                activeTab === tab
                  ? 'text-white border-white'
                  : 'text-white-body border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-4 lg:mb-6">
          <SearchBar placeholder="검색어를 입력해주세요." />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 lg:mb-8">
          {categories.map((category) => (
            <Tag
              key={category}
              label={category}
              fixed={category.length <= 5}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>

        {renderContent()}
      </div>
      <Footer />
    </>
  );
}

export default Community;
