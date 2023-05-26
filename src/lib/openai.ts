import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  organization: "org-eDLqo7gNk9krV4RcMjDL1RrN",
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default openai
