"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"

function Login() {
  return (
    <>
      <button
        className="flex gap-1 mx-4 py-2 px-4 text-[#bebebe] bg-bg_secondary justify-between items-center hover:bg-accent_1 hover:text-white rounded-full"
        onClick={() => signIn("spotify")}
      >
        <Image src={"/spot.svg"} alt="logo" width={36} height={36} />
        <p>sign-in with spotify</p>
      </button>
      <div></div>
      <div></div>
    </>
  )
}

export default Login
