function ProgressBar({ currentStep }) {
  const steps = ['인적사항', '세부 정보', '확인 및 제출'];

  return (
    <div className="flex items-center justify-center gap-4 mb-8 lg:mb-12">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;

        return (
          <div key={label} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-[700] border-2 ${
                  isActive
                    ? 'bg-blue-primary border-blue-primary text-white'
                    : isDone
                      ? 'bg-transparent border-white/30 text-white/30'
                      : 'bg-transparent border-white/30 text-white/30'
                }`}
              >
                {stepNum}
              </div>
              <p
                className={`text-[10px] lg:text-[12px] ${isActive ? 'text-white' : 'text-white/30'}`}
              >
                {label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className="w-8 lg:w-16 h-[1px] bg-white/20 mb-4" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressBar;
