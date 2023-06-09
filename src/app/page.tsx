"use client"
import { signOut } from "next-auth/react"
import { useState } from "react"
import PlaylistTable from "../components/PlaylistTable"
import PromptDesc from "../components/PromptDesc"
import SpotifyPlayer from "../components/SpotifyPlayer"
import TextInput from "../components/TextInput"

export default function Home() {
  const [songsArr, setSongsArr] = useState<Song[]>([])
  const [playlistEmbedId, setPlaylistEmbedId] = useState("")

  return (
    <div className="flex-1 flex flex-col space-y-8 px-4 ">
      {playlistEmbedId && <SpotifyPlayer playlistEmbedId={playlistEmbedId} />}
      {songsArr.length === 0 ? (
        <PromptDesc />
      ) : (
        !playlistEmbedId && (
          <PlaylistTable
            songsArr={songsArr}
            setPlaylistEmbedId={setPlaylistEmbedId}
          />
        )
      )}
      <TextInput setSongsArr={setSongsArr} />
      <button className="w-4 h-4" onClick={() => signOut()} />
    </div>
  )
}
