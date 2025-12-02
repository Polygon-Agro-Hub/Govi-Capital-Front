'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, clearError } from '@/store/slices/authSlice';
import { AppDispatch, RootState } from '@/store/index';
import { investmentLogin } from '@/services/auth-service';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Phone, Lock } from 'lucide-react';
import left from '@/public/loginImg/leftImgLogin.png';
import bg from '@/public/loginImg/loginbg.png';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, error } = useSelector((state: RootState) => state.auth);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!phoneNumber || !password) {
      setValidationError('Please enter both phone number and password');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setValidationError('Phone number must be in format 07X XXXX XXX');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Call the service directly
      const response = await investmentLogin({ phoneNumber, password });

      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('tokenExpiration', response.tokenExpiration.toString());
        localStorage.setItem('userData', JSON.stringify(response.userData));
      }

      // Dispatch to Redux store
      dispatch(setAuth({
        user: response.userData,
        token: response.token,
        tokenExpiration: response.tokenExpiration,
      }));

      console.log('Login successful');
      alert('Login successful!');
      router.push('/');
    } catch (err: any) {
      console.error('Login failed:', err);
      setValidationError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
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

      {/* Decorative Dots - Left Side */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white/40 rounded-full" />
        ))}
      </div>

      {/* Decorative Dots - Top Right */}
      <div className="absolute top-12 right-12 hidden lg:flex gap-3 z-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white/40 rounded-full" />
        ))}
      </div>

      {/* Decorative Dots - Bottom Right */}
      <div className="absolute bottom-12 right-12 hidden lg:flex gap-2 z-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white/30 rounded-full" />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row items-stretch w-full max-w-[1400px] lg:h-[600px] shadow-2xl rounded-3xl overflow-hidden">
          
          {/* Left Side - Welcome Section */}
          <div className="flex flex-col items-center justify-center flex-1 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-6 sm:px-12 lg:px-16 py-8 sm:py-12">
            {/* Illustration Image */}
            <div className="mb-6 sm:mb-8 relative w-full max-w-[280px] sm:max-w-sm md:max-w-md">
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg">Welcome!</h1>
              <p className="text-sm sm:text-base lg:text-lg text-white/95 leading-relaxed px-4">
                Get your assets in each project as stocks.
                <br />
                Get your return daily / monthly.
              </p>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="flex-1 flex items-center justify-center bg-white px-6 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-12">
            <div className="w-full max-w-md">
              <div className="mb-6 sm:mb-8 lg:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-3 sm:mb-4">Log In</h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Create Account
                  </Link>
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">It will take less than a minute.</p>
              </div>

              {(error || validationError) && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-xs sm:text-sm text-red-600">{error || validationError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="Phone Number (e.g. 07X XXXX XXX)"
                      className="w-full pl-12 sm:pl-14 pr-4 sm:pr-5 py-3 sm:py-3.5 lg:py-4 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm sm:text-base text-gray-900 placeholder-gray-400 bg-gray-100"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-12 sm:pl-14 pr-12 sm:pr-14 py-3 sm:py-3.5 lg:py-4 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm sm:text-base text-gray-900 placeholder-gray-400 bg-gray-100"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center"
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900 hover:text-gray-700" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900 hover:text-gray-700" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1.5 sm:gap-2"
                  >
                    <span className="text-blue-600">ℹ️</span>
                    Forgot your Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-3.5 lg:py-4 px-4 sm:px-6 rounded-xl transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl text-base sm:text-lg"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Logging in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}