"use client"

import React, { useEffect, useState } from "react"
import LandingBanner from "@/components/home-components/LandingBanner"
import FilterBar from "@/components/home-components/FilterBar"
import ProjectCard from "@/components/home-components/ProjectCard"
import { useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import Image from "next/image"
import profileIcon from "@/public/landingImg/User_profile.png"
import { getInvestmentCards, type InvestmentCard } from "@/services/investment-service"
import { useDispatch } from "react-redux"
import { logout } from "@/store/slices/authSlice"
import { ToyBrick } from "lucide-react"

const LandingPage = () => {
    const [cards, setCards] = useState<InvestmentCard[]>([])
    const [filteredCards, setFilteredCards] = useState<InvestmentCard[]>([])
    const token = useSelector((state: RootState) => state.auth.token)
    const [showDropdown, setShowDropdown] = useState(false)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchCards = async () => {
            if (!token) {
                setCards([])
                setFilteredCards([])
                return
            }

            try {
                const data = await getInvestmentCards(token)
                setCards(data)
                setFilteredCards(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchCards()
    }, [token])

    console.log(token);


    const handleSearch = (filters: Record<string, string>) => {
        const crop = filters.crop?.trim()
        if (!crop) {
            setFilteredCards(cards)
            return
        }
        setFilteredCards(cards.filter((c) => c.cropNameEnglish === crop))
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {!token && <LandingBanner />}

            <div className={`mx-auto px-9 pb-12 ${token ? "pt-6" : "pt-15"}`}>
                <div className="flex items-center justify-between py-4">
                    <div
                        className="text-[30px] font-semibold"
                        style={{ color: "#0E56F4" }}
                    >
                        LOGO HERE
                    </div>

                    {token && (
                        <div className="relative">
                            <div
                                className="cursor-pointer"
                                onClick={() => setShowDropdown((prev) => !prev)}
                            >
                                <Image src={profileIcon} alt="User" width={50} height={50} />
                            </div>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md border">
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        onClick={() => {
                                            dispatch(logout())
                                            setShowDropdown(false)
                                            setCards([])
                                            setFilteredCards([])
                                        }}
                                    >
                                        Logout
                                    </button>

                                </div>
                            )}
                        </div>
                    )}

                </div>

                <div className="mx-auto px-12 pt-12">
                    <FilterBar onSearch={handleSearch} />
                </div>

                <div className="mx-auto px-12 pt-4 mt-15 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredCards.map((card) => (
                        <ProjectCard key={card.approvedId} item={card} />
                    ))}
                </div>
            </div>
        </main>
    )
}

export default LandingPage
