'use client'
import React from 'react'
import { useEffect, useState } from "react";

import NavbarAdmin from "./admin_components/NavbarAdmin";
import NavbarClient from "./client_components/NavbarClient";
import NavbarDF from "./default_components/NavbarDF";

function checkUserAuthentication() {
    try {
        const userType = sessionStorage.getItem("userType");
        return userType === "admin" || userType === "applicant" ? { type: userType } : null;
    } catch (error) {
        console.error("Error retrieving userType from sessionStorage:", error);
        return null;
    }
}

const Navbar = ({children}) => {
    const [userType, setUserType] = useState(null);
    useEffect(() => {
        const storedUserType = checkUserAuthentication();
        if (storedUserType) {
            setUserType(storedUserType.type);
        }
    }, []);

    const NavbarComponent = userType === "admin" ? (
        NavbarAdmin
    ) : userType === "applicant" ? (
        NavbarClient
    ) : (
        NavbarDF
    );

    return (
        <div>
            <NavbarComponent>{children}</NavbarComponent>
        </div>
    )
}

export default Navbar
