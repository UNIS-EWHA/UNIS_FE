import CoreValues from './components/CoreValues';
import Part from './components/Part';
import Photo from './components/Photo';
import Faq from './components/Faq';
import Footer from '@/components/Footer';

function About() {
  return (
    <div className="flex flex-col gap-14 md:gap-20 lg:gap-30 mt-8 lg:mt-14">
      <CoreValues />
      <Part />
      <Photo />
      <Faq />
      <Footer />
    </div>
  );
}

export default About;
