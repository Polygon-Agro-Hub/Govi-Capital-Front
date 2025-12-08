'use client'

import React from 'react'

interface FilterBarProps {
    onSearch?: () => void
}

const FilterBar: React.FC<FilterBarProps> = ({ onSearch }) => {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <select className="min-w-40 flex-1 rounded-lg border-2 border-[#668EC9] bg-white px-4 py-3 text-sm text-[#668EC9] outline-none">
                <option>Select Crop</option>
                <option>Beans</option>
                <option>Carrot</option>
                <option>Onion</option>
            </select>

            <select className="min-w-40 flex-1 rounded-lg border-2 border-[#668EC9] bg-white px-4 py-3 text-sm text-[#668EC9] outline-none">
                <option>Select Type</option>
                <option>Organic</option>
                <option>Conventional</option>
            </select>

            <select className="min-w-40 flex-1 rounded-lg border-2 border-[#668EC9] bg-white px-4 py-3 text-sm text-[#668EC9] outline-none">
                <option>Select Zone</option>
                <option>North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
            </select>

            <select className="min-w-40 flex-1 rounded-lg border-2 border-[#668EC9] bg-white px-4 py-3 text-sm text-[#668EC9] outline-none">
                <option>Select ROI Range</option>
                <option>0% - 10%</option>
                <option>10% - 20%</option>
                <option>20%+</option>
            </select>

            <select className="min-w-40 flex-1 rounded-lg border-2 border-[#668EC9] bg-white px-4 py-3 text-sm text-[#668EC9] outline-none">
                <option>Select RR</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>

            <button
                type="button"
                onClick={onSearch}
                className="flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-white shadow-md"
                style={{ backgroundColor: '#0B6BFE' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5C7FB5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#668EC9')}
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
