'use client';
import React from 'react';
import { InvestmentRequestInfo } from '@/services/investment-service';
import { useRouter } from 'next/navigation';

interface Props {
    user: InvestmentRequestInfo;
}

const ShareInformation: React.FC<Props> = ({ user }) => {
    const router = useRouter();

    const formatCurrency = (value: number) =>
        value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const totalShares = Number(user.defineShares || 0);
    const totalValue = Number(user.totValue || 0);
    const oneSharePrice = Number(user.oneShare || (totalShares ? totalValue / totalShares : 0));
    const investedShares = Number(user.fillShares || 0);
    const sharesLeft = Math.max(totalShares - investedShares, 0);
    const investedAmount = investedShares * oneSharePrice;
    const investedPercent = totalValue > 0 ? Math.round((investedAmount / totalValue) * 100) : 0;

    const dashArray = 2 * Math.PI * 40;
    const dashOffset = dashArray * (1 - investedPercent / 100);

    const openPopup = () => {
        const reqId = Number(user.requestId);
        if (!Number.isFinite(reqId)) {
            console.error('No valid requestId available');
            return;
        }
        const query = new URLSearchParams({
            requestId: String(reqId),
            popup: '1',
        }).toString();
        router.push(`/investment-details?${query}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">Shares' Information</h2>
                <button onClick={openPopup} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-base shadow-sm">
                    Invest Now
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 border border-[#E5E7EB] rounded-xl py-6 px-4 flex flex-col items-center">
                    <span className="text-[#6B8AB8] text-sm mb-4">Shares Taken</span>
                    <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="#E5E7EB" strokeWidth="10" fill="none" />
                            <circle
                                cx="48"
                                cy="48"
                                r="40"
                                stroke="#3B82F6"
                                strokeWidth="10"
                                fill="none"
                                strokeDasharray={`${dashArray}`}
                                strokeDashoffset={`${dashOffset}`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-semibold text-gray-800">{investedPercent}%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 border border-[#E5E7EB] rounded-xl py-6 px-4 flex flex-col items-center">
                    <span className="text-[#6B8AB8] text-sm mb-3">Shares Left</span>
                    <span className="text-5xl font-semibold text-black">{sharesLeft}</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-[#6B8AB8] text-sm">Total Capital Requirement:</span>
                    <span className="text-black text-sm font-medium">LKR {formatCurrency(totalValue)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-[#6B8AB8] text-sm">Share Structure:</span>
                    <span className="text-black text-sm font-medium">
                        {totalShares} Shares x LKR {formatCurrency(oneSharePrice)} per share
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-[#6B8AB8] text-sm">Minimum Investment:</span>
                    <span className="text-black text-sm font-medium">
                        {Number(user.minShare || 0)} Shares (LKR {formatCurrency(Number(user.minShare || 0) * oneSharePrice)})
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-[#6B8AB8] text-sm">Maximum per Investor:</span>
                    <span className="text-black text-sm font-medium">
                        {Number(user.maxShare || 0)} Shares (LKR {formatCurrency(Number(user.maxShare || 0) * oneSharePrice)})
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ShareInformation;
