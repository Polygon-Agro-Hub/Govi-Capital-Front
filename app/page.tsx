"use client"

import React, { useEffect, useState } from "react"
import type { AppDispatch, RootState } from "@/store"
import Image from "next/image"
import profileIcon from "@/public/landingImg/User_profile.png"
import { getInvestmentCards, InvestmentCard } from "@/services/investment-service"
import { useDispatch, useSelector } from "react-redux"
import LandingBanner from "@/components/home-components/LandingBanner"
import { logout } from "@/store/slices/authSlice"
import FilterBar from "@/components/home-components/FilterBar"
import ProjectCard from "@/components/home-components/ProjectCard"

const Page = () => {
  const [cards, setCards] = useState<InvestmentCard[]>([])
  const [filteredCards, setFilteredCards] = useState<InvestmentCard[]>([])
  const token = useSelector((state: RootState) => state.auth.token)

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
        <div className="mx-auto px-12 pt-8">
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

export default Page
