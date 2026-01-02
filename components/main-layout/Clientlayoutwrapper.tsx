"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Provider } from "react-redux";
import Layout from "./Layout";
import { store } from "@/store";
import Footer from "./Footer";

interface ClientLayoutWrapperProps {
    children: React.ReactNode;
}

const excludedRoutes = [
    "/login",
    "/register",
    "/verify-otp",
    "/investment-details",
    "/investment-details-popup",
];

const publicRoutes = ["/login", "/", "/register", "/verify-otp"];

const ClientLayoutWrapper = ({ children }: ClientLayoutWrapperProps) => {
    const pathname = usePathname();

    // If no pathname, wrap with Provider only
    if (!pathname) {
        return <Provider store={store}>{children}</Provider>;
    }

    const cleanPathname = pathname.replace(/\/$/, "").split("?")[0];
    const isRootRoute = cleanPathname === "" || cleanPathname === "/";

    const shouldExcludeLayout = excludedRoutes.some((route) => {
        if (route === "/") return isRootRoute;
        return cleanPathname === route || cleanPathname.startsWith(`${route}/`);
    });

    const isPublicRoute =
        isRootRoute ||
        publicRoutes.some((route) => {
            if (route === "/") return isRootRoute;
            return cleanPathname === route || cleanPathname.startsWith(`${route}/`);
        });

    return (
        <Provider store={store}>
            {shouldExcludeLayout ? (
                <>
                    {children}
                    <Footer />
                </>
            ) : (
                <Layout>{children}</Layout>
            )}
        </Provider>
    );
};

export default ClientLayoutWrapper;