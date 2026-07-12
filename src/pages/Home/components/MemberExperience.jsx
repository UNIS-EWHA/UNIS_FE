const stories = [
  {
    name: '학회원',
    role: '7기 디자인',
    content:
      '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
  },
  {
    name: '학회원',
    role: '7기 디자인',
    content:
      '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
  },
  {
    name: '학회원',
    role: '7기 디자인',
    content:
      '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
  },
];

function StoryCard({ name, role, content }) {
  return (
    <div className="flex flex-col gap-3 border border-white/20 rounded-[10px] p-6 backdrop-blur-[50px]">
      <p className="text-white text-[16px] lg:text-[24px] font-[700]">{name}</p>
      <p className="text-blue-primary text-[12px] lg:text-[16px] font-[400]">
        {role}
      </p>
      <p className="text-white-body text-[12px] lg:text-[16px] font-[400] leading-[160%]">
        {content}
      </p>
    </div>
  );
}

function MemberExperience() {
  return (
    <div className="px-5 md:px-15 lg:px-45">
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] mb-2">
        Member Experience
      </p>
      <p className="text-white text-[18px] lg:text-[38px] font-[700] mb-6 lg:mb-10">
        학회원들의 이야기
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {stories.map((story, index) => (
          <StoryCard key={index} {...story} />
        ))}
      </div>
    </div>
  );
}

export default MemberExperience;
