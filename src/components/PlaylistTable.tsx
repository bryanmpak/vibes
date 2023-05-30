import Image from "next/image"
import React from "react"

function PlaylistTable({ songsArr }: SongsList) {
  return (
    // return it in a table & add a button to save playlist
    <div className="flex flex-col items-end">
      <button className="mb-4 flex justify-between p-1 text-sm font-light bg-accent_1 text-white hover:opacity-50 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        <Image
          src={"/create_jams.svg"}
          alt="save playlist"
          width={75}
          height={50}
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
