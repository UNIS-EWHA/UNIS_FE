import { useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';

function Application() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    major: '',
    part: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    portfolio: null,
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            formData={formData}
            onNext={(data) => {
              updateFormData(data);
              setStep(2);
            }}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            onNext={(data) => {
              updateFormData(data);
              setStep(3);
            }}
            onBack={() => setStep(1)}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        );
      case 4:
        return <Step4 />;
      default:
        return null;
    }
  };

  return <div className="px-5 md:px-15 lg:px-45 py-8">{renderStep()}</div>;
}

export default Application;
