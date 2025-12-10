'use client';
import UserDetails from '@/components/card-details-components/UserDetails';
import InvestmentInformation from '@/components/card-details-components/InvestmentInformation';
import ShareInformation from '@/components/card-details-components/ShareInformation';
import React from 'react';

const Page = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - User Details */}
                    <div className="lg:col-span-1">
                        <UserDetails />
                    </div>

                    {/* Right Column - Investment and Share Information */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <InvestmentInformation />
                        <ShareInformation />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;