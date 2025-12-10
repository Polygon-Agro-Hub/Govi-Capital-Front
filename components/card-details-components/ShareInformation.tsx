'use client';
import React from 'react';

const ShareInformation = () => {
    const sharesTaken = 20;

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 w-full">
            {/* Header with Invest Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">
                    Shares' Information
                </h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-base shadow-sm">
                    Invest Now
                </button>
            </div>

            {/* Shares Taken and Left */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Shares Taken */}
                <div className="bg-gray-50 border border-[#E5E7EB] rounded-xl py-6 px-4 flex flex-col items-center justify-center">
                    <span className="text-[#6B8AB8] text-sm font-normal mb-4">Shares Taken</span>
                    <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 transform -rotate-90">
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="#E5E7EB"
                                strokeWidth="10"
                                fill="none"
                            />
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="#3B82F6"
                                strokeWidth="10"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 40}`}
                                strokeDashoffset={`${2 * Math.PI * 40 * (1 - sharesTaken / 100)}`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-semibold text-gray-800">
                                {sharesTaken}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Shares Left */}
                <div className="bg-gray-50 border border-[#E5E7EB] rounded-xl py-6 px-4 flex flex-col items-center justify-center">
                    <span className="text-[#6B8AB8] text-sm font-normal mb-3">Shares Left</span>
                    <span className="text-5xl font-semibold text-black">400</span>
                </div>
            </div>

            {/* Share Details */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-[#6B8AB8] text-sm font-normal">Total Capital Requirement :</span>
                    <span className="text-black font-medium text-sm">LKR 2,000,000.00</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#6B8AB8] text-sm font-normal">Share Structure :</span>
                    <span className="text-black font-medium text-sm">
                        <span className="font-semibold">400</span> Shares x <span className="font-semibold">LKR 5000</span> per share
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#6B8AB8] text-sm font-normal">Minimum Investment :</span>
                    <span className="text-black font-medium text-sm">2 Shares (LKR 10,000.00)</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[#6B8AB8] text-sm font-normal">Maximum per Investor :</span>
                    <span className="text-black font-medium text-sm">40 Shares (LKR 200,000.00)</span>
                </div>
            </div>
        </div>
    );
};
export default ShareInformation;