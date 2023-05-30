"use client"

import { useState } from "react"
import PlaylistTable from "../components/PlaylistTable"
import PromptDesc from "../components/PromptDesc"
import SpotifyPlayer from "../components/SpotifyPlayer"
import TextInput from "../components/TextInput"

export default function Home() {
  const [songsArr, setSongsArr] = useState<Song[]>([])

  // do stuff with the songsArr re: Spotify API

  console.log("songs:", songsArr)

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
