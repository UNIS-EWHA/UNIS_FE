import { useEffect, useState } from 'react';
import ActivitySection from './components/ActivitySection';
import Curriculum from './components/Curriculum';
import Footer from '@/components/Footer';
import { getActivityContent } from '@/api/activity';

function Activity() {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    getActivityContent()
      .then((res) => setActivity(res.data))
      .catch(() => setActivity(null));
  }, []);

  if (!activity) return null;

  return (
    <div className="flex flex-col gap-14 md:gap-20 lg:gap-30 mt-8 lg:mt-14">
      <ActivitySection programs={activity.programs} />
      <Curriculum curriculum={activity.curriculum} />
      <Footer />
    </div>
  );
}

export default Activity;
