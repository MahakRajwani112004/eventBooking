import React from "react";
import AppNavbar from "./Navbar";
import Footer from "./footer/footer";


interface LayoutProps{
    children : React.ReactNode;

}

export const Layout :React.FC<LayoutProps> =({children})=>{

    return(
        <>
        <AppNavbar/>
        <main>{children}</main>
        <Footer/>
        </>
    )
}