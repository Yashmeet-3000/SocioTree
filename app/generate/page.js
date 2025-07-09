"use client"

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {Suspense} from 'react'

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense> 
    )
}


const PageContent = () => {
    const router = useRouter()
    const params = useSearchParams()
    const [handle, sethandle] = useState(params.get("handle"))
    const [links, setlinks] = useState([{ link: "", linktext: "" }])
    const [pics, setpics] = useState("")
    const [desc, setdesc] = useState("")
    const [handone, sethandone] = useState(false)
    const [check, setcheck] = useState(true)
    useEffect(() => {
        async function getoldhandle() {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "handle": params.get("handle"),
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
            };
            const re = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fetch`, requestOptions)
            const a = await re.json()
            if (a.success) {
                sethandone(true)
                setlinks(a.data.links)
                setpics(a.data.pics)
                setdesc(a.data.desc)
            } else {
                toast(a.message)

            }

        }
        getoldhandle()
    }, [])
    async function updateHandler() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/update`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                handle,
                links,
                desc,
                pics,
            }),
        });
        const data = await res.json();

        if (data.success) {
            sethandle("")
            sethandone(false)
            setlinks([{ link: "", linktext: "" }])
            setpics("")
            setdesc("")
            router.push(`${process.env.NEXT_PUBLIC_HOST}/${handle}`)
        }
        else toast.error(data.message);
    }

    async function checkparam() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "handle": handle,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const re = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/check`, requestOptions)
        const a = await re.json()
        if (a.success) {
            sethandone(true)
        } else {
            setcheck(false)
            sethandone(false)
        }


    }
    function gethandle(e) {
        sethandle(e.target.value)
    }

    function addl() {
        setlinks(links.concat([{ link: "", linktext: "" }]))
    }
    function getpics(e) {
        setpics(e.target.value)
    }
    function getdesc(e) {
        setdesc(e.target.value)
    }
    function handlechange(index, link, linktext) {
        setlinks(links.map((item, i) => {
            if (index == i) {
                return { link, linktext }
            } else {
                return item
            }

        }))

    }

    async function addlink() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "handle": handle,
            "links": links,
            "pics": pics,
            "desc": desc
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };
        const re = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/generate`, requestOptions)
        const a = await re.json()
        sethandle("")
        sethandone(false)
        setlinks([{ link: "", linktext: "" }])
        setpics("")
        setdesc("")
        if (a.success) {
            router.push(`${process.env.NEXT_PUBLIC_HOST}/${handle}`)
            

        } else {
            toast.error(a.message)
        }





    }

    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <main className="w-full min-h-[120vh] relative">
                <div className="absolute inset-0 w-full h-full object-cover z-0">
                    <Image src="https://wallpapers.com/images/hd/red-tree-gz3t2tpxv27u9ykq.jpg" alt="" layout="fill" objectFit="cover" className="opacity-95" />
                </div>
                <section className="w-full z-10 absolute h-full pb-10 flex flex-col md:flex-row ">
                    <div className=" w-9/10 mx-auto px-[5%] z-10   items-center flex flex-col text-center   gap-y-4.5  mt-[26vh]">
                        <span className="text-[black] font-[Linksans Linksansvf] w-full md:w-fit font-extrabold leading-tight text-[25px]  h-fit md:text-[30px] lg:text-[40px]">Create your Link Tree</span>
                        <div className="flex flex-col gap-y-2.5 items-center w-full">
                            <span className="text-[black] ml-3 text-shadow-2xl text-shadow-white  font-bold text-[15px] md:text-[18px] lg:text-[25px] ">Claim a handle</span>
                            <div className="flex gap-x-3 md:flex-row flex-col space-y-3 justify-center items-center">
                                <input onChange={gethandle} value={handle || ""} className="bg-transparent outline-none border-[2px] border-black h-fit md:w-[60%]  font-bold text-[white] py-3.5 px-2 text-[17px]  placeholder:font-bold  rounded-3xl placeholder:text-[white]" type="text" placeholder='Choose a handle' />
                                <button onClick={() => { checkparam() }} className="bg-black disabled:opacity-85 w-fit h-fit py-2 px-3  md:text-[13px] font-bold md:px-8 text-white rounded-3xl transition duration-150 active:scale-90 active:cursor-pointer hover:cursor-pointer ">Add Handle</button>

                            </div>
                            {(!handone && !check) && (
                                <>
                                    <span className="text-[red] ml-3  font-bold text-[17px] ">This handle already exists</span>
                                </>
                            )}


                            {(handone && links) && links.map((item, i) => (
                                <div key={i}>
                                    <span className="text-[black] ml-3  font-bold text-[25px] ">Add Links</span>
                                    <div className="flex justify-center items-center gap-x-3 w-full">
                                        <div className="flex md:flex-row flex-col items-center gap-y-4 justify-center gap-x-3 ">
                                            <input onChange={(e) => { handlechange(i, item.link, e.target.value) }} value={item.linktext || ""} className="bg-transparent outline-none border-[2px] border-black h-12   font-bold text-[white] py-3.5 px-2 text-[17px]  placeholder:font-bold rounded-3xl placeholder:text-[white]" type="text" placeholder='Enter Link Text' />
                                            <input onChange={(e) => { handlechange(i, e.target.value, item.linktext) }} value={item.link || ""} className="bg-transparent outline-none border-[2px] border-black h-12   font-bold text-[white] py-3.5 px-2 text-[17px]  placeholder:font-bold  rounded-3xl placeholder:text-[white]" type="text" placeholder='Enter Link' />
                                        </div>
                                        <button disabled={!(item.link.length && item.linktext.length)} onClick={() => { addl() }} className="bg-black disabled:opacity-85 h-10 md:h-12 w-fit  py-1 px-2 font-bold md:px-8 text-white md:rounded-3xl rounded-2xl transition duration-150 active:scale-90 active:cursor-pointer hover:cursor-pointer md:text-[16px] lg:text-[21px]  text-[11px]  ">+ Add</button>


                                    </div>

                                </div>
                            )


                            )

                            }

                            <span className="text-[black]  font-bold text-[15px] md:text-[18px] lg:text-[25px]  ">Add Pictures and Finalize</span>
                            <div className="flex gap-x-3 justify-center md:flex-row flex-col gap-y-4 mx-auto  w-[90%]">
                                <input onChange={getpics} value={pics} className="bg-transparent outline-none border-[2px] border-black h-12   font-bold text-[white] py-3.5 px-2 text-[16px]  rounded-3xl placeholder:text-[white] placeholder:font-bold" type="text" placeholder='Enter Link to your picture' />
                                <input onChange={getdesc} value={desc} className="bg-transparent outline-none border-[2px] border-black h-12   font-bold text-[white] py-3.5 px-2 text-[16px]  rounded-3xl placeholder:text-[white] placeholder:font-bold" type="text" placeholder='Enter  description' />


                            </div>
                            <div className="flex md:flex-row flex-col justify-center gap-y-6 items-center gap-x-3 w-full">
                                <button disabled={!(pics.length && desc.length)} onClick={() => { addlink() }} className="bg-black w-[50%]   md:w-[30%] h-fit   py-2 md:py-auto font-bold md:text-[16px] lg:text-[21px]  text-white rounded-3xl disabled:opacity-85 transition duration-150 active:scale-90 active:cursor-pointer hover:cursor-pointer   ">Create Sociotree</button>
                                <button disabled={!(pics.length && desc.length)} onClick={() => { updateHandler() }} className="bg-black h-fit w-[50%]   md:w-[30%]  py-2 md:py-auto font-bold md:text-[16px] lg:text-[21px]  text-white rounded-3xl disabled:opacity-85 transition duration-150 active:scale-90 active:cursor-pointer hover:cursor-pointer   ">Update Sociotree</button>



                            </div>





                        </div>





                    </div>

                </section>


            </main>

        </>
    )
}
 export default Page

