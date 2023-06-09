"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"
import Navbar from "@/src/components/Navbar"

function Login() {
  return (
    <>
      <main className="h-screen bg-bg_main flex flex-col justify-center items-center">
        <div className="max-w-[500px] ">
          <Navbar />
          <button
            className="flex gap-1 mx-4 py-2 px-4 text-[#bebebe] bg-bg_secondary justify-between items-center hover:bg-accent_1 hover:text-white rounded"
            onClick={() => signIn("spotify")}
          >
            <Image src={"/spot.svg"} alt="logo" width={36} height={36} />
            <p>sign-in with spotify</p>
          </button>
        </div>
      </main>
    </>
  )
}

export default Login
