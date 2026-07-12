import { useState } from 'react';

function FindPassword() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  return (
    <div className=" flex justify-center px-5 mt-8 lg:mt-16">
      <div className="w-full md:max-w-[500px] md:border md:border-white/20 md:rounded-[20px] md:backdrop-blur-[50px] px-6 py-10 md:px-10 md:py-12 flex flex-col gap-6">
        <p className="text-white text-[20px] font-[700] text-center">
          비밀번호 찾기
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] md:text-[14px] font-[500]">
            이름
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] md:text-[14px] placeholder:text-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-white text-[12px] md:text-[14px] font-[500]">
            학번
          </p>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="학번 입력해주세요."
            className="w-full bg-white/10 border border-white/20 rounded-[8px] px-4 py-3 text-white text-[12px] md:text-[14px] placeholder:text-white/50 outline-none"
          />
        </div>

        <button className="w-full py-3 bg-white text-black text-[14px] md:text-[16px] font-[700] rounded-[8px]">
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
}

export default FindPassword;
