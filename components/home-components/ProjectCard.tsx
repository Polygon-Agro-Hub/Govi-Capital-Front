import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

export interface CardProps {
    cropNameEnglish: string
    farmerName: string
    approvedId: number
    totalValue: number
    defineShares: number
    cropGroupImage: string
    existShare: number
}

interface ProjectCardProps {
    item: CardProps;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ item }) => {
    const router = useRouter()
    const token = useSelector((state: RootState) => state.auth.token)

    function getPrecentage(num1: number, num2: number) {
        if (num2 === 0 || num1 === 0) return 0;
        return Math.min(100, Math.max(0, Math.round((num1 / num2) * 100)));
    }

    function getPricePerShare() {
        if (item.totalValue === 0 || item.defineShares === 0) return 0;
        return +(item.totalValue / item.defineShares).toFixed(3);
    }

    const handleClick = () => {
        if (!token) {
            router.replace('/login')
            return
        }
        router.push(`/card-details?id=${item.approvedId}`)
    }

    return (
        <div
            className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') handleClick() }}
        >
            <div className="flex justify-center">
                <Image src={item.cropGroupImage} alt={item.cropNameEnglish} width={160} height={120} className="h-28 w-auto object-contain" />
            </div>
            <div className="mt-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{item.cropNameEnglish}</h3>
                <p className="mt-1.5 text-sm text-gray-500">By {item.farmerName}</p>
                <p className="mt-3 text-sm font-medium text-gray-700"> 1 Share : LKR {getPricePerShare()}.00</p>
            </div>
            <div className="mt-5 text-center">
                <p className="mb-2 text-sm font-medium text-blue-600">
                    Invested : {getPrecentage(item.existShare, item.defineShares)}%
                </p>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                        className="h-full rounded-full bg-blue-500 transition-all"
                        style={{ width: `${getPrecentage(item.existShare, item.defineShares)}%` }}
                    />
                </div>
            </div>

        </div>
    )
}

export default ProjectCard
