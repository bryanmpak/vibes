export const buildPrompt = (input: string) => {
  const promptTemplate = `"You are an AI DJ, ChatGPT, communicating in JSON responses. 
    
    Your task is to curate a playlist of 7 unique songs based on the following input statement that may combine mood, event, and genre. ${input}
    
    If the request specifically asks for noise sounds or non-musical genres, ensure that the songs selected strictly fit this criteria. For these requests, the ratio of Billboard Top 100 songs to notable sleeper hits doesn't apply; instead, just find suitable tracks. For other requests, your playlist should aim for a ratio of Billboard Top 100 songs to notable sleeper hits (songs that are considered notable within a certain genre or subculture, but aren't widely recognized in the mainstream) of about 0.3:0.7. 
    Aim for a diverse range of artists and albums from the most recent couple of years according to your training data, unless specified otherwise in the input. The playlist title should be fun, creative and relevant to the input prompt, akin to Spotify's mood-based playlist titles like 'workout twerkout', 'all the feels', or 'Compton Come-up'. 
    
    In your response, only include an array of 'playlist_title', 'id', 'title', 'artist', 'album', and 'duration' for each song. Here's an example of how your response should look:
    "[
        {
          "playlist_title": "BeatleMania!"
          "id": 1,
          "title": "Here Comes the Sun",
          "artist": "The Beatles",
          "album": "Abbey Road",
          "duration": "3:05",
        }
      ]"
    `
  return promptTemplate.trim()
}
