"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname()
    const [paths, setpaths] = useState(null)
    const [showNavbar, setShowNavbar] = useState(true);
    const [ani, setani] = useState(false)
    const router = useRouter()
    let lastScrollY = 0;

    useEffect(() => {
        setpaths(window.location.pathname)
    }, [])
    const isProfilePage = pathname !== "/" && pathname !== "/generate" && pathname.split('/').length === 2;
    const sNav = ["/", "/generate"].includes(pathname) || isProfilePage;

    function clicked() {
        setani((v) => !v)
    }

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {

            if (window.scrollY <= 10) {
                setShowNavbar(true);
            } else if (window.scrollY > lastScrollY) {
                setShowNavbar(false); // scroll down
            } else {
                setShowNavbar(true); // scroll up
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {sNav && (
                <nav className={`fixed w-full pointer-events-auto  z-[100] h-fit flex flex-col gap-y-2 top-8 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>

                    {/* Main Navbar Container */}
                    <div className="bg-white shadow-md w-[90vw] h-[10vh] md:h-[12vh] rounded-[2.5rem] mx-auto px-6 flex justify-between items-center">

                        {/* 1. Left Section: Logo */}
                        <div
                            onClick={() => { router.push("/") }}
                            className="flex items-center gap-x-2 w-fit h-fit active:cursor-pointer hover:cursor-pointer active:opacity-70 shrink-0"
                        >
                            <svg width="35" height="35" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                <circle cx="50" cy="22" r="18" fill="#39E09B" />
                                <circle cx="78" cy="50" r="18" fill="#39E09B" />
                                <circle cx="22" cy="50" r="18" fill="#39E09B" />
                                <circle cx="50" cy="78" r="18" fill="#39E09B" />
                                <path d="M35 35C35 35 65 35 65 50C65 65 35 65 35 80" stroke="white" strokeWidth="10" strokeLinecap="round" />
                                <circle cx="50" cy="50" r="8" fill="white" />
                            </svg>
                            <span className="text-[20px] md:text-[24px] font-black tracking-tighter text-black">
                                Socio<span className="text-[#39E09B]">Tree</span>
                            </span>
                        </div>

                        {/* 2. Middle Section: Centered Links (Desktop) */}
                        <div className="hidden md:flex items-center justify-end flex-1">
                            <ul className="list-none flex gap-x-2 lg:gap-x-6">

                                <li
                                    onClick={() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) }}
                                    className="px-4 py-2 lg:text-[16px] text-[14px] font-semibold text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-150 rounded-xl cursor-pointer"
                                >
                                    Features
                                </li>
                                <li
                                    onClick={() => { router.push("/generate") }}
                                    className="px-4 py-2 lg:text-[16px] text-[14px] font-semibold text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-150 rounded-xl cursor-pointer"
                                >
                                    Generate Section
                                </li>
                            </ul>
                        </div>

                        {/* 3. Right Section: Hamburger Menu (Mobile Only) */}
                        <div className="md:hidden">
                            <img onClick={() => clicked()} className="w-8 h-8 active:scale-90 transition-all duration-150 cursor-pointer" src="/hamburger.svg" alt="menu" />
                        </div>

                    </div>

                    {/* Mobile Dropdown Menu */}
                    <div className={`bg-white/95 backdrop-blur-sm duration-300 transition-all ${ani ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-5 pointer-events-none"} ease-in-out transform shadow-xl w-[90vw] h-fit z-[100] rounded-[2rem] mx-auto p-6 items-center mt-2`}>
                        <ul className="list-none flex flex-col w-full gap-y-4">
                            <li
                                onClick={() => { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) }}
                                className="px-4 py-2 lg:text-[16px] text-[14px] font-semibold text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-150 rounded-xl cursor-pointer"
                            >
                                Features
                            </li>
                            <li
                                onClick={() => { router.push("/generate") }}
                                className="px-4 py-2 lg:text-[16px] text-[14px] font-semibold text-gray-700 hover:text-black hover:bg-gray-100 transition-all duration-150 rounded-xl cursor-pointer"
                            >
                                Generate Section
                            </li>
                        </ul>
                    </div>
                </nav>
            )}
        </>
    );
}