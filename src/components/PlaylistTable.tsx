import React from "react"

function PlaylistTable({ songsArr }: SongsList) {
  return (
    <div>
      {songsArr.map((song) => (
        <div key={song.id}>
          <span>Title: {song.title}</span>
          <span>Artist: {song.artist}</span>
          <span>Album: {song?.album}</span>
          <span>Duration: {song?.duration}</span>
        </div>
      ))}
    </div>
  )
}

export default PlaylistTable
