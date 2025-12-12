'use client';
import React, { useState } from 'react';

type Props = {
    onPrev: () => void;
    onSubmit: () => void | Promise<void>;
    currentStep: number;
    onFileChange?: (file: File | null) => void;
    submitting?: boolean;
};

const StepUploadSlip: React.FC<Props> = ({ onPrev, onSubmit, currentStep, onFileChange, submitting = false }) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (f: File | null) => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }

        setFile(f);
        onFileChange?.(f);

        if (!f) return;

        const isImage = f.type.startsWith('image/');
        if (isImage) {
            const url = URL.createObjectURL(f);
            setPreviewUrl(url);
        }
    };

    const removeFile = () => {
        setFile(null);
        onFileChange?.(null);
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
                    <div className="w-12 sm:w-20 h-0.5 bg-blue-600"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">2</div>
                        <span className="text-xs text-blue-600 font-medium mt-2">Shares Info</span>
                    </div>
                    <div className="w-12 sm:w-20 h-0.5 bg-blue-600"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">3</div>
                        <span className="text-xs text-blue-600 font-medium mt-2">Upload Bank Slip</span>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Information</h3>
                <p className="text-sm text-blue-600 mb-6">Please make your payment and upload your slip here.</p>

                {/* Bank Details */}
                <div className="bg-gray-50 rounded-lg p-5 mb-6 border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-3">Please make your payment using the bank details below:</p>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <span className="text-gray-600 text-sm mr-2">•</span>
                            <span className="text-sm text-gray-700"><span className="font-semibold">Account Number:</span> 887793066</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-gray-600 text-sm mr-2">•</span>
                            <span className="text-sm text-gray-700"><span className="font-semibold">Account Holder:</span> Agro Benefit Lanka Pvt Ltd</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-gray-600 text-sm mr-2">•</span>
                            <span className="text-sm text-gray-700"><span className="font-semibold">Bank:</span> Bank of Ceylon</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-gray-600 text-sm mr-2">•</span>
                            <span className="text-sm text-gray-700"><span className="font-semibold">Branch:</span> Kollupitiya</span>
                        </li>
                    </ul>
                </div>

                {/* Upload Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Upload Bank Slip</label>

                    {!file ? (
                        <label htmlFor="bankSlipInput" className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer block">
                            <div className="flex flex-col items-center">
                                <svg className="w-16 h-16 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="text-sm text-gray-700 font-medium mb-1">Drop your image or PDF here, or browse</p>
                                <p className="text-xs text-gray-400">Supports: JPG, JPEG, PNG, and PDF</p>
                            </div>
                        </label>
                    ) : (
                        <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                            {previewUrl ? (
                                // Image preview
                                <img src={previewUrl} alt="Bank Slip" className="w-full h-48 object-cover" />
                            ) : (
                                <div className="p-4 flex items-center gap-3">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 11h10M7 15h10" />
                                    </svg>
                                    <span className="text-sm text-gray-700 font-medium">{file.name}</span>
                                </div>
                            )}
                            <button
                                onClick={removeFile}
                                type="button"
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}

                    <input
                        id="bankSlipInput"
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                    onClick={onPrev}
                    className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
                >
                    Previous
                </button>
                <button
                    onClick={onSubmit}
                    disabled={submitting}
                    className={`px-6 py-2.5 rounded-lg text-white font-medium transition-colors shadow-sm ${submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default StepUploadSlip;
