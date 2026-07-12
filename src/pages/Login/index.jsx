import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FindPassword from '../FindPassword';

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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

        <button className="w-full py-3 bg-white text-black text-[14px] lg:text-[16px] font-[700] rounded-[8px]">
          로그인
        </button>
      </div>
    </div>
  );
}

export default Login;
