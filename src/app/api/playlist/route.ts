import { authOptions } from "@/src/lib/auth"
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { songsArr }: SongsList = req.body
  const session = await getServerSession(authOptions)

  // one step at a time:
  // 1. create playlist, return playlist id
  let response = await fetch(`https://api.spotify.com/v1/users/me/playlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
      "Content Type": "application/json",
    },
    body: JSON.stringify({
      name: songsArr[0].playlist_title,
    }),
  })
  let data = await response.json()
  const playlistId = data.id
  console.log(playlistId)

  // 2. extract playlist id, add it to embedded player
  // 3. add tracks to playlist
}

// let response = await fetch(
//   //${user_id}
//   `https://api.spotify.com/v1/users/me/playlists`,
//   {
//     method: "POST",
//     headers: {
//       // ${access_token}
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: songsArr[0].playlist_title,
//     }),
//   }
// )
// let data = await response.json()
// //need to extract this from function - state for now? localStorage OR external db for later?
// const playlistId = data.id

// const songsArrUri = songsArr.map((song) => song.spotify_uri)
// console.log("spotify_tracks:", songsArrUri)

// response = await fetch(
//   `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
//   {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       uris: songsArrUri,
//     }),
//   }
// )

// if (response.ok) {
//   // Then, return a response to the client-side with the playlistId
//   res.status(200).json({ message: "Playlist created", playlistId })
// } else {
//   // If the songs could not be added to the playlist, handle the error
//   res.status(500).json({ message: "Failed to add songs to the playlist" })
// }
