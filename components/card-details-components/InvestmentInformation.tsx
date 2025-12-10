'use client';
import React from 'react';

const InvestmentInformation = () => {
    const investmentData = [
        { label: 'Crop :', value: 'Onion' },
        { label: 'Variety :', value: 'Red Onion' },
        { label: 'Certification :', value: 'GAP Farming' },
        { label: 'Extent :', value: '46 Acres' },
        { label: 'Expected Investment :', value: 'LKR 1,000,000.00' },
        { label: 'Expected Yield :', value: '300kg' },
        { label: 'Expected Investment :', value: 'LKR 2,000,000.00' }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 w-full">
            <h2 className="text-xl font-semibold text-black mb-6">
                Investment Request Information
            </h2>
            <div className="space-y-3">
                {investmentData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-normal text-[#6B8AB8]">{item.label}</span>
                        <span className="text-sm font-normal text-black">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvestmentInformation;
