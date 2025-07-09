"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';



export default function Navbar() {
    const pathname = usePathname()

    const [paths, setpaths] = useState(null)
    useEffect(() => {
        setpaths(window.location.pathname)

    }, [])
    const sNav = ["/", "/generate"].includes(paths)
    const [showNavbar, setShowNavbar] = useState(false);
    const router = useRouter()
    let lastScrollY = 0;
    const [ani, setani] = useState(false)
    function clicked() {
        setani((v) => !v)
        console.log(ani)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
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
                <nav className={`fixed  w-full z-100 h-[30vh] flex flex-col gap-y-2 md:block   top-8 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
                    {/* Your nav content */}
                    <div className="bg-white shadow-md w-[90vw] h-[16vh] md:h-[13vh]  rounded-[2.5rem] mx-auto p-4 flex justify-between items-center">
                        <div className=" flex  justify-center items-center gap-x-2 lg:gap-x-5 ">
                            <div onClick={() => { router.push("/") }} className=" items-center md:w-35 w-26  h-4 p-3 flex active:cursor-pointer hover:cursor-pointer active:opacity-70 ">
                                <img  className="object-cover " src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg" alt="" />
                            </div>
                            <img onClick={() => { clicked() }} className="md:hidden active:scale-90 transition-all duration-150 active:invert" src="/hamburger.svg" alt="" />

                            <div className=" hidden  items-center  md:flex ">
                                <ul className="list-none flex gap-x-1 lg:gap-x-3">
                                    <li className="p-3 lg:text-[16px] text-[12px] hover:cursor-pointer hover:bg-gray-200 transition-all duration-150 rounded-xl">Products</li>
                                    <li className="p-3 lg:text-[16px] text-[12px] hover:cursor-pointer hover:bg-gray-200 transition-all duration-150 rounded-xl ">Templates</li>
                                    <li className="p-3 lg:text-[16px] text-[12px] hover:cursor-pointer hover:bg-gray-200 transition-all duration-150 rounded-xl">Marketplace</li>
                                    <li className="p-3 lg:text-[16px] text-[12px] hover:cursor-pointer hover:bg-gray-200 transition-all duration-150 rounded-xl">Learn</li>
                                    <li className="p-3 lg:text-[16px] text-[12px] hover:cursor-pointer hover:bg-gray-200 transition-all duration-150 rounded-xl">Pricing</li>
                                </ul>

                            </div>



                        </div>
                        <div className="flex gap-x-4 items-center h-full justify-center">
                            <div className="font-bold lg:py-5 lg:px-7 py-2 px-2.5 h-fit rounded-2xl text-[12px] lg:text-[16px] bg-[#dbd8d8] active:cursor-pointer hover:cursor-pointer">Log in</div>
                            <div className="font-bold lg:py-5 lg:px-7 py-2 px-2.5  h-fit rounded-2xl text-[10px] lg:text-[16px] text-white bg-[black] active:cursor-pointer hover:cursor-pointer hover:opacity-70">Sign up free</div>

                        </div>


                    </div>
                    <div className={`bg-[#ffffffcf] duration-150 transition-all  ${ani ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-5 pointer-events-none"} ease-in-out transform   shadow-md w-[90vw] h-fit z-100  rounded-[2.5rem] mx-auto p-4  items-center`}>
                        <ul className="list-none flex justify-center items-center flex-col w-full gap-y-3">
                            <li className="p-3  bg-[white] text-[20px] hover:scale-105  w-9/10  hover:cursor-pointer text-[gray] transition-all duration-150 rounded-[2.5rem]">Products</li>
                            <li className="p-3  bg-[white] text-[20px] hover:scale-105  w-9/10  hover:cursor-pointer text-[gray] transition-all duration-150 rounded-[2.5rem] ">Templates</li>
                            <li className="p-3  bg-[white] text-[20px] hover:scale-105  w-9/10  hover:cursor-pointer text-[gray] transition-all duration-150 rounded-[2.5rem]">Marketplace</li>
                            <li className="p-3  bg-[white] text-[20px] hover:scale-105  w-9/10  hover:cursor-pointer text-[gray] transition-all duration-150 rounded-[2.5rem]">Learn</li>
                            <li className="p-3  bg-[white] text-[20px] hover:scale-105  w-9/10  hover:cursor-pointer text-[gray] transition-all duration-150 rounded-[2.5rem]">Pricing</li>
                        </ul>



                    </div>
                </nav>

            )}
        </>


    );
}
