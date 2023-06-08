"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"
import Navbar from "@/src/components/Navbar"

function Login() {
  return (
    <>
      <main className="flex max-w-[500px] h-screen flex-col justify-center items-center bg-bg_main">
        <Navbar />
        <button
          className="flex w-3/5 gap-1 mx-4 py-2 px-4 text-[#bebebe] bg-bg_secondary justify-between items-center hover:bg-accent_1 hover:text-white rounded"
          onClick={() => signIn("spotify")}
        >
          <Image src={"/spot.svg"} alt="logo" width={36} height={36} />
          <p>sign-in with spotify</p>
        </button>
      </main>
    </>
  )
}

export default Login
