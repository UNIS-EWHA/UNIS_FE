import Hero from './components/Hero';
import Stats from './components/Stats';
import AboutPreview from './components/AboutPreview';
import ActivityPreview from './components/ActivityPreview';
import MemberExperience from './components/MemberExperience';
import Footer from '@/components/Footer';

function Home() {
  return (
    <>
      <Hero />
      <div className="flex flex-col gap-14 lg:gap-20">
        <Stats />
        <AboutPreview />
        <ActivityPreview />
        <MemberExperience />
      </div>
      <div className="h-14 lg:h-20" />
      <Footer />
    </>
  );
}

export default Home;
