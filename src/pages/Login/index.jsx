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
      setErrorMessage('아이디와 비밀번호를 입력해주세요.');
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
          '로그인에 실패했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" flex mt-8 lg:mt-16 justify-center px-5">
      <div className="w-full md:max-w-[500px] md:border md:border-white/20 md:rounded-[20px] md:backdrop-blur-[50px] px-6 py-10 md:px-10 md:py-12 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 mb-2">
          <p className="text-white text-[20px] lg:text-[24px] font-[700]">
            로그인
          </p>
          <p className="text-white-body text-[12px] lg:text-[14px] font-[400]">
            이메일 또는 소셜 계정으로 로그인하세요.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] lg:text-[14px] font-[500]">
            아이디
          </p>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] lg:text-[14px] font-[500]">
            비밀번호 입력
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] lg:text-[14px] placeholder:text-white/50 outline-none"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-blue-primary"
            />
            <p className="text-white-body text-[12px] lg:text-[14px]">
              로그인 유지
            </p>
          </label>
          <button
            onClick={() => navigate('/find-password')}
            className="text-white-body text-[12px] lg:text-[14px]"
          >
            비밀번호 찾기
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-[12px] text-center">{errorMessage}</p>
        )}

        <div className="flex flex-col gap-4">
          <button
            onClick={handleLogin}
            disabled={isSubmitting}
            className="w-full py-3 bg-white text-black text-[14px] lg:text-[16px] font-[700] rounded-[8px] disabled:opacity-50"
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="w-full py-3 text-white text-[14px] lg:text-[16px] font-[700] rounded-[8px] border border-white"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
