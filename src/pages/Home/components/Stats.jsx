function StatCard({ number, label }) {
  return (
    <div className="flex flex-col items-center justify-center border border-white/20 rounded-[10px] p-8 lg:p-12 backdrop-blur-[50px] gap-2">
      <p className="text-blue-mint text-[32px] lg:text-[48px] font-[700]">
        {number}
      </p>
      <p className="text-white-body text-[12px] lg:text-[16px] font-[400]">
        {label}
      </p>
    </div>
  );
}

const stats = [
  { number: '130+', label: '누적 학회원' },
  { number: '52+', label: '프로젝트' },
  { number: '18+', label: '수상 성과' },
];

function Stats() {
  return (
    <div className="px-5 md:px-15 lg:px-45">
      <p className="text-white text-[16px] lg:text-[28px] font-[700] mb-6 lg:mb-10">
        7기수 활동 기록
      </p>
      <div className="grid grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}

export default Stats;
