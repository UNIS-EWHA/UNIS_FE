import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChevronBottomIcon from '@/assets/ic_chevron_bottom.svg';
const parts = ['기획', '디자인', '프론트엔드', '백엔드'];

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [generation, setGeneration] = useState('');
  const [selectedPart, setSelectedPart] = useState('');
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  return (
    <div className="flex mt-8 lg:mt-16 justify-center px-5">
      <div className="w-full md:max-w-[500px] md:border md:border-white/20 md:rounded-[20px] md:backdrop-blur-[50px] px-6 py-10 md:px-10 md:py-12 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 mb-2">
          <p className="text-white text-[20px] font-[700]">회원가입</p>
          <p className="text-white-body text-[12px] font-[400]">
            이메일 또는 소셜 계정으로 가입하세요.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] font-[500]">이름</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] placeholder:text-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] font-[500]">이메일</p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소를 입력해주세요."
              className="flex-1 bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] placeholder:text-white/50 outline-none"
            />
            <button className="shrink-0 bg-white text-black text-[12px] px-3 py-2 rounded-[8px]">
              인증번호 발송
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] font-[500]">인증번호 입력</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              placeholder="인증번호를 입력해주세요."
              className="flex-1 bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] placeholder:text-white/50 outline-none"
            />
            <button className="shrink-0 bg-white text-black text-[12px] px-3 py-2 rounded-[8px]">
              인증하기
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] font-[500]">학번</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="학번을 입력해주세요."
              className="flex-1 bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] placeholder:text-white/50 outline-none"
            />
            <button className="shrink-0 bg-white text-black text-[12px] px-3 py-2 rounded-[8px]">
              중복 확인
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] font-[500]">비밀번호</p>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8자리 이상, 영문·숫자 조합"
              className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] placeholder:text-white/50 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] font-[500]">비밀번호 확인</p>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호를 다시 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] placeholder:text-white/50 outline-none"
          />
        </div>

        <hr className="border-white/20" />

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] font-[500]">소속 기수 (선택)</p>
          <input
            type="text"
            value={generation}
            onChange={(e) => setGeneration(e.target.value)}
            placeholder="소속 기수의 숫자를 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] placeholder:text-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] font-[500]">파트 (선택)</p>
          <div className="flex gap-2 flex-wrap">
            {parts.map((part) => (
              <button
                key={part}
                onClick={() => setSelectedPart(part)}
                className={`px-4 py-2 rounded-[8px] border text-[12px] transition-all duration-200 ${
                  selectedPart === part
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white/50'
                }`}
              >
                {part}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agree1}
                onChange={(e) => setAgree1(e.target.checked)}
                className="w-4 h-4 accent-blue-primary"
              />
              <p className="text-white-body text-[12px]">
                [필수] 이용약관에 동의합니다.
              </p>
            </div>
            <img src={ChevronBottomIcon} className="h-4" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agree2}
                onChange={(e) => setAgree2(e.target.checked)}
                className="w-4 h-4 accent-blue-primary"
              />
              <p className="text-white-body text-[12px]">
                [필수] 개인정보 처리방침에 동의합니다.
              </p>
            </div>
            <img src={ChevronBottomIcon} className="h-4" />
          </label>
        </div>

        <button className="w-full py-3 bg-white text-black text-[14px] font-[700] rounded-[8px]">
          회원가입
        </button>
      </div>
    </div>
  );
}

export default SignUp;
