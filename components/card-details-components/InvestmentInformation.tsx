'use client';
import React from 'react';
import { InvestmentRequestInfo } from '@/services/investment-service';

interface Props {
    user: InvestmentRequestInfo;
}

const InvestmentInformation: React.FC<Props> = ({ user }) => {
    const extentText = user.extentac
        ? `${user.extentac} Acres`
        : user.extentha
            ? `${user.extentha} Hectares`
            : '-';

    const safeNumber = (val: number | string | undefined | null) => {
        const n = Number(val);
        return Number.isFinite(n) ? n : 0;
    };

    const rows = [
        { label: 'Crop', value: user.cropNameEnglish || '-' },
        // { label: 'Variety', value: user.varietyNameEnglish || '-' },
        // { label: 'Certification', value: user.srtName || '-' },
        { label: 'Extent', value: extentText },
        { label: 'Expected Investment', value: user.totValue ? `LKR ${safeNumber(user.totValue).toLocaleString()}` : '-' },
        { label: 'Expected Yield', value: user.expectedYield ? `${safeNumber(user.expectedYield)} kg` : '-' },
        { label: 'Expected Investment', value: user.totValue ? `LKR ${safeNumber(user.totValue).toLocaleString()}` : '-' },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 w-full">
            <h2 className="text-xl font-semibold text-black mb-6">Investment Request Information</h2>
            <div className="space-y-3">
                {rows.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm font-normal text-[#6B8AB8]">{item.label}:</span>
                        <span className="text-sm font-normal text-black">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvestmentInformation;
