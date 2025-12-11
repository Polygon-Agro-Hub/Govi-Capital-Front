'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import UserDetails from '@/components/card-details-components/UserDetails';
import InvestmentInformation from '@/components/card-details-components/InvestmentInformation';
import ShareInformation from '@/components/card-details-components/ShareInformation';
import { getInvestmentRequestInfo, type InvestmentRequestInfo, type OngoingCultivation } from '@/services/investment-service';

const Page = () => {
    const params = useSearchParams();
    const requestId = params.get('requestId');
    const token = useSelector((state: RootState) => state.auth.token);

    const [info, setInfo] = useState<InvestmentRequestInfo | null>(null);
    const [ongoingCultivation, setOngoingCultivation] = useState<OngoingCultivation[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!requestId || !token) return;

            try {
                const res = await getInvestmentRequestInfo(requestId, token);
                if (res) {
                    setInfo(res.investmentInfo);
                    setOngoingCultivation(res.ongoingCultivations);
                }
            } catch (error) {
                console.error('Failed to load data', error);
            }
        };

        fetchData();
    }, [requestId, token]);

    if (!info) return <p className="text-center py-20">Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-5">
                        <UserDetails user={info} cultivation={ongoingCultivation} />
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <InvestmentInformation user={info} />
                        <ShareInformation user={info} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
