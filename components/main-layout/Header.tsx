'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
import { logout } from '@/store/slices/authSlice'

import headerLogo from '@/public/mainLayoutImg/Header_blue_icon.png'
import userProfile from '@/public/landingImg/User_profile.png'

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
  const dispatch = useDispatch<AppDispatch>()

  if (!isAuthenticated) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md">
      <div className="flex flex-col sm:flex-row sm:h-[85px] items-center justify-between px-4 sm:px-8 py-3 sm:py-0">

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src={headerLogo}
              alt="GoVi Capital Logo"
              width={50}
              height={50}
              priority
              className="object-contain"
            />
            <span
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: '#0B0072' }}
            >
              GoVi Capital
            </span>
          </div>

          <div className="sm:hidden">
            <button className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium">
              Dashboard
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 mt-2 sm:mt-0 w-full sm:w-auto justify-end">

          <button className="hidden sm:flex w-[146px] h-[42px] rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition items-center justify-center">
            My Dashboard
          </button>

          <div className="relative">
            <div
              className="cursor-pointer h-9 w-9 overflow-hidden rounded-full border border-gray-300 hover:border-[#0042D4] transition"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <Image
                src={userProfile}
                alt="User Profile"
                width={36}
                height={36}
                className="object-cover"
              />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 rounded-md border border-gray-200 bg-white shadow-lg z-50">
                <button
                  className="w-full rounded-md px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    dispatch(logout())
                    setShowDropdown(false)
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
