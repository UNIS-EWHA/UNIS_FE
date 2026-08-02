import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FindPassword from '../FindPassword';
import { login } from '@/api/auth';
import useAuthStore from '@/store/authStore';

function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setErrorMessage('');

    if (!id || !password) {
      setErrorMessage('학번과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await login({
        loginId: id,
        password,
        keepLogin: rememberMe,
      });
      setAuth(res.data);
      navigate('/');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '로그인에 실패했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" flex mt-14 justify-center px-5">
      <div className="w-full md:max-w-162.5 lg:border lg:border-white/20 lg:rounded-[20px] lg:backdrop-blur-[50px] lg:p-14 flex flex-col">
        <div className="flex flex-col items-center gap-2 mb-8 lg:gap-4 lg:mb-20">
          <p className="text-white text-[18px] lg:text-[28px] font-bold text-center">
            로그인
          </p>
          <p className="text-white text-[12px] md:text-[18px] lg:text-[20px] font-normal text-center">
            학번과 비밀번호로 로그인하세요.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:gap-4">
          <p className="text-white text-[12px] lg:text-[20px] font-normal">
            학번
          </p>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="학번을 입력해주세요."
            className="w-full border border-white rounded-[10px] px-4 lg:px-6 py-3 text-white text-[12px] lg:text-[20px] placeholder:text-white-body outline-none"
          />
        </div>
        <div className="flex flex-col mt-8 gap-2 lg:gap-4">
          <p className="text-white text-[12px] lg:text-[20px] font-normal">
            비밀번호
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            className="w-full  border border-white rounded-[10px] px-4 lg:px-6 py-3 text-white text-[12px] lg:text-[20px] placeholder:text-white-body outline-none"
          />
          {errorMessage && (
            <p className="text-red text-[12px] lg:text-[16px]">
              {errorMessage}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mb-20 mt-3 lg:mt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded-sm accent-blue-primary"
            />
            <p className="text-white text-[12px] lg:text-[16px]">로그인 유지</p>
          </label>
        </div>
        <div className="flex flex-col gap-4 mb-3">
          <button
            onClick={handleLogin}
            disabled={isSubmitting}
            className="w-full py-3 bg-white text-black text-[14px] lg:text-[20px] font-semibold lg:font-bold rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="w-full py-3 text-white text-[14px] lg:text-[20px] font-semibold lg:font-bold rounded-lg border border-white"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
