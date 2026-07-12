const curriculumItems = [
  {
    title: 'OT & 팀빌딩',
    description:
      'UNIS의 활동 방향과 학기 커리큘럼을 소개하고, 다양한 직군의 학회원들과 교류하며 팀을 구성하는 시간입니다. 서로의 관심사와 아이디어를 공유하며 함께 서비스를 만들어갈 팀을 만들어갑니다.',
  },
  {
    title: '아이디어톤',
    description:
      '주어진 시간 동안 팀원들과 아이디어를 구체화하고 문제 해결 방안을 도출하는 프로젝트형 활동입니다. 사용자 관점에서 서비스를 기획하고 빠르게 검증하며 창업 아이디어를 발전시킵니다.',
  },
  {
    title: '산학협력 프로젝트',
    description:
      '팀별 프로젝트 형태로 실제 서비스를 제작하는 과정입니다. 기획안을 바탕으로 디자인과 개발을 진행하며, 협업을 통해 아이디어를 실제 프로덕트 형태로 구현합니다.',
  },
  {
    title: '데모데이',
    description:
      '한 학기 동안 제작한 서비스를 발표하고 공유하는 최종 발표 행사입니다. 프로젝트의 기획 과정과 결과물을 소개하며, 팀의 성장과 성과를 함께 나누는 자리입니다.',
  },
];

function CurriculumItem({ title, description }) {
  return (
    <div className="flex items-center gap-4 md:gap-5 lg:gap-16 px-[3px] lg:px-14">
      <div className="relative z-10 w-[6px] h-[6px] lg:w-5 lg:h-5 rounded-full bg-white shrink-0" />

      <div className="w-full border border-white/20 rounded-[10px] lg:rounded-[20px] px-4 py-3 md:p-4 lg:px-10 lg:py-8 backdrop-blur-[50px]">
        <p className="text-white text-[14px] md:text-[16px] lg:text-[32px] font-[600] mb-1 md:mb-2 lg:mb-4">
          {title}
        </p>
        <p className="text-white-body text-[10px] md:text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-[160%] lg:leading-[150%]">
          {description}
        </p>
      </div>
    </div>
  );
}

function Curriculum() {
  return (
    <div className="px-5 md:px-15 lg:px-45">
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
        Curriculum
      </p>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
        학기별 세션 타임라인
      </p>

      <div className="relative">
        <div
          className="absolute left-[5px] lg:left-16 top-0 bottom-0 w-[1px] lg:w-[3px]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.2) 10%, rgba(255,255,255,0.2) 90%, rgba(255,255,255,0))',
          }}
        />

        <div className="flex flex-col gap-4 lg:gap-16">
          {curriculumItems.map((item, index) => (
            <CurriculumItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Curriculum;
