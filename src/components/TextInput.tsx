"use client"
import Image from "next/image"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { buildPrompt } from "../lib/buildPrompt"
import { sendPrompt } from "../lib/sendPrompt"

type Props = {
  setSongsArr: Dispatch<SetStateAction<Song[]>>
  setPlaylistEmbedId: Dispatch<SetStateAction<string>>
}

function TextInput({ setSongsArr, setPlaylistEmbedId }: Props) {
  const [input, setInput] = useState("")

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault()

    if (!input) {
      return
    }

    const prompt = buildPrompt(input)
    setInput("")

    const data = await sendPrompt(prompt)
    // console.log("generatedSongs:", data)
    setSongsArr(data)
    setPlaylistEmbedId("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bg_secondary text-gray-400 text-base p-4 flex flex-col"
    >
      <textarea
        className="p-2 bg-transparent resize-none focus:outline-none rounded-md"
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit(e)
          }
        }}
        // for fun, this could be using react typewriter lib
        placeholder={"Generate a hip-hop playlist featuring Baby Keem.."}
      />

      <button
        className="flex justify-between p-4 bg-accent_1 text-white hover:opacity-50 rounded disabled:bg-bg_tertiary disabled:cursor-not-allowed"
        disabled={!input}
        type="submit"
      >
        <Image
          src="/generate_jams.svg"
          alt="button_submit"
          width={150}
          height={100}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 -rotate-45 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  )
}

export default TextInput
