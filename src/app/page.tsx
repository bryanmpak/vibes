"use client"

import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { useState } from "react"
import PlaylistTable from "../components/PlaylistTable"
import PromptDesc from "../components/PromptDesc"
import SpotifyPlayer from "../components/SpotifyPlayer"
import TextInput from "../components/TextInput"
import { authOptions } from "../lib/auth"

export default function Home() {
  const [songsArr, setSongsArr] = useState<Song[]>([])
  const { data: session } = useSession()
  console.log("sessionData:", session)

  // console.log("songs:", songsArr)

  return (
    <div className="flex-1 flex flex-col space-y-8 px-4 ">
      {/* change this so that it's either spotify player OR prompt instructions */}
      <SpotifyPlayer />
      {songsArr.length === 0 ? (
        <PromptDesc />
      ) : (
        <PlaylistTable songsArr={songsArr} />
      )}
      <TextInput setSongsArr={setSongsArr} />
    </div>
  )
}
