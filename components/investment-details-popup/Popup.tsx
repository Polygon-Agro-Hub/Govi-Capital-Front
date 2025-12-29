'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import StepPersonalInfo from '@/components/investment-details-popup-components/StepPersonalInfo';
import StepSharesInfo from '@/components/investment-details-popup-components/StepSharesInfo';
import StepUploadSlip from '@/components/investment-details-popup-components/StepUploadSlip';
import { createInvestment, InvestmentSubmitPayload } from '@/services/investment-service';

type PopupProps = {
    requestId: number;
    oneSharePrice: number;
    minShare: number;
};

const Popup: React.FC<PopupProps> = ({ requestId, oneSharePrice, minShare }) => {
    const router = useRouter();
    const token = useSelector((state: RootState) => state.auth.token);

    const [step, setStep] = useState(1);
    const [personal, setPersonal] = useState<{ nameWithInitials: string; nic: string; nicFront?: File | null; nicBack?: File | null } | null>(null);
    const [shares, setShares] = useState<{ shares: number; totalInvestment: number; expectedReturn: number; irr: number } | null>(null);
    const [bankSlip, setBankSlip] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const closePopup = () => {
        const qs = new URLSearchParams({ requestId: String(requestId) });
        router.replace(`/investment-details?${qs.toString()}`);
    };

    const handleSubmit = async () => {
        if (!token || !personal || !shares) {
            console.error('Missing token or form data');
            return;
        }

        try {
            setSubmitting(true);

            const payload: Partial<InvestmentSubmitPayload> = {
                reqId: requestId,
                investerName: personal.nameWithInitials,
                nic: personal.nic,
                shares: shares.shares,
                totInvt: shares.totalInvestment,
                expextreturnInvt: shares.expectedReturn,
                internalRate: shares.irr,
                nicFront: personal.nicFront!,
                nicBack: personal.nicBack!,
                bankSlip: bankSlip!,
            };

            await createInvestment(token, payload);

            closePopup();
        } catch (e) {
            console.error('Failed to create investment', e);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                {step === 1 && (
                    <StepPersonalInfo
                        onCancel={closePopup}
                        onNext={(d) => {
                            setPersonal(d);
                            setStep(2);
                        }}
                        currentStep={step}
                    />
                )}
                {step === 2 && (
                    <StepSharesInfo
                        oneSharePrice={oneSharePrice}
                        minShare={minShare}
                        onPrev={() => setStep(1)}
                        onNext={(d) => {
                            setShares(d);
                            setStep(3);
                        }}
                        currentStep={step}
                    />
                )}
                {step === 3 && (
                    <StepUploadSlip
                        onPrev={() => setStep(2)}
                        onSubmit={handleSubmit}
                        onFileChange={setBankSlip}
                        submitting={submitting}
                        currentStep={step}
                    />
                )}
            </div>
        </div>
    );
};

export default Popup;
