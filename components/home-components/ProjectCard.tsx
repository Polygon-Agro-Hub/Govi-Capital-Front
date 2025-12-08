import React from 'react'
import Image from 'next/image'

export interface ProjectCardProps {
    title: string
    author: string
    priceLabel: string
    investedPct: number
    imageSrc: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, author, priceLabel, investedPct, imageSrc }) => {
    const pct = Math.min(100, Math.max(0, investedPct))
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex justify-center">
                <Image src={imageSrc} alt={title} width={160} height={120} className="h-28 w-auto object-contain" />
            </div>
            <div className="mt-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="mt-1.5 text-sm text-gray-500">By {author}</p>
                <p className="mt-3 text-sm font-medium text-gray-700">{priceLabel}</p>
            </div>
            <div className="mt-5 text-center">
                <p className="mb-2 text-sm font-medium text-blue-600">
                    Invested : {pct}%
                </p>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                        className="h-full rounded-full bg-blue-500 transition-all"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>

        </div>
    )
}

export default ProjectCard
