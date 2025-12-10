"use client"

import React, { useState, useEffect } from 'react'
import { getInvestmentCards, InvestmentCard } from '@/services/investment-service'

interface FilterBarProps {
    onSearch?: (filters: Record<string, string>) => void
}

const filterOptionsStatic: Record<string, string[]> = {
    type: ["Loan", "Invesment"],
    zone: ["North", "South", "East", "West"],
    roi: ["0% - 10%", "10% - 20%", "20%+"],
    rr: ["Low", "Medium", "High"]
}

const FilterBar: React.FC<FilterBarProps> = ({ onSearch }) => {
    const [filters, setFilters] = useState<Record<string, string>>({
        crop: "",
        type: "",
        zone: "",
        roi: "",
        rr: ""
    })

    const [cropOptions, setCropOptions] = useState<string[]>([])

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const cards: InvestmentCard[] = await getInvestmentCards()
                const crops = Array.from(
                    new Set(cards.map(card => (card.cropNameEnglish || "").trim()))
                )
                setCropOptions(crops)
            } catch (error) {
                console.error("Error fetching crops:", error)
            }
        }

        fetchCrops()
    }, [])

    const handleChange = (field: string, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }))
    }

    const handleSearch = () => {
        if (onSearch) onSearch(filters)
    }

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Crop dropdown from API */}
            <select
                value={filters.crop}
                onChange={(e) => handleChange('crop', e.target.value)}
                className="min-w-40 flex-1 rounded-lg border-2 border-[#668EC9] bg-white px-4 py-3 text-sm text-[#668EC9] outline-none"
            >
                <option value="">Select Crop</option>
                {cropOptions.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                ))}
            </select>

            {/* Other dropdowns */}
            {Object.entries(filterOptionsStatic).map(([key, options]) => (
                <select
                    key={key}
                    value={filters[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="min-w-40 flex-1 rounded-lg border-2 border-[#668EC9] bg-white px-4 py-3 text-sm text-[#668EC9] outline-none"
                >
                    <option value="">{`Select ${key.charAt(0).toUpperCase() + key.slice(1)}`}</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ))}

            <button
                type="button"
                onClick={handleSearch}
                className="flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-white shadow-md"
                style={{ backgroundColor: '#0B6BFE' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5C7FB5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0B6BFE')}
                aria-label="Search"
                title="Search"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M10.5 3a7.5 7.5 0 015.916 12.182l3.2 3.2a1 1 0 01-1.415 1.415l-3.2-3.2A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}

export default FilterBar
