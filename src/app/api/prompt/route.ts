import openai from "@/src/lib/openai"
import { NextRequest, NextResponse } from "next/server"

export const config = {
  runtime: "edge",
}

export default async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 3000,
      temperature: 0,
    })
    const responseData = response.data.choices[0]?.text || "[]"
    console.log("promptResponse:", responseData, "type:", typeof responseData)
    const jsonData = JSON.parse(responseData)
    console.log(jsonData)

    // .json() is an async method that returns a promise with JSON object
    return NextResponse.json(jsonData)
  } catch (error) {
    return NextResponse.error()
  }
}
