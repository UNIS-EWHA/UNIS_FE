import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UnisLogo from '@/assets/ic_unis_logo_48.svg';
import MenuIcon from '@/assets/ic_menu_33.svg';
import ChevronRightIcon from '@/assets/ic_chevron_right.svg';
import MenuItem from './components/MenuItem';

function MobileNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-5 py-4 md:px-15 md:py-4 bg-[#001C3F]/20 backdrop-blur-[50px] border-b border-b-white/10">
        <Link to="/">
          <div className="flex items-center gap-4">
            <img
              src={UnisLogo}
              alt="unis logo"
              className="h-[17px] md:h-[23px]"
            />
            <p className="text-white text-[16px] leading-[150%] tracking-[15%] font-[700] md:text-[19px] md:leading-normal md:tracking-[30%]">
              UNIS
            </p>
          </div>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>
          <img
            src={MenuIcon}
            alt="menu icon"
            className="h-[19px] w-[19px] md:h-[33px] md:w-[33px]"
          />
        </button>
      </nav>

      {isOpen && (
        <>
          <div className="fixed top-0 left-0 right-0 z-50 bg-[#000000]/80 backdrop-blur-[50px] px-5 py-20 md:px-15">
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-[13px]">
                <p className="text-[18px] font-[700] leading-normal tracking-0 text-white md:text-[20px]">
                  로그인
                </p>
                <img src={ChevronRightIcon} alt="chevron right icon" />
              </div>
            </Link>

            <hr className="border-white-body mt-6 mb-6" />

            <ul className="flex flex-col gap-6 mb-8 text-white text-[14px] font-[600] leading-normal tracking-0 md:text-[16px]">
              <MenuItem name="Home" path="/" onClick={() => setIsOpen(false)} />
              <MenuItem
                name="About"
                path="/about"
                onClick={() => setIsOpen(false)}
              />
              <MenuItem
                name="Activity"
                path="/activity"
                onClick={() => setIsOpen(false)}
              />
              <MenuItem
                name="Project"
                path="/project"
                onClick={() => setIsOpen(false)}
              />
              <MenuItem
                name="Community"
                path="/community"
                onClick={() => setIsOpen(false)}
              />
            </ul>

            <button
              onClick={() => {
                navigate('/application');
                setIsOpen(false);
              }}
              className="border-[0.82px] border-blue-mint text-[10px] text-[#91f8ff] font-[700] leading-normal px-[18.5px] py-[3px] rounded-[20px]"
            >
              지원하기
            </button>
          </div>

          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </>
  );
}

export default MobileNav;
