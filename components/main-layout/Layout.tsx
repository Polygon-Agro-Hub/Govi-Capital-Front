"use client";

import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    return (
        <>
            {isAuthenticated && <Header />}

            <main className={isAuthenticated ? "pt-20 md:pt-24" : ""}>
                {children}
            </main>

            <Footer />
        </>
    );
};

export default Layout;