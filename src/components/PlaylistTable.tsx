import { useSession } from "next-auth/react"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

type Props = {
  setPlaylistEmbedId: Dispatch<SetStateAction<string>>
  songsArr: Song[]
  setSongsArr: Dispatch<SetStateAction<Song[]>>
  setIsPlaylistAdded: Dispatch<SetStateAction<boolean>>
  setStatus: Dispatch<SetStateAction<"idle" | "loading" | "success" | "error">>
}

function PlaylistTable({
  songsArr,
  setPlaylistEmbedId,
  setSongsArr,
  setIsPlaylistAdded,
  setStatus,
}: Props) {
  const { data: session } = useSession()
  const token = session?.accessToken

  const handleClick = async () => {
    let response = await fetch(
      `https://api.spotify.com/v1/users/${session?.user?.name}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: songsArr[0].playlist_title,
        }),
      }
    )
    let data = await response.json()
    const playlistId = data.id
    // console.log("playlistId:", playlistId)

    // SPOTIFY URI search, since GPT URI fetch sucks
    const spotifyUriList: string[] = []
    const results = songsArr.map(async (song) => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=track%3A${encodeURIComponent(
            song.title
          )} artist%3A${encodeURIComponent(song.artist)} &type=track`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        const data = await response.json()

        if (!data.tracks.items.length) {
          throw new Error(`couldn't find ${song.title}`)
        }

        const track_uri = data.tracks.items[0].uri
        return track_uri
      } catch (error) {
        console.error(`error while fetching: ${error}`)
      }
    })

    Promise.all(results)
      .then((trackUris) => {
        // Filter out undefined results (in case of error in fetching a song)
        const validTrackUris = trackUris.filter(Boolean)

        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: validTrackUris,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data)
            setPlaylistEmbedId(playlistId)
            setSongsArr([])
            setIsPlaylistAdded(true)
            setStatus("idle")
          })
          .catch((error) =>
            console.error(
              `Error occurred while updating the playlist: ${error}`
            )
          )
      })
      .catch((error) =>
        console.error(`Error occurred while processing the songs: ${error}`)
      )
  }

  return (
    // return it in a table & add a button to save playlist
    <div className="flex flex-col items-end lowercase">
      <button
        onClick={handleClick}
        className="mb-4 flex justify-between p-1 text-sm font-light bg-accent_1 text-white hover:opacity-50 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        <Image
          src={"/create_jams.svg"}
          alt="save playlist"
          width={125}
          height={100}
        />
      </button>
      <div className="max-h-[50vh] overflow-y-auto self-stretch">
        <table className="w-full border-collapse text-white text-sm leading-4 font-light">
          <thead>
            <tr className="py-2 px-4 text-left underline decoration-accent_2">
              <th>Title</th>
              <th>Album</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {songsArr.map((song) => (
              <tr key={song.id} className="border-b">
                <td className="py-2 ">
                  {song.title}
                  <br />
                  <span className="text-xs">{song.artist}</span>
                </td>
                <td className="text-xs">{song?.album}</td>
                <td>{song?.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlaylistTable
