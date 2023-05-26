import React from "react"

function SpotifyPlayer() {
  return (
    <div>
      <iframe
        className=""
        src="https://open.spotify.com/embed/playlist/31OIme0YdF4ORWvEdTyE6V"
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
