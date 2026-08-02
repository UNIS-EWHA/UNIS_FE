import { useState } from 'react';
import ChevronTopIcon from '@/assets/ic_chevron_top.svg';
import ChevronBottomIcon from '@/assets/ic_chevron_bottom.svg';
import useInView from '@/hooks/useInView';

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${isOpen ? '' : 'border-b border-b-[0.5px] lg:border-b-[1px] border-white-body'}`}
    >
      <button
        className="w-full flex items-center justify-between px-2 py-3 lg:px-4 lg:py-8 text-white text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-[12px] md:text-[14px] lg:text-[24px] font-[400] lg:font-[500] leading-[160%] lg:leading-[150%]">
          {question}
        </p>
        <img
          src={isOpen ? ChevronTopIcon : ChevronBottomIcon}
          alt="chevron"
          className="h-3 md:h-3.5 lg:h-6"
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border border-white/20 bg-white/10 backdrop-blur-[50px] p-4 mb-4 lg:px-8 lg:py-13.5 lg:mb-8">
          <p className="text-white text-[12px] md:text-[14px] lg:text-[24px] leading-[150%]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function Faq({ faqs }) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`px-5 md:px-15 lg:px-45 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <p className="text-blue-primary text-[12px] lg:text-[24px] font-[400] lg:font-[500] leading-normal tracking-[0%] mb-2 lg:mb-4">
        FAQ
      </p>
      <p className="text-white text-[18px] md:text-[20px] lg:text-[38px] font-[700] leading-normal md:leading-[150%] tracking-[0%] mb-8 lg:mb-20">
        자주 묻는 질문
      </p>

      <div>
        {faqs.map((faq) => (
          <FaqItem key={faq.faqId} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default Faq;
