'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Phone, Lock, User, Mail, MapPin, CreditCard, ChevronDown } from 'lucide-react';
import { investmentRegister } from '@/services/auth-service';
import left from '@/public/loginImg/leftImgLogin.png';
import bg from '@/public/loginImg/loginbg.png';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    phoneNumber: '',
    nicNumber: '',
    email: '',
    address: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showTitleDropdown, setShowTitleDropdown] = useState(false);

  const titles = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Ms', label: 'Ms' },
    { value: 'Dr', label: 'Dr' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTitleSelect = (title: string) => {
    setFormData(prev => ({ ...prev, title }));
    setShowTitleDropdown(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    // Only allow if starts with 7 and max 9 digits
    if (value === '' || (value[0] === '7' && value.length <= 9)) {
      setFormData(prev => ({ ...prev, phoneNumber: value }));
    }
  };

  const handleNicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    // Allow digits and 'V' at the end - either 12 digits OR 10 digits with V
    if (/^[0-9]{0,12}$/.test(value) || /^[0-9]{0,10}V?$/.test(value)) {
      setFormData(prev => ({ ...prev, nicNumber: value }));
    }
  };

  const validateForm = () => {
    if (!formData.title || !formData.name || !formData.phoneNumber || !formData.nicNumber || 
        !formData.email || !formData.address || !formData.password) {
      return 'Please fill in all fields';
    }

    // Phone number validation: must start with 7 and be exactly 9 digits
    const phoneRegex = /^7\d{8}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      return 'Phone number must start with 7 and be 9 digits long';
    }

    // NIC validation: either 12 digits OR 10 digits followed by 'V'
    const nicRegex12 = /^\d{12}$/;
    const nicRegex10 = /^\d{9}V$/;
    if (!nicRegex12.test(formData.nicNumber) && !nicRegex10.test(formData.nicNumber)) {
      return 'NIC must be either 12 digits or 10 digits followed by V';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address';
    }

    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters';
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/;
    if (!passwordRegex.test(formData.password)) {
      return 'Password must include a number, a letter, and a special character';
    }

    return null;
  };

  const handleSubmit = async () => {
    setValidationError('');

    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }

    setLoading(true);

    try {
      const response = await investmentRegister({
        title: formData.title,
        userName: formData.name,
        phoneNumber: formData.phoneNumber,
        nic: formData.nicNumber,
        email: formData.email,
        address: formData.address,
        password: formData.password,
        confirmPassword: formData.password // Send same as password since we removed the field
      });

      console.log('Registration successful:', response);
      alert('Registration successful! Please login with your credentials.');
      router.push('/login');
    } catch (err: any) {
      console.error('Registration failed:', err);
      setValidationError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <Image
        src={bg}
        alt="Background"
        fill
        className="object-cover"
        priority
        quality={100}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row items-stretch w-full max-w-[1400px] min-h-[700px] md:min-h-[750px] shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden">
          
          {/* Left Side - Welcome Section */}
          <div className="flex flex-col items-center justify-center flex-1 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-4 sm:px-6 md:px-12 lg:px-16 py-6 sm:py-8 md:py-12">
            {/* Illustration Image */}
            <div className="mb-4 sm:mb-6 md:mb-8 relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-sm">
              <Image
                src={left}
                alt="Investment Dashboard Illustration"
                width={450}
                height={300}
                className="object-contain drop-shadow-2xl w-full h-auto"
                priority
              />
            </div>

            {/* Welcome Text */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">Join with us!</h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/95 leading-relaxed px-2 sm:px-4">
                Get your assets in each project as stocks.
                <br />
                Get your return daily / monthly.
              </p>
            </div>
          </div>

          {/* Right Side - Registration Card */}
          <div className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12 overflow-y-auto max-h-screen lg:max-h-none">
            <div className="w-full max-w-md">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-2 sm:mb-3 md:mb-4">Register Today!</h2>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Login here
                  </Link>
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-1 sm:mt-2">Get instant access to your dashboard.</p>
              </div>

              {validationError && (
                <div className="mb-3 sm:mb-4 md:mb-6 p-2.5 sm:p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg md:rounded-xl">
                  <p className="text-[10px] sm:text-xs md:text-sm text-red-600">{validationError}</p>
                </div>
              )}

              <div className="space-y-3 sm:space-y-4">
                {/* Title and Name - 1:3 ratio */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {/* Custom Title Dropdown */}
                  <div className="w-full sm:w-1/4 relative">
                    <button
                      type="button"
                      onClick={() => setShowTitleDropdown(!showTitleDropdown)}
                      disabled={loading}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-none rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xs sm:text-sm text-gray-900 bg-gray-100 flex items-center justify-between hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className={formData.title ? 'text-gray-900' : 'text-gray-400'}>
                        {formData.title || 'Title'}
                      </span>
                      <ChevronDown className={`h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 transition-transform ${showTitleDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {showTitleDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 sm:mt-2 bg-white border border-gray-200 rounded-lg md:rounded-xl shadow-lg z-50 overflow-hidden">
                        {titles.map((title) => (
                          <button
                            key={title.value}
                            type="button"
                            onClick={() => handleTitleSelect(title.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm text-gray-900 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {title.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-full sm:w-3/4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400" />
                      </div>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name with Initials"
                        className="w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-none rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xs sm:text-sm text-gray-900 placeholder-gray-400 bg-gray-100"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Phone Number with Country Code - 1:3 ratio */}
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-full sm:w-1/4">
                    <input
                      type="text"
                      value="+94"
                      readOnly
                      className="w-full px-2 sm:px-3 py-2.5 sm:py-3 border-none rounded-lg md:rounded-xl text-xs sm:text-sm text-gray-900 bg-gray-100 text-center font-medium"
                    />
                  </div>
                  <div className="w-full sm:w-3/4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400" />
                      </div>
                      <input
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="7XXXXXXXX"
                        maxLength={9}
                        className="w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-none rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xs sm:text-sm text-gray-900 placeholder-gray-400 bg-gray-100"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* NIC Number and Email */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400" />
                      </div>
                      <input
                        name="nicNumber"
                        type="text"
                        value={formData.nicNumber}
                        onChange={handleNicChange}
                        placeholder="NIC (12 digits or 10+V)"
                        maxLength={12}
                        className="w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-none rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xs sm:text-sm text-gray-900 placeholder-gray-400 bg-gray-100"
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-none rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xs sm:text-sm text-gray-900 placeholder-gray-400 bg-gray-100"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                    <input
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address"
                      className="w-full pl-9 sm:pl-11 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border-none rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xs sm:text-sm text-gray-900 placeholder-gray-400 bg-gray-100"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="w-full pl-9 sm:pl-11 md:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border-none rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-xs sm:text-sm text-gray-900 placeholder-gray-400 bg-gray-100"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-900 hover:text-gray-700" />
                      ) : (
                        <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-900 hover:text-gray-700" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="flex items-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#52739B] p-2 sm:p-2.5 md:p-3 rounded-lg">
                  <div className="mt-0.5 text-sm sm:text-base">ℹ️</div>
                  <p>Include at least 8 characters and include a number, a letter, and a special character.</p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 md:py-3.5 px-4 rounded-lg md:rounded-xl transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}