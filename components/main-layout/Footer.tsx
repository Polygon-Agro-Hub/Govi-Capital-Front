'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import footerLogoWithText from '@/public/mainLayoutImg/Footer_white_icon_with_text.png'
import footerLogoSmall from '@/public/mainLayoutImg/Footer_white_icon_without_text.png'

const Footer = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const socialClass =
    "flex items-center justify-center rounded-full w-[37px] h-[37px] " +
    "border border-white text-white transition-all duration-300 " +
    "hover:bg-[#474F63] hover:border-[#474F63] hover:text-white";

  return (
    <footer
      className="mt-auto w-full bg-[#0A142F] text-white"
    >
      <div className="max-w-9xl mx-auto px-6 py-5 flex flex-col items-center">

        {/* Top Section */}
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
          <Image
            src={footerLogoWithText}
            alt="GoVi Capital Logo"
            width={135}
            height={135}
            className="object-contain"
          />
          <p className="tracking-[0.25em] text-white/80 text-[12px] sm:text-sm">
            CULTIVATING WEALTH, SUSTAINING LIVES
          </p>
          <h2 className="font-semibold text-white text-[32px] sm:text-[40px] leading-tight">
            Profits Rooted in Agriculture
          </h2>
          <p className="text-white/70 text-[12px] sm:text-[14px]">
            © 2026 Polygon Agro Pvt Ltd
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-white/10" />

        {/* Bottom Section */}
        <div className="w-full flex flex-col sm:flex-row items-center sm:justify-between gap-6 sm:gap-0">

          {/* Left - Small Logo */}
          <div className="flex-shrink-0">
            <Image
              src={footerLogoSmall}
              alt="GoVi Capital"
              width={61}
              height={57}
              className="object-contain"
            />
          </div>

          {/* Center - Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-white/90 text-[14px] sm:text-[16px]">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>

          {/* Right - Social Icons */}
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="#" className={socialClass} aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </Link>
            <Link href="#" className={socialClass} aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </Link>
            <Link href="#" className={socialClass} aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </Link>
            <Link href="#" className={socialClass} aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer