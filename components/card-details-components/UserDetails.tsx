'use client';
import React from 'react';
import Image from 'next/image';
import profileIcon from "@/public/landingImg/User_profile.png"

const cultivations = [
    'Red Onion',
    'Capsicum',
    'Carrot',
    'Leeks',
    'Watermelon',
    'Raddish'
];

const UserDetails = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 h-full border border-gray-100">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-2">
                <div>
                    <Image src={profileIcon} alt="User" width={156} height={156} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    Ashan Kularathna
                </h2>
                <p className="text-[18px] regular text-[#668EC9]">Gampaha District</p>
            </div>

            {/* Quote Icon */}
            <div className="flex justify-end mb-2">
                <svg
                    className="w-24 h-24 text-gray-100"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
            </div>

            {/* Letter Content */}
            <div className="mb-8">
                <p className="text-[16px] medium mb-4 text-[#070707]">Dear Sir/Madam,</p>
                <p className="text-[16px] medium leading-relaxed mb-1 text-[#070707]">
                    I am Ashan Kularathna, a farmer from Gampaha District.
                </p>
                <p className="text-[16px] medium leading-relaxed mb-4 text-[#070707]">
                    I am expecting an agricultural investment for the upcoming cultivation
                    season for the mentioned crop.
                </p>
                <p className="text-[16px] medium leading-relaxed text-[#070707]">- Thank you</p>
            </div>

            <hr className="my-6 border-[#E7ECFB]" />

            {/* Current Cultivations Section */}
            <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                    Current Other Ongoing Cultivations
                </h3>
                <div className="flex flex-wrap gap-2">
                    {cultivations.map((crop, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors"
                        >
                            {crop}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDetails;