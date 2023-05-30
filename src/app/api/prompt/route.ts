import openai from "@/src/lib/openai"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 3000,
      temperature: 0,
    })
    console.log("endpoint:", response.data.choices[0].text)
    const responseData = response.data.choices[0].text
    const jsonData = responseData ? JSON.parse(responseData) : []
    return NextResponse.json(jsonData)
  } catch (error) {
    console.error(error)
  }
}

// EXPERIMENTAL API SHIT - IGNORE & REVISIT LATER
// export async function POST(request: Request) {
//   const { prompt } = await request.json()

//   if (!prompt) {
//     console.log("prompt not carrying over")
//   }

//   const res = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt,
//     max_tokens: 1000,
//     temperature: 0,
//   })

//   const data = await res.data.choices[0].text

//   return NextResponse.json(data)
// }
