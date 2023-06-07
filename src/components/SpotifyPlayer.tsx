import React from "react"

type Props = {
  playlistEmbedId: String
}

function SpotifyPlayer(playlistEmbedId: Props) {
  return (
    <div>
      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlistEmbedId}?utm_source=generator`}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default SpotifyPlayer
