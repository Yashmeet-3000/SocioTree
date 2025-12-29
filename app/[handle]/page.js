
// import { Nanum_Gothic } from "next/font/google"
// const NanG = Nanum_Gothic({
//       variable: "--Nanum-Gothic",
//       subsets: ["latin"],
//       weight: ["400"],
//     });

import clientPromise from "@/lib/mongo";
import Link from "next/link"
export default async function Page({ params }) {



    const handle = (await params).handle
    const client = await clientPromise
    const db = client.db("TreeLink")
    const collection = db.collection("Links")
    const result = await collection.findOne({ handle: handle })

    return (
        <>
            <main className="w-full min-h-screen relative">
                <section className="w-full h-[110vh] py-22  justify-center items-center   bg-linear-to-t from-25% from-[#6c92e6]  to-[#0d52e6] ">
                    <div className="pt-[15vh]  w-1/2 mx-auto gap-y-4   flex flex-col items-center justify-center">
                        <div className="photo w-40 h-40 rounded-[41px]  ">
                            <img className="object-cover rounded-[80px] w-full h-full " src={result.pics} alt="" />
                        </div>
                        <div className=" flex flex-col w-fit justify-center items-center text-center gap-y-2">
                            <div className="handler text-black text-2xl font-bold">{result.handle}</div>
                            <div className={`"desc break-words  font-medium text-[16px] text-black"`}>{result.desc}</div>
                        </div>
                        {/* This check ensures the entire container is removed if no links exist */}
                        {result.links && result.links.length > 0 && (
                            <div className="flex flex-col w-7/20 px-8 gap-y-4 py-8 items-center bg-transparent">
                                {result.links.map((item) => {
                                    return (
                                        <div key={item.linktext} className="h-10 w-fit items-center px-10 rounded-2xl bg-[#0e0e8fd8] opacity-75 flex justify-center">
                                            <Link className="active:text-[#928c8c]" href={`${item.link}`}>
                                                <span className="font-medium hover:font-semibold text-white text-[20px]">
                                                    {item.linktext}
                                                </span>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        )}


                    </div>

                </section>



            </main>
        </>

    )
}