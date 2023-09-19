"use client"
import { useState } from "react"
import LoadingScreen from "../components/LoadingScreen"
import PlaylistTable from "../components/PlaylistTable"
import PromptDesc from "../components/PromptDesc"
import SpotifyPlayer from "../components/SpotifyPlayer"
import TextInput from "../components/TextInput"

export default function Home() {
  const [songsArr, setSongsArr] = useState<Song[]>([])
  const [playlistEmbedId, setPlaylistEmbedId] = useState("")
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const [isPlaylistAdded, setIsPlaylistAdded] = useState(false)

  // if 'idle' -> <PromptDesc />
  // if 'loading' -> <LoadingScreen /> & <TextInput button loading
  // if 'success' -> <PlaylistTable />

  return (
    <>
      <div className="flex-1 flex flex-col space-y-8 px-4 ">
        {playlistEmbedId && <SpotifyPlayer playlistEmbedId={playlistEmbedId} />}
        {status === "idle" && <PromptDesc />}
        {status === "loading" && <LoadingScreen />}
        {status === "success" && (
          <PlaylistTable
            songsArr={songsArr}
            setPlaylistEmbedId={setPlaylistEmbedId}
            setSongsArr={setSongsArr}
            setIsPlaylistAdded={setIsPlaylistAdded}
            setStatus={setStatus}
          />
        )}
      </div>
      <div>
        <TextInput
          status={status}
          setSongsArr={setSongsArr}
          setPlaylistEmbedId={setPlaylistEmbedId}
          setStatus={setStatus}
        />
      </div>
    </>
  )
}
