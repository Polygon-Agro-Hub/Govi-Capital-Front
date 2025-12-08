import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const LandingBanner = () => {
    return (
        <section
            className="overflow-hidden text-white"
            style={{
                background: "linear-gradient(135deg, #0A6DFF 0%, #0050E6 100%)"
            }}
        >
            {/* Top Navigation Bar */}
            <div className="absolute inset-x-0 z-20">
                <div className="flex items-center justify-between px-8 py-7">

                    {/* LEFT - LOGO TEXT */}
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold tracking-wide ml-2">
                            LOGO HERE
                        </span>
                    </div>

                    {/* RIGHT - LINKS */}
                    <div className="flex items-center gap-4 text-sm">
                        <Link href="/login" className="hover:text-white/90">
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="rounded-full bg-white/10 px-4 py-1.5 ring-1 ring-white/20 transition hover:bg-white/20"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content - Two Column Grid */}
            <div className="relative pt-6">
                <div className="grid min-h-[600px] grid-cols-1 md:grid-cols-2">

                    {/* LEFT SIDE */}
                    <div className="flex items-center justify-center px-6 py-12 md:px-10 lg:px-16 xl:px-20">
                        <div className="w-full max-w-2xl">
                            <p className="text-lg text-white/90">Welcome to GoViCapital</p>

                            <h1 className="mt-2 text-3xl font-bold leading-snug md:text-4xl lg:text-5xl xl:text-6xl">
                                Join with us to grow your wealth
                            </h1>

                            <h2 className="mt-4 text-xl font-semibold md:text-2xl lg:text-3xl">
                                Invest to our projects <br />
                                <span className="font-bold">260+ Projects Available</span>
                            </h2>

                            <p className="mt-5 text-sm leading-relaxed text-white/90 md:text-base">
                                Get your assets in each project as stocks. <br />
                                Get your return daily / monthly.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                <Link href="/register"
                                    className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg transition hover:bg-blue-50 hover:shadow-xl">
                                    Register Now!
                                </Link>

                                <Link href="/login"
                                    className="inline-flex items-center justify-center rounded-lg border-2 border-white/50 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
                                    Login Here
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - IMAGE */}
                    <div className="relative hidden md:block">

                        <div className="absolute inset-0">
                            <Image
                                src={"/landingImg/Banner bg(Before Login).png"}
                                alt="Background"
                                fill
                                priority
                                className="select-none object-cover object-center"
                            />
                        </div>

                        <div className="absolute inset-0 flex items-end justify-center">
                            <div className="relative h-[95%] w-[95%]">
                                <Image
                                    src={"/landingImg/landing_image.png"}
                                    alt="Hero"
                                    fill
                                    priority
                                    className="select-none object-contain object-bottom drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
export default LandingBanner
