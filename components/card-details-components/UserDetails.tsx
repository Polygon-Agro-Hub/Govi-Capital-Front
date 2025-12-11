'use client';
import React from 'react';
import Image from 'next/image';
import profileIcon from "@/public/landingImg/User_profile.png";
import { InvestmentRequestInfo, OngoingCultivation } from "@/services/investment-service";

type Props = {
    user: InvestmentRequestInfo;
    cultivation: OngoingCultivation[];
};

const UserDetails: React.FC<Props> = ({ user, cultivation }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 h-full border border-gray-100">
            <div className="flex flex-col items-center mb-4">
                <Image src={profileIcon} alt="User" width={156} height={156} className='mb-2' />
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{user.farmerName}</h2>
                <p className="text-[18px] regular text-[#668EC9] mb-4">
                    {user.farmerDistrict ? `${user.farmerDistrict} District` : 'District N/A'}
                </p>
            </div>

            <div className="mb-8">
                <p className="text-[16px] font-medium mb-4 text-[#070707]">Dear Sir/Madam,</p>
                <p className="text-[16px] font-medium leading-relaxed mb-1 text-[#070707]">
                    I am {user.farmerName}, a farmer from {user.farmerDistrict || 'N/A'} District.
                </p>
                <p className="text-[16px] font-medium leading-relaxed mb-4 text-[#070707]">
                    I am expecting an agricultural investment for the upcoming cultivation season.
                </p>
                <p className="text-[16px] font-medium leading-relaxed text-[#070707]">- Thank you</p>
            </div>

            <hr className="my-6 border-[#E7ECFB]" />

            <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Current Other Ongoing Cultivations</h3>
                <div className="flex flex-wrap gap-2">
                    {cultivation.length === 0 && (
                        <span className="text-sm text-gray-500">No ongoing cultivations</span>
                    )}
                    {cultivation.map(c => (
                        <span
                            key={c.id}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors"
                        >
                            {c.cropNameEnglish}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
