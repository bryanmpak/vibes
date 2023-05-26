"use client"
import Image from "next/image"
import { FormEvent, useState } from "react"

function TextInput() {
  const [input, setInput] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault

    if (!input) {
      return
    }

    const inputEnhanced = `You are an assistant that only responds in JSON. Create a list of 3 unique songs based off the following statement: "${input}". Include "id", "title", "artist", "album" in your response. An example response is:
      "[
        {
            "id": 1,
            "title": "Hey Jude",
            "artist": "The Beatles",
            "album": "The Beatles (White Album)",
            "duration": "4:56"
        }
      ]".`

    const prompt = inputEnhanced.trim()

    setInput("")

    await fetch("/api/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    })
    // .then((data) => console.log(data))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bg_secondary text-gray-400 text-sm p-4 flex flex-col"
    >
      <textarea
        className="p-2 bg-transparent resize-none focus:outline-none rounded-md"
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        // for fun, this could be using react typewriter lib
        placeholder="Generate a hip-hop playlist featuring Baby Keem.."
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
