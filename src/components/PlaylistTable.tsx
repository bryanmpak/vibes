import Image from "next/image"
import React from "react"

function PlaylistTable({ songsArr }: SongsList) {
  // move to a separate custom hook
  // this one is fun since you need to do two separate, chained API calls

  async function handleClick({ songsArr }: SongsList) {
    let response = await fetch(
      //${user_id}
      `https://api.spotify.com/v1/users/bpakfasho/playlists`,
      {
        method: "POST",
        headers: {
          // ${access_token}
          Authorization: `Bearer enter_token_here`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: songsArr[0].playlist_title,
        }),
      }
    )
    let data = await response.json()
    //need to extract this from function - state for now? localStorage OR external db for later?
    const playlist_id = data.id

    const songsArrUri = songsArr.map((song) => [song.spotify_uri])
    console.log("spotify_tracks:", songsArrUri)

    response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: songsArrUri,
        }),
      }
    )

    data = await response.json()
    return data.snapshot_id
    // once this is done, change the embed link in <SpotifyPlayer />
  }

  return (
    // return it in a table & add a button to save playlist
    <div className="flex flex-col items-end">
      <button className="mb-4 flex justify-between p-1 text-sm font-light bg-accent_1 text-white hover:opacity-50 rounded">
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
          width={100}
          height={100}
        />
      </button>

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
              <td>{song?.album}</td>
              <td>{song?.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlaylistTable
