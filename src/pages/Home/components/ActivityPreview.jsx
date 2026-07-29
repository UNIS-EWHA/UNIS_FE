import { useNavigate } from 'react-router-dom';
import ActivityImg1 from '@/assets/img_activity_preview_1.png';
import ActivityImg2 from '@/assets/img_activity_preview_2.png';
import ActivityImg3 from '@/assets/img_activity_preview_3.png';
import ActivityImg4 from '@/assets/img_activity_preview_4.png';

const activities = [
  {
    image: ActivityImg1,
    title: '정기 세션',
    description: '매주 진행되는 정기 세션에서 파트별 실무 역량을 쌓습니다.',
  },
  {
    image: ActivityImg2,
    title: '프로젝트 회의',
    description: '팀별로 모여 아이디어를 구체화하고 프로젝트를 진행합니다.',
  },
  {
    image: ActivityImg3,
    title: '직무별 스터디',
    description: '필요한 기술과 정보를 함께 학습하고 공유합니다.',
  },
  {
    image: ActivityImg4,
    title: '네트워킹 데이',
    description: '기수를 넘나드는 교류로 UNIS 커뮤니티를 이어갑니다.',
  },
];

function ActivityCard({ image, title, description }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full aspect-[16/9] bg-white/10 rounded-[10px] overflow-hidden">
        {image && (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        )}
      </div>
      <p className="text-white text-[14px] lg:text-[20px] font-[600]">
        {title}
      </p>
      <p className="text-white-body text-[12px] lg:text-[16px] font-[400] leading-[160%] line-clamp-3">
        {description}
      </p>
    </div>
  );
}

function ActivityPreview() {
  const navigate = useNavigate();

  return (
    <div className="px-5 md:px-15 lg:px-45">
      <div className="flex items-start justify-between mb-6 lg:mb-10">
        <div>
          <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] mb-2">
            Our Activities
          </p>
          <p className="text-white text-[18px] lg:text-[38px] font-[700]">
            UNIS의 활동
          </p>
        </div>
        <button
          onClick={() => navigate('/activity')}
          className="text-white text-[12px] lg:text-[20px] font-[400] shrink-0 ml-8"
        >
          활동 보기 →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {activities.map((activity, index) => (
          <ActivityCard key={index} {...activity} />
        ))}
      </div>
    </div>
  );
}

export default ActivityPreview;
