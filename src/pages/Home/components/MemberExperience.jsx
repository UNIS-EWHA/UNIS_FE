import { useEffect, useState } from 'react';
import { getHomeTestimonials } from '@/api/home';
import useInView from '@/hooks/useInView';

function StoryCard({ name, role, content }) {
  return (
    <div className="flex flex-col gap-3 border border-white/20 rounded-[10px] p-6 lg:p-8 backdrop-blur-[50px]">
      <p className="text-white text-[16px] md:text-[18px] lg:text-[24px] font-[700]">
        {name}
      </p>
      <p className="text-white-body text-[12px] md:text-[14px] lg:text-[16px] font-[400]">
        {role}
      </p>
      <p className="text-white-body text-[12px] md:text-[14px] lg:text-[16px] font-[400] leading-[160%]">
        {content}
      </p>
    </div>
  );
}

function MemberExperience() {
  const [stories, setStories] = useState([]);
  const { ref, isVisible } = useInView();

  useEffect(() => {
    getHomeTestimonials()
      .then((res) => setStories(res.data))
      .catch(() => setStories([]));
  }, []);

  return (
    <div
      ref={ref}
      className={`px-5 md:px-15 lg:px-45 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] mb-2 md:mb-3 lg:mb-4">
        Member Experience
      </p>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] mb-6 md:mb-8 lg:mb-10">
        학회원들의 이야기
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        {stories.map((story) => (
          <StoryCard key={story.testimonialId} {...story} />
        ))}
      </div>
    </div>
  );
}

export default MemberExperience;
