'use client';
import React, { useState } from 'react';
import Image from 'next/image';

type Props = {
    onNext: (data: { nameWithInitials: string; nic: string; nicFront?: File | null; nicBack?: File | null }) => void;
    onCancel: () => void;
    currentStep: number;
};

const StepPersonalInfo: React.FC<Props> = ({ onNext, onCancel, currentStep }) => {
    const [nameWithInitials, setName] = useState('');
    const [nic, setNic] = useState('');
    const [nicFront, setNicFront] = useState<File | null>(null);
    const [nicBack, setNicBack] = useState<File | null>(null);
    const [nicFrontPreview, setNicFrontPreview] = useState<string | null>(null);
    const [nicBackPreview, setNicBackPreview] = useState<string | null>(null);
    const [isUploadingFront, setIsUploadingFront] = useState(false);
    const [isUploadingBack, setIsUploadingBack] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const sriLankanNICRegex = /^([0-9]{9}[vVxX]|[0-9]{12})$/;

    const validateAndReadImage = (
        file: File,
        setFile: (f: File | null) => void,
        setPreview: (p: string | null) => void,
        setUploading: (v: boolean) => void,
        errorKey: string
    ) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        if (!allowedTypes.includes(file.type)) {
            setErrors(prev => ({
                ...prev,
                [errorKey]: 'Only JPG, JPEG or PNG images are allowed',
            }));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({
                ...prev,
                [errorKey]: 'File size must be less than 5MB',
            }));
            return;
        }

        setUploading(true);
        setFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
            setUploading(false);
            setErrors(prev => ({ ...prev, [errorKey]: '' }));
        };

        reader.readAsDataURL(file);
    };

    const handleFrontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        validateAndReadImage(
            file,
            setNicFront,
            setNicFrontPreview,
            setIsUploadingFront,
            'nicFront'
        );
    };

    const handleBackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        validateAndReadImage(
            file,
            setNicBack,
            setNicBackPreview,
            setIsUploadingBack,
            'nicBack'
        );
    };

    const removeFrontImage = () => {
        setNicFront(null);
        setNicFrontPreview(null);
        setErrors(prev => ({ ...prev, nicFront: '' }));
    };

    const removeBackImage = () => {
        setNicBack(null);
        setNicBackPreview(null);
        setErrors(prev => ({ ...prev, nicBack: '' }));
    };

    const handleNext = () => {
        const newErrors: { [key: string]: string } = {};

        if (!nameWithInitials.trim())
            newErrors.nameWithInitials = 'Name with initials is required';

        if (!nic.trim())
            newErrors.nic = 'NIC number is required';
        else if (!sriLankanNICRegex.test(nic.trim()))
            newErrors.nic = 'Invalid NIC number';

        if (!nicFront)
            newErrors.nicFront = 'NIC front image is required';

        if (!nicBack)
            newErrors.nicBack = 'NIC back image is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onNext({ nameWithInitials, nic, nicFront, nicBack });
    };

    return (
        <div className="p-6 sm:p-8 lg:p-10">
            {/* Header */}
            <h2 className="text-center text-xl font-semibold text-gray-800 mb-8">Please fill out to proceed!</h2>

            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">1</div>
                        <span className="text-xs text-blue-600 font-medium mt-2">Personal Info</span>
                    </div>
                    <div className="w-12 sm:w-20 h-0.5 bg-gray-300"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold text-sm">2</div>
                        <span className="text-xs text-gray-500 font-medium mt-2">Shares Info</span>
                    </div>
                    <div className="w-12 sm:w-20 h-0.5 bg-gray-300"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold text-sm">3</div>
                        <span className="text-xs text-gray-500 font-medium mt-2">Upload Bank Slip</span>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Buyer information</h3>
                <p className="text-sm text-blue-600 mb-6">Enter required personal and contact information of yours below.</p>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name with initials</label>
                        <input
                            type="text"
                            className={`w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.nameWithInitials ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={nameWithInitials}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errors.nameWithInitials) {
                                    setErrors({ ...errors, nameWithInitials: '' });
                                }
                            }}
                        />
                        {errors.nameWithInitials && (
                            <p className="text-xs text-red-500 mt-1">{errors.nameWithInitials}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">NIC Number</label>
                        <input
                            type="text"
                            className={`w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.nic ? 'border-red-500' : 'border-gray-300'
                                }`}
                            value={nic}
                            onChange={(e) => {
                                setNic(e.target.value);
                                if (errors.nic) {
                                    setErrors({ ...errors, nic: '' });
                                }
                            }}
                        />
                        {errors.nic && (
                            <p className="text-xs text-red-500 mt-1">{errors.nic}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">NIC Front Image</label>
                            {!nicFrontPreview ? (
                                <label className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer block ${errors.nicFront ? 'border-red-500' : 'border-gray-300'
                                    }`}>
                                    <div className="flex flex-col items-center">
                                        {isUploadingFront ? (
                                            <div className="w-12 h-12 mb-2">
                                                <svg className="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </div>
                                        ) : (
                                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                        <p className="text-xs text-gray-600 mb-1">Drop your image here, or browse</p>
                                        <p className="text-xs text-gray-400">Supports: JPG, JPEG, PNG</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        className="hidden"
                                        onChange={handleFrontUpload}
                                    />
                                </label>
                            ) : (
                                <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                                    <Image
                                        src={nicFrontPreview}
                                        alt="NIC Front"
                                        width={300}
                                        height={200}
                                        className="w-full h-48 object-cover"
                                    />
                                    <button
                                        onClick={removeFrontImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                                        type="button"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    {nicFront && <p className="text-xs text-green-600 p-2 bg-white">✓ {nicFront.name}</p>}
                                </div>
                            )}
                            {errors.nicFront && (
                                <p className="text-xs text-red-500 mt-1">{errors.nicFront}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">NIC Back Image</label>
                            {!nicBackPreview ? (
                                <label className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer block ${errors.nicBack ? 'border-red-500' : 'border-gray-300'
                                    }`}>
                                    <div className="flex flex-col items-center">
                                        {isUploadingBack ? (
                                            <div className="w-12 h-12 mb-2">
                                                <svg className="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </div>
                                        ) : (
                                            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                        <p className="text-xs text-gray-600 mb-1">Drop your image here, or browse</p>
                                        <p className="text-xs text-gray-400">Supports: JPG, JPEG, PNG</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        className="hidden"
                                        onChange={handleBackUpload}
                                    />
                                </label>
                            ) : (
                                <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                                    <Image
                                        src={nicBackPreview}
                                        alt="NIC Back"
                                        width={300}
                                        height={200}
                                        className="w-full h-48 object-cover"
                                    />
                                    <button
                                        onClick={removeBackImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                                        type="button"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    {nicBack && <p className="text-xs text-green-600 p-2 bg-white">✓ {nicBack.name}</p>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StepPersonalInfo;
