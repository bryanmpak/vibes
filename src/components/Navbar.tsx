"use client"

import Image from "next/image"

function Navbar() {
  return (
    <div className="mx-auto">
      <Image src="/vibes_alt.svg" alt="logo" height={100} width={250} />
    </div>
  )
}

export default Navbar
