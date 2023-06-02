import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { SongsList } from "@/typings"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const userId = session?.user?.name
  const accessToken = session?.accessToken

  // You would get the songsArr from the request body, which is sent from the client-side
  const { songsArr }: SongsList = req.body

  // Include the rest of your Spotify API interaction logic here, using the access token
  let response = await fetch(
    //${user_id}
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        // ${access_token}
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: songsArr[0].playlist_title,
      }),
    }
  )
  let data = await response.json()
  //need to extract this from function - state for now? localStorage OR external db for later?
  const playlistId = data.id

  const songsArrUri = songsArr.map((song) => song.spotify_uri)
  console.log("spotify_tracks:", songsArrUri)

  response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: songsArrUri,
      }),
    }
  )

  if (response.ok) {
    // Then, return a response to the client-side with the playlistId
    res.status(200).json({ message: "Playlist created", playlistId })
  } else {
    // If the songs could not be added to the playlist, handle the error
    res.status(500).json({ message: "Failed to add songs to the playlist" })
  }
}
