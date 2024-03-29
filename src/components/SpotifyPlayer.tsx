import React from "react"

type Props = {
  playlistEmbedId: String
}

// this doesn't work for mobile web - need alternate solution

function SpotifyPlayer({ playlistEmbedId }: Props) {
  return (
    <div>
      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlistEmbedId}`}
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
