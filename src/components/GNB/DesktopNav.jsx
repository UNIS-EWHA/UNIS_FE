import { Link, useNavigate } from 'react-router-dom';
import UnisLogo from '@/assets/ic_unis_logo_48.svg';
import MenuItem from './components/MenuItem';
import useAuthStore from '@/store/authStore';
import { logout } from '@/api/auth';

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
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleAuthClick = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    try {
      await logout();
    } catch {
    } finally {
      clearAuth();
      navigate('/login');
    }
  };

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
          <MenuItem name="Home" path="/" />
          <MenuItem name="About" path="/about" />
          <MenuItem name="Activity" path="/activity" />
          <MenuItem name="Project" path="/project" />
          <MenuItem name="Community" path="/community" />
        </ul>

        <div className="flex items-center gap-4">
          <Button
            name={isLoggedIn ? '로그아웃' : '로그인'}
            color="var(--color-white)"
            onClick={handleAuthClick}
          />
          <Button
            name="지원하기"
            color="var(--color-blue-mint)"
            onClick={() => navigate('/application')}
          />
        </div>
      </div>
    </nav>
  );
}

export default DesktopNav;
