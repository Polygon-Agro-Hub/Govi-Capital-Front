'use client';
import React, { useState } from 'react';

type Props = {
    oneSharePrice: number;
    minShare: number;
    onNext: (data: { shares: number; totalInvestment: number; expectedReturn: number; irr: number }) => void;
    onPrev: () => void;
    currentStep: number;
};

const StepSharesInfo: React.FC<Props> = ({ oneSharePrice, minShare, onNext, onPrev, currentStep }) => {
    const [shares, setShares] = useState(minShare || 1);
    const [error, setError] = useState('');

    const totalInvestment = shares * oneSharePrice;
    const expectedReturn = totalInvestment;
    const irr = expectedReturn;

    const handleSharesChange = (value: number) => {
        setShares(value);
        if (value < minShare) {
            setError(`You must enter ${minShare} or more shares.`);
        } else {
            setError('');
        }
    };

    const handleNext = () => {
        if (shares < minShare) {
            setError(`You must enter ${minShare} or more shares.`);
            return;
        }
        onNext({ shares, totalInvestment, expectedReturn, irr });
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
                    <div className="w-12 sm:w-20 h-0.5 bg-gray-300"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold text-sm">3</div>
                        <span className="text-xs text-gray-500 font-medium mt-2">Upload Bank Slip</span>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Shares Information</h3>
                <p className="text-sm text-blue-600 mb-6">Fill out below fields.</p>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Shares</label>
                        <input
                            type="number"
                            min={minShare}
                            value={shares}
                            onChange={(e) => handleSharesChange(Number(e.target.value))}
                            className={`w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                        />
                        {error && (
                            <p className="text-xs text-red-500 mt-1.5">{error}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Your Total Investment <span className="text-gray-400 text-xs">(Auto-fill)</span></label>
                        <input
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-700 cursor-not-allowed"
                            value={`LKR ${totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Your Expected Return of Investment <span className="text-gray-400 text-xs">(Auto-fill)</span></label>
                        <input
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-700 cursor-not-allowed"
                            value={`LKR ${expectedReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Your Internal Rate of Return <span className="text-gray-400 text-xs">(Auto-fill)</span></label>
                        <input
                            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-700 cursor-not-allowed"
                            value={`LKR ${irr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                            readOnly
                        />
                    </div>
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
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StepSharesInfo;
