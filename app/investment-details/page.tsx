'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import UserDetails from '@/components/card-details-components/UserDetails';
import InvestmentInformation from '@/components/card-details-components/InvestmentInformation';
import ShareInformation from '@/components/card-details-components/ShareInformation';
import { getInvestmentRequestInfo, type InvestmentRequestInfo, type OngoingCultivation } from '@/services/investment-service';
import Popup from '@/components/investment-details-popup/Popup';

const Page = () => {
    const router = useRouter();
    const params = useSearchParams();
    const requestId = params.get('requestId');
    const token = useSelector((state: RootState) => state.auth.token);

    const showPopup = params.get('popup') === '1';

    const [info, setInfo] = useState<InvestmentRequestInfo | null>(null);
    const [ongoingCultivation, setOngoingCultivation] = useState<OngoingCultivation[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!requestId || !token) return;

            try {
                const res = await getInvestmentRequestInfo(requestId, token);
                if (res && res.investmentInfo) {
                    const investmentInfo = {
                        ...res.investmentInfo,
                        requestId: res.investmentInfo.requestId || Number(requestId)
                    } as InvestmentRequestInfo;
                    setInfo(investmentInfo);
                    setOngoingCultivation(res.ongoingCultivations);
                }
            } catch (error) {
                console.error('Failed to load data', error);
            }
        };

        fetchData();
    }, [requestId, token]);

    if (!info) return <p className="text-center py-20">Loading...</p>;

    const closePopup = () => {
        const qs = new URLSearchParams({ requestId: String(info.requestId) });
        router.push(`/investment-details?${qs.toString()}`);
    };

    const totalShares = Number((info as any).defineShares || 0);
    const totalValue = Number((info as any).totValue || 0);
    const computedOneShare = Number((info as any).oneShare || (totalShares > 0 ? totalValue / totalShares : 0));
    const computedMinShare = Number((info as any).minShare || 1);

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

            {showPopup && (
                <Popup requestId={Number(info.requestId)} oneSharePrice={computedOneShare} minShare={computedMinShare} />
            )}
        </div>
    );
};

export default Page;
