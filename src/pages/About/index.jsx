import { useEffect, useState } from 'react';
import CoreValues from './components/CoreValues';
import Part from './components/Part';
import Photo from './components/Photo';
import Faq from './components/Faq';
import Footer from '@/components/Footer';
import { getAboutContent } from '@/api/about';

function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    getAboutContent()
      .then((res) => setAbout(res.data))
      .catch(() => setAbout(null));
  }, []);

  if (!about) return null;

  return (
    <div className="flex flex-col gap-14 md:gap-20 lg:gap-30 mt-8 lg:mt-14">
      <CoreValues coreValues={about.coreValues} />
      <Part parts={about.parts} />
      <Photo photos={about.photos} />
      <Faq faqs={about.faqs} />
      <Footer />
    </div>
  );
}

export default About;
