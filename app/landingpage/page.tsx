import React from 'react'
import LandingBanner from '@/components/home-components/LandingBanner'
import FilterBar from '@/components/home-components/FilterBar'
import ProjectCard from '@/components/home-components/ProjectCard'

const mockData = [
    { title: 'Beans', author: 'Ajith Kumara', priceLabel: '1 Share : LKR 10,000', investedPct: 90, imageSrc: '/landingImg/onion.png' },
    { title: 'Beans', author: 'Sujith Bandara', priceLabel: '1 Share : LKR 10,000', investedPct: 30, imageSrc: '/landingImg/onion.png' },
    { title: 'Carrot', author: 'Ajith Kumara', priceLabel: '1 Share : LKR 10,000', investedPct: 90, imageSrc: '/landingImg/onion.png' },
    { title: 'Ginger', author: 'Sujith Bandara', priceLabel: '1 Share : LKR 10,000', investedPct: 30, imageSrc: '/landingImg/onion.png' },
    { title: 'Ginger', author: 'Ajith Kumara', priceLabel: '1 Share : LKR 10,000', investedPct: 90, imageSrc: '/landingImg/onion.png' },
    { title: 'Kekiri', author: 'Sujith Bandara', priceLabel: '1 Share : LKR 10,000', investedPct: 30, imageSrc: '/landingImg/onion.png' },
    { title: 'Maize', author: 'Ajith Kumara', priceLabel: '1 Share : LKR 10,000', investedPct: 90, imageSrc: '/landingImg/onion.png' },
    { title: 'Lettuce', author: 'Sujith Bandara', priceLabel: '1 Share : LKR 10,000', investedPct: 30, imageSrc: '/landingImg/onion.png' },
    { title: 'Red Onion', author: 'Ajith Kumara', priceLabel: '1 Share : LKR 10,000', investedPct: 90, imageSrc: '/landingImg/onion.png' },
]

const LandingPage = () => {
    return (
        <main className="min-h-screen bg-gray-50">
            <LandingBanner />

            <div className="mx-auto max-w-7xl px-4 pb-12 pt-15">
                <FilterBar />

                <div className="mt-15 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {mockData.map((item, idx) => (
                        <ProjectCard key={idx} {...item} />
                    ))}
                </div>
            </div>
        </main>
    )
}

export default LandingPage
