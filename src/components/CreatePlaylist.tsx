import Image from "next/image"
import React from "react"

function CreatePlaylist() {
  return (
    <div>
      <button
        // disabled:bg-bg_tertiary disabled:cursor-not-allowed
        className="flex justify-between p-4 bg-accent_1 text-white hover:opacity-50 rounded"
        type="submit"
      >
        <Image
          src="/create_jams.svg"
          alt="button_submit"
          width={150}
          height={100}
        />
      </button>
    </div>
  )
}

export default CreatePlaylist
