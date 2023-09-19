import openai from "@/src/lib/openai"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 0,
    })
    console.log(response)
    const responseData = response.choices[0]?.text || "[]"
    console.log("promptResponse:", responseData, "type:", typeof responseData)
    const jsonData = JSON.parse(responseData)
    // console.log(jsonData)

    // .json() is an async method that returns a promise with JSON object
    return NextResponse.json(jsonData)
  } catch (error) {
    return NextResponse.error()
  }
}

// might need to stream in the response, save it in state & pass to songsArr once done
// as a workaround the vercel timeout limitation...
