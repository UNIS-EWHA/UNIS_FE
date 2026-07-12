import ActivitySection from './components/ActivitySection';
import Curriculum from './components/Curriculum';
import Footer from '@/components/Footer';

function Activity() {
  return (
    <div className="flex flex-col gap-14 md:gap-20 lg:gap-30 mt-8 lg:mt-14">
      <ActivitySection />
      <Curriculum />
      <Footer />
    </div>
  );
}

export default Activity;
