"use client"
import Image from "next/image"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { buildPrompt } from "../lib/buildPrompt"
import { sendPrompt } from "../lib/sendPrompt"

type Props = {
  setSongsArr: Dispatch<SetStateAction<Song[]>>
  setPlaylistEmbedId: Dispatch<SetStateAction<string>>
  status: "idle" | "loading" | "success" | "error"
  setStatus: Dispatch<SetStateAction<"idle" | "loading" | "success" | "error">>
}

function TextInput({
  setSongsArr,
  setPlaylistEmbedId,
  setStatus,
  status,
}: Props) {
  const [input, setInput] = useState("")

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault()

    if (!input) {
      return
    }

    setStatus("loading")
    const prompt = buildPrompt(input)
    setInput("")

    const data = await sendPrompt(prompt)
    console.log("generatedSongs:", data)
    setSongsArr(data)
    setPlaylistEmbedId("")
    setStatus("success")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-0 bg-bg_secondary text-gray-400 text-base p-4 flex flex-col"
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
        className="flex justify-between p-4 h-[58px] bg-accent_1 text-white hover:opacity-50 rounded disabled:bg-bg_tertiary disabled:cursor-not-allowed"
        disabled={!input}
        type="submit"
      >
        {status === "loading" ? <LoadingStatus /> : <LoadedStatus />}
      </button>
    </form>
  )
}

const LoadedStatus = () => {
  return (
    <>
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
    </>
  )
}

const LoadingStatus = () => {
  return (
    <>
      <Image src="/loading.svg" alt="button_submit" width={150} height={100} />
      <svg className="animate-spin h-5 w-5 ml-2 text-white" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </>
  )
}

export default TextInput
