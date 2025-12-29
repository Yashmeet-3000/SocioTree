"use client"
import Footer from "@/app/components/Footer";
import { Poppins } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import CircularText from "@/app/animation/ani1";


const Pop = Poppins({
  variable: "--Poppins",
  subsets: ["latin"],
  weight: ["400"],
});
export default function Home() {
  const [tras, settras] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      settras(true)

    }, 250);

  }, [])
  const cardRef = useRef(null);
  const [h, seth] = useState("")
  const [oldhan, setoldhan] = useState("")
  const [check1, setcheck1] = useState(true)
  const router = useRouter()

  const [transformStyle, setTransformStyle] = useState("");
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    console.log(rect)
    const x = e.clientX - rect.left; // mouse X inside div
    const y = e.clientY - rect.top;  // mouse Y inside div
    console.log(x)
    console.log(y)

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    console.log(centerX)
    console.log(centerY)

    const rotateX = -((y - centerY) / 5); // invert for natural tilt
    const rotateY = ((x - centerX) / 6);

    setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };
  async function checkhandle() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "handle": oldhan,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    const re = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/check`, requestOptions)
    const a = await re.json()
    if (!a.success) {
      router.push(`${process.env.NEXT_PUBLIC_HOST}/${oldhan}`);
    } else {
      setcheck1(false);


    }




  }


  return (
    <>

      <main className=" w-full min-h-screen overflow-x-hidden relative ">
        <section className="w-full h-fit pb-10 flex flex-col md:flex-row justify-center md:justify-normal items-center gap-y-8 md:items-stretch bg-[#114511f2]">
          <div className="w-[90%] md:w-[50%] mx-auto px-4 flex flex-col items-center md:items-start gap-y-5 mt-[20vh]">
            <span className="text-[#ebff12] font-extrabold leading-tight text-center md:text-left text-[36px] md:text-[40px] lg:text-[48px] xl:text-[55px] 2xl:text-[64px]">
              Everything about<br />
              you. In one,<br />
              simple link in bio.
            </span>
            <span className="font-semibold text-[16px] md:text-[18px] lg:text-[20px] text-white text-center md:text-left">
              Join 70M+ people using sociotree for their link in bio...
            </span>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="relative w-full md:w-[65%]">
                <input onChange={(e) => { seth(e.target.value) }} value={h || ""} className="bg-white w-full py-3 px-4  pl-3 text-[16px] md:text-[18px] text-[#978e8e] font-bold placeholder:text-[#978e8e]  rounded-xl" placeholder="Claim a handle" />
              </div>
              <button disabled={!(h.length)} onClick={() => { router.push(`/generate?handle=${h}`) }} className="w-full md:w-[35%] py-3 text-[14px] md:text-[16px] bg-[#f4adf4] font-bold rounded-3xl hover:scale-[0.97] transition">Claim your tree</button>
            </div>
          </div>

          <div className="  block w-[90%] md:w-[40%] relative   items-center mt-10 md:mt-[20vh] px-5">
            <CircularText
              text="SOCIO*TREE*EASY*LINKING*"
              onHover="speedUp"
              spinDuration={60}
              className="custom-class "
            />
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col items-center justify-center">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[80px] md:h-[80px] w-[50px] h-[50px]">
                {/* Clover Leaves */}
                <circle cx="50" cy="22" r="18" fill="#39E09B" />
                <circle cx="78" cy="50" r="18" fill="#39E09B" />
                <circle cx="22" cy="50" r="18" fill="#39E09B" />
                <circle cx="50" cy="78" r="18" fill="#39E09B" />
                {/* Connecting Stem */}
                <path
                  d="M35 35C35 35 65 35 65 50C65 65 35 65 35 80"
                  stroke="white"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <circle cx="50" cy="50" r="8" fill="white" />
              </svg>
            </div>



          </div>

        </section>

        <section className="w-full h-fit flex flex-col bg-[#852bed] justify-center py-20">
          <div className="container w-[90vw] my-auto mx-auto flex flex-col ">
            <div className="w-full flex flex-col gap-y-8  justify-center items-center">
              <div className="text-[#f4adf4] font-[Linksans Linksansvf] text-center w-full font-extrabold leading-tight text-[40px]  h-fit md:text-[45px] lg:text-[60px]">
                Jumpstart your corner of the<br />  internet today
              </div>
              <div className="flex gap-x-2 items-center justify-center md:flex-row flex-col gap-y-5 ">
                <div className=" relative h-10">
                  <input onChange={(e) => { setoldhan(e.target.value) }} value={oldhan || ""} className="bg-white h-10  font-bold text-[#978e8e] py-5 text-[19px] pl-5 rounded-xl" type="text" placeholder="Enter Your handle" />
                </div>
                <button disabled={!(oldhan.length)} onClick={() => { checkhandle() }} className=" h-10 font-bold text-[19px] bg-[#ff5512] px-5 rounded-3xl transition duration-150 active:scale-90 active:cursor-pointer hover:cursor-pointer ">GO!!</button>

              </div>
              {(!check1) && (
                <>
                  <div className="flex flex-col justify-center items-center gap-y-5">
                    <div className="font-bold text-red-800">This Handle does not exist please create one</div>
                    <div className="flex md:flex-row flex-col gap-y-5 justify-center items-center gap-x-2 ">
                      <div className=" relative h-12">
                        <input onKeyUp={(e) => {
                          if (e.key === "Enter") {

                            router.push(`${process.env.NEXT_PUBLIC_HOST}generate/?handle=${h}`)
                          }
                        }}
                          onChange={(e) => { seth(e.target.value) }} value={h || ""} className="bg-white h-12 pl-3  font-bold text-[#978e8e] py-5 text-[19px] placeholder:text-[#978e8e] rounded-xl" placeholder="Claim your handle" type="text" />
                      </div>
                      <button disabled={!(h.length)} onClick={() => { router.push(`${process.env.NEXT_PUBLIC_HOST}generate/?handle=${h}`) }} className=" h-12 font-bold text-[19px] bg-[#ebff12] px-7 rounded-3xl transition duration-150 active:scale-90 active:cursor-pointer hover:cursor-pointer ">Claim your tree</button>

                    </div>


                  </div>

                </>
              )}





            </div>


          </div>
        </section>
        <section id="features" className="w-full md:h-[75vh] h-fit flex flex-col bg-[#670909] items-center py-20">
          <div className="container w-[90vw]  mx-auto flex space-y-35 flex-col ">
            <div className="text-[white] font-[Linksans text-center Linksansvf] md:ml-6  w-full font-extrabold  text-[25px]  h-fit md:text-[38px] lg:text-[45px]">Features</div>
            <div className="w-full flex flex-col   md:flex-row gap-y-50  md:gap-x-30   justify-center items-center mt-5">
              <div className="flex flex-col h-12 justify-center items-center text-center gap-x-3 md:gap-y-6">
                <Image src="/easy.png" alt="Easy to use" width={100} height={100}></Image>
                <span className="text-white text-[20px] font-bold ">Simple and Easy</span>
                <span className={`${Pop.className} text-white text-[16px]`}>Easy to handle all your socials</span>
              </div>
              <div className="flex flex-col h-12 justify-center items-center text-center gap-x-3 md:gap-y-6">
                <Image src="/social-media.png" alt="Customizable" width={100} height={100}></Image>
                <span className="text-white text-[20px] font-bold ">Linking-Socials</span>
                <span className={`${Pop.className} text-white text-[16px]`}>Link all your socials in one handle</span>
              </div>
              <div className="flex flex-col h-12 justify-center items-center text-center gap-x-3 md:gap-y-6">
                <Image className="invert" src="/social.png" alt="Secure" width={100} height={100} ></Image>
                <span className="text-white text-[20px] font-bold ">Easy Socializing</span>
                <span className={`${Pop.className} text-white text-[16px]`}>Share your handles</span>
              </div>

            </div>
          </div>

        </section>




      </main>
      <Footer />

    </>

  );
}
