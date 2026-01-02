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
      <div className="flex items-center justify-between h-[64px] sm:h-[85px] px-4 sm:px-8">

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src={headerLogo}
            alt="GoVi Capital Logo"
            width={42}
            height={42}
            priority
            className="object-contain sm:w-[65px] sm:h-[61px]"
          />
          <span
            className="text-lg sm:text-2xl font-bold tracking-tight"
            style={{ color: '#0B0072' }}
          >
            GoVi Capital
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Desktop Dashboard Button */}
          <button className="hidden sm:flex w-[146px] h-[42px] rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition items-center justify-center">
            My Dashboard
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(prev => !prev)}
              className="h-9 w-9 rounded-full overflow-hidden border border-gray-300 hover:border-[#0042D4] transition flex items-center justify-center"
            >
              <Image
                src={userProfile}
                alt="User Profile"
                width={36}
                height={36}
                className="object-cover"
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg z-50">

                {/* Mobile Dashboard */}
                <button
                  className="sm:hidden w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  My Dashboard
                </button>

                <button
                  className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
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
