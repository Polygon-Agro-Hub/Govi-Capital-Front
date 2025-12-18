'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { verifyOTP, sendOTPInSignup, investmentRegister } from '@/services/auth-service';
import left from '@/public/otpImg/left.png';
import bg from '@/public/loginImg/loginbg.png';

interface OTPVerificationPageProps {
    phoneNumber: string;
    referenceId: string;
    registrationData: {
        title: string;
        userName: string;
        phoneNumber: string;
        nic: string;
        email: string;
        address: string;
        password: string;
        confirmPassword: string;
    };
    onVerificationFailure: () => void;
    onResendOTP: (newReferenceId: string) => void;
}

export default function OTPVerificationPage({
    phoneNumber,
    referenceId,
    registrationData,
    onVerificationFailure,
    onResendOTP
}: OTPVerificationPageProps) {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [currentReferenceId, setCurrentReferenceId] = useState(referenceId);

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];

    useEffect(() => {
        // Focus first input on mount
        inputRefs[0].current?.focus();
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 4) {
            inputRefs[index + 1].current?.focus();
            setFocusedIndex(index + 1);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
            setFocusedIndex(index - 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 5);

        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length && i < 5; i++) {
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);

        // Focus last filled input or next empty one
        const nextIndex = Math.min(pastedData.length, 4);
        inputRefs[nextIndex].current?.focus();
        setFocusedIndex(nextIndex);
    };

    const handleVerify = async () => {
        const otpCode = otp.join('');

        if (otpCode.length !== 5) {
            setError('Please enter all 5 digits');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Step 1: Verify OTP
            const verifyResponse = await verifyOTP(otpCode, currentReferenceId);

            console.log('OTP Verification Response:', verifyResponse);

            if (verifyResponse.statusCode === '1000') {
                // OTP verified successfully, now register the user
                try {
                    const registerResponse = await investmentRegister(registrationData);

                    console.log('Registration successful:', registerResponse);
                    alert('Account created successfully! Please login with your credentials.');
                    router.push('/login');
                } catch (regErr: any) {
                    console.error('Registration failed:', regErr);
                    setError(regErr.message || 'Registration failed. Please try again.');
                }
            } else if (verifyResponse.statusCode === '1001') {
                setError('Invalid OTP. Please try again.');
            } else if (verifyResponse.statusCode === '1002' || verifyResponse.statusCode === '1003') {
                setError('OTP has expired. Please request a new one.');
            } else {
                setError('Verification failed. Please try again.');
            }
        } catch (err: any) {
            console.error('OTP verification error:', err);
            setError(err.message || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        setLoading(true);
        setError('');

        try {
            // Extract phone number without country code
            const phoneOnly = phoneNumber.replace('+94', '');

            // Resend OTP
            const response = await sendOTPInSignup(phoneOnly, '+94');

            if (response && response.referenceId) {
                setCurrentReferenceId(response.referenceId);
                onResendOTP(response.referenceId);

                setTimer(60);
                setCanResend(false);
                setOtp(['', '', '', '', '']);
                inputRefs[0].current?.focus();
                setFocusedIndex(0);

                alert('OTP has been resent to your phone number');
            } else {
                setError('Failed to resend OTP. Please try again.');
            }
        } catch (err: any) {
            console.error('Resend OTP error:', err);
            setError(err.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-inter">
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
                <div className="flex flex-col lg:flex-row items-stretch w-full max-w-[1400px] min-h-[700px] md:min-h-[750px] lg:h-[700px] shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden">

                    {/* Left Side - Welcome Section */}
                    <div className="flex flex-col items-center justify-between flex-1 px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 lg:py-16 font-inter" style={{ background: 'linear-gradient(to bottom right, #0A6DFF, #1625DD)' }}>
                        {/* Illustration Image */}
                        <div className="flex-1 flex items-center justify-center w-full">
                            <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-md lg:max-w-lg">
                                <Image
                                    src={left}
                                    alt="Investment Dashboard Illustration"
                                    width={500}
                                    height={350}
                                    className="object-contain drop-shadow-2xl w-full h-auto"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="text-left w-full mt-2 lg:mt-0">
                            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-inter font-semibold mb-3 sm:mb-4 text-white drop-shadow-lg">Almost Done!</h1>
                            <p className="text-sm sm:text-base md:text-base lg:text-lg text-white/95 leading-relaxed font-inter">
                                Just one quick step! Check your messages
                                <br />
                                and drop in the code.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - OTP Verification Card */}
                    <div className="flex-1 flex items-center justify-center bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12 overflow-y-auto max-h-screen lg:max-h-none font-inter">
                        <div className="w-full max-w-md h-full flex flex-col justify-center">
                            <div className="mb-6 sm:mb-8 md:mb-10">
                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-600 mb-3 sm:mb-4 font-inter">Verify Your Account!</h2>
                                <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-2 font-inter">
                                    We have sent an OTP Code to: <span className="font-semibold text-gray-900 font-inter">{phoneNumber}</span>
                                </p>
                            </div>

                            {error && (
                                <div className="mb-5 sm:mb-6 md:mb-8 p-2.5 sm:p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg md:rounded-xl">
                                    <p className="text-[10px] sm:text-xs md:text-sm text-red-600 font-inter">{error}</p>
                                </div>
                            )}

                            {/* OTP Input Boxes */}
                            <div className="mb-8 sm:mb-10 md:mb-12">
                                <div className="flex gap-3 sm:gap-4 justify-start">
                                    {otp.map((digit, index) => (
                                        <div key={index} className="relative">
                                            <input
                                                ref={inputRefs[index]}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={index === 0 ? handlePaste : undefined}
                                                onFocus={() => setFocusedIndex(index)}
                                                disabled={loading}
                                                className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-center text-2xl sm:text-3xl md:text-4xl font-light bg-gray-100 rounded-lg md:rounded-xl transition-all outline-none font-inter
                          ${focusedIndex === index ? 'border-2 border-blue-500' : 'border-2 border-transparent'}
                          disabled:opacity-50 disabled:cursor-not-allowed`}
                                                style={{
                                                    color: 'transparent',
                                                    caretColor: '#3B82F6'
                                                }}
                                            />
                                            {/* X placeholder */}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span className={`text-2xl sm:text-3xl md:text-4xl font-light font-inter ${digit ? 'text-gray-900' : 'text-gray-400'}`}>
                                                    {digit || 'X'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Resend Timer */}
                            <div className="mb-8 sm:mb-10 text-left">
                                <p className="text-xs sm:text-sm md:text-base font-inter">
                                    {canResend ? (
                                        <button
                                            onClick={handleResend}
                                            disabled={loading}
                                            className="text-blue-600 hover:text-blue-700 font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed font-inter"
                                        >
                                            Resend OTP
                                        </button>
                                    ) : (
                                        <span className="text-gray-600 font-inter">
                                            Resend in <span className="font-semibold text-blue-600 font-inter">{formatTime(timer)}</span>
                                        </span>
                                    )}
                                </p>
                            </div>

                            {/* Verify Button */}
                            <button
                                onClick={handleVerify}
                                disabled={loading || otp.some(d => !d)}
                                className="w-full bg-[#0C63FA] hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 md:py-3.5 lg:py-4 px-4 rounded-lg md:rounded-xl transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg font-inter"
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
                                        Verifying...
                                    </>
                                ) : (
                                    'Verify'
                                )}
                            </button>

                            {/* Back to Registration */}
                            <button
                                onClick={onVerificationFailure}
                                className="w-full mt-4 sm:mt-5 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base font-inter"
                            >
                                Back to Registration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}