import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown } from 'lucide-react';
import OnboardingLayout from '../../onboarding/OnboardingLayout';

export default function BasicInfoScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const handleContinue = () => {
    navigate('/questionnaire/behavior-1');
  };

  return (
    <OnboardingLayout totalSteps={3} currentStep={3}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-[28px] font-bold text-gray-900 leading-tight">
            Tell us about you
          </h1>
          <p className="text-[14px] text-gray-500 mt-2">
            Help us personalize your wellness journey.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4 mb-auto mt-6">
          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-bold text-gray-900 mb-2 tracking-wide">
              FULL NAME
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 rounded-[24px] bg-white/70 backdrop-blur-sm text-[16px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B4FDB]/30 shadow-sm border border-gray-200"
            />
          </div>

          {/* Class/Grade */}
          <div>
            <label className="block text-[11px] font-bold text-gray-900 mb-2 tracking-wide">
              CLASS / GRADE
            </label>
            <div className="relative">
              <select
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                className="w-full px-5 py-4 rounded-[24px] bg-white/70 backdrop-blur-sm text-[16px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5B4FDB]/30 shadow-sm border border-gray-200 appearance-none"
              >
                <option value="">Select</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Gender and Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-900 mb-2 tracking-wide">
                GENDER
              </label>
              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-5 py-4 rounded-[24px] bg-white/70 backdrop-blur-sm text-[16px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5B4FDB]/30 shadow-sm border border-gray-200 appearance-none"
                >
                  <option value="">Select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-900 mb-2 tracking-wide">
                AGE
              </label>
              <div className="relative">
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-5 py-4 rounded-[24px] bg-white/70 backdrop-blur-sm text-[16px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5B4FDB]/30 shadow-sm border border-gray-200 appearance-none"
                >
                  <option value="">Select</option>
                  {Array.from({ length: 83 }, (_, i) => i + 10).map((ageVal) => (
                    <option key={ageVal} value={ageVal}>
                      {ageVal}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-6">
          <button
            onClick={handleContinue}
            className="w-full py-5 rounded-[32px] bg-gradient-to-r from-[#5B4FDB] to-[#4F46E5] text-white font-bold text-[18px] shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-200"
          >
            Continue →
          </button>

          {/* Terms */}
          <p className="text-center text-[11px] text-gray-500 mt-4">
            BY CONTINUING, YOU AGREE TO BODHI'S{' '}
            <span className="text-[#5B4FDB] font-semibold">TERMS OF SERVICE</span>{' '}
            AND{' '}
            <span className="text-[#5B4FDB] font-semibold">PRIVACY POLICY</span>
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
}
