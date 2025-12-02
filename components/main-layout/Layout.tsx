import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="pt-20 md:pt-[126px]">{children}</main>
            <Footer />
        </>
    )
}

export default Layout