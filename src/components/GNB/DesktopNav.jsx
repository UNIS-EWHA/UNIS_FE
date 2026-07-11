import { Link, useNavigate } from 'react-router-dom';
import UnisLogo from '@/assets/ic_unis_logo_48.svg';

function Button({ name, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ borderColor: color, color: color }}
      className="flex items-center justify-center w-[118px] h-10 border-2 font-pretendard text-[20px] font-[500] leading-[130%] rounded-[24px]"
    >
      {name}
    </button>
  );
}
function DesktopNav() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between pl-[157px] pr-[79px] py-[26px] bg-[#001C3F]/20 backdrop-blur-[50px] border-b border-b-white/10">
      <Link to="/">
        <div className="flex items-center gap-14">
          <img src={UnisLogo} alt="unis logo" className="h-12" />
          <p className="font-pretendard text-white text-[28px] tracking-[30%] font-[600]">
            UNIS
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-[79.5px]">
        <ul className="flex items-center gap-18 title-s text-white">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/activity">Activity</Link>
          </li>
          <li>
            <Link to="/project">Project</Link>
          </li>
          <li>
            <Link to="/community">Community</Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Button
            name="로그인"
            color="var(--color-white)"
            onClick={() => useNavigate('/login')}
          />
          <Button
            name="지원하기"
            color="var(--color-blue-mint)"
            onClick={() => useNavigate('/application')}
          />
        </div>
      </div>
    </nav>
  );
}

export default DesktopNav;
