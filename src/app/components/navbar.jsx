"use client";
import { useAuth } from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPencilAlt, FaSearch } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import UserNavigationPanel from "./userNav";
import { usePathname } from "next/navigation";
import config from "../../configs/routingConfig.json";

function Navbar() {
    const [searchVisible, setSearchVisible] = useState(false);
    const [userNavPanel, setUserNavPanel] = useState(false);
    
    const pathname = usePathname();
    const isCustomNavbar = config.customRoutes?.find(r => pathname.includes(r.key))?.customNav;

    const { userAuth, userAuth: { access_token, profile_img } } = useAuth();

    const handleUserNavPanel = () => {
        setUserNavPanel(current => !current);
    }
    const handleBlur = (e) => {
        setTimeout(() => {
            setUserNavPanel(false);
        }, 200)
    }
    if(isCustomNavbar) return null;
    else
    return (
        <nav className="z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[80px] border-b border-grey bg-white">
            <Link href="/">
                <Image src="/logo.png" alt="site logo" width={40} height={40}/>
            </Link>
            <div className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:show md:relative md:inset-0 md:p-0 md:w-auto ${searchVisible ? 'show' : 'hide'}`}>
                <input 
                    type="text"
                    placeholder="Search"
                    className="w-full md:w-auto bg-gray-100 p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                />
                <FaSearch className="absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl" color="#888" />
            </div>
            <div className="flex items-center gap-3 md:gap-6 ml-auto">
                <button className="md:hidden bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center" onClick={() => setSearchVisible(prev => !prev)}>
                    <FaSearch className="text-lg text-gray-800" />
                </button>
                <Link href="/editor">
                    <p className="hidden md:flex items-center gap-2 link">
                        <FaPencilAlt />
                        <span>Write</span>
                    </p>
                </Link>
                {
                    access_token ? 
                    <>
                        <Link href="/dashboard/notification">
                            <button className="w-12 h-12 rounded-full bg-grey relative flex items-center justify-center hover:bg-black/10">
                                <GoBell className="text-2xl block mt-1" />
                            </button>
                        </Link>
                        <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                            <button className="w-12 h-12 mt-1">
                                <img src={profile_img} alt="user avatar" className="w-full h-full object-cover rounded-full" />
                            </button>
                            {userNavPanel ? <UserNavigationPanel /> : ""}
                        </div>
                    </> :
                    <>
                        <Link href="/signin">
                            <button className="btn-dark py-2">
                                Sign In
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className="btn-light py-2 hidden md:block">
                                Sign Up
                            </button>
                        </Link>
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar;
