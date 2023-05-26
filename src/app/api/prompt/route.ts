import openai from "@/src/lib/openai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { prompt } = await request.json()

  if (!prompt) {
    console.log("prompt not carrying over")
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 1000,
    temperature: 0,
  })

  const check = response.data
  console.log(check.choices[0].text)

  // return NextResponse.json(response.data.choices[0].text)
}
