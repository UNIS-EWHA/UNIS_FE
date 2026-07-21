import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChevronBottomIcon from '@/assets/ic_chevron_bottom.svg';
import { signup, sendEmailCode, verifyEmailCode, checkLoginId } from '@/api/auth';

const parts = ['기획', '디자인', '프론트엔드', '백엔드'];
const partToCode = {
  기획: 'PLANNING',
  디자인: 'DESIGN',
  프론트엔드: 'FRONTEND',
  백엔드: 'BACKEND',
};

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [emailVerificationToken, setEmailVerificationToken] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isLoginIdAvailable, setIsLoginIdAvailable] = useState(false);
  const [isCheckingLoginId, setIsCheckingLoginId] = useState(false);
  const [loginIdMessage, setLoginIdMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [generation, setGeneration] = useState('');
  const [selectedPart, setSelectedPart] = useState('');
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendEmailCode = async () => {
    if (!email) {
      setEmailMessage('이메일을 입력해주세요.');
      return;
    }
    setEmailMessage('');
    try {
      setIsSendingCode(true);
      await sendEmailCode(email);
      setEmailMessage('인증번호가 발송되었습니다.');
    } catch (error) {
      setEmailMessage(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '인증번호 발송에 실패했습니다.',
      );
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    if (!emailCode) {
      setEmailMessage('인증번호를 입력해주세요.');
      return;
    }
    setEmailMessage('');
    try {
      setIsVerifyingCode(true);
      const res = await verifyEmailCode(email, emailCode);
      setEmailVerificationToken(res.data.emailVerificationToken);
      setIsEmailVerified(true);
      setEmailMessage('이메일 인증이 완료되었습니다.');
    } catch (error) {
      setIsEmailVerified(false);
      setEmailMessage(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '인증번호가 올바르지 않습니다.',
      );
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleCheckLoginId = async () => {
    if (!studentId) {
      setLoginIdMessage('아이디를 입력해주세요.');
      return;
    }
    setLoginIdMessage('');
    try {
      setIsCheckingLoginId(true);
      const res = await checkLoginId(studentId);
      setIsLoginIdAvailable(res.data.available);
      setLoginIdMessage(
        res.data.available ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.',
      );
    } catch (error) {
      setIsLoginIdAvailable(false);
      setLoginIdMessage(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '중복 확인에 실패했습니다.',
      );
    } finally {
      setIsCheckingLoginId(false);
    }
  };

  const handleSignUp = async () => {
    setErrorMessage('');

    if (!name || !email || !studentId || !password) {
      setErrorMessage('필수 항목을 모두 입력해주세요.');
      return;
    }
    if (!isEmailVerified) {
      setErrorMessage('이메일 인증을 완료해주세요.');
      return;
    }
    if (!isLoginIdAvailable) {
      setErrorMessage('아이디 중복 확인을 완료해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!agree1 || !agree2) {
      setErrorMessage('필수 약관에 동의해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      await signup({
        name,
        email,
        emailVerificationToken,
        loginId: studentId,
        password,
        generation: generation ? Number(generation) : undefined,
        part: selectedPart ? partToCode[selectedPart] : undefined,
        termsAgreed: agree1,
        privacyAgreed: agree2,
      });
      navigate('/login');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail ??
          error.response?.data?.message ??
          '회원가입에 실패했습니다.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailVerified(false);
              }}
              placeholder="이메일 주소를 입력해주세요."
              className="flex-1 bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] placeholder:text-white/50 outline-none"
            />
            <button
              onClick={handleSendEmailCode}
              disabled={isSendingCode}
              className="shrink-0 bg-white text-black text-[12px] px-3 py-2 rounded-[8px] disabled:opacity-50"
            >
              {isSendingCode ? '발송 중...' : '인증번호 발송'}
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
              disabled={isEmailVerified}
              className="flex-1 bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] placeholder:text-white/50 outline-none disabled:opacity-50"
            />
            <button
              onClick={handleVerifyEmailCode}
              disabled={isVerifyingCode || isEmailVerified}
              className="shrink-0 bg-white text-black text-[12px] px-3 py-2 rounded-[8px] disabled:opacity-50"
            >
              {isEmailVerified ? '인증 완료' : isVerifyingCode ? '확인 중...' : '인증하기'}
            </button>
          </div>
          {emailMessage && (
            <p className="text-[12px] text-blue-primary">{emailMessage}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] font-[500]">학번</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={studentId}
              onChange={(e) => {
                setStudentId(e.target.value);
                setIsLoginIdAvailable(false);
              }}
              placeholder="학번을 입력해주세요."
              className="flex-1 bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] placeholder:text-white/50 outline-none"
            />
            <button
              onClick={handleCheckLoginId}
              disabled={isCheckingLoginId}
              className="shrink-0 bg-white text-black text-[12px] px-3 py-2 rounded-[8px] disabled:opacity-50"
            >
              {isCheckingLoginId ? '확인 중...' : '중복 확인'}
            </button>
          </div>
          {loginIdMessage && (
            <p className="text-[12px] text-blue-primary">{loginIdMessage}</p>
          )}
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

        {errorMessage && (
          <p className="text-red-500 text-[12px] text-center">{errorMessage}</p>
        )}

        <button
          onClick={handleSignUp}
          disabled={isSubmitting}
          className="w-full py-3 bg-white text-black text-[14px] font-[700] rounded-[8px] disabled:opacity-50"
        >
          {isSubmitting ? '가입 중...' : '회원가입'}
        </button>
      </div>
    </div>
  );
}

export default SignUp;
