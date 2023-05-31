export const apiHelper = async (prompt: string, route: string) => {
  try {
    const response = await fetch("/api/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      console.error("fetch operation failed with status: ", response.status)
      return
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("fetch operation failed: ", error)
  }
}
