import openai from "@/lib/openai"

export async function POST(request: Request) {
  const { prompt } = await request.json()

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 3000,
    temperature: 0,
  })

  return new Response(JSON.stringify(response))
}
