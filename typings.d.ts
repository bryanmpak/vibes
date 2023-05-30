interface Song {
  id: number
  spotify_uri: string
  title: string
  artist: string
  album?: string
  duration?: string
}

interface SongsList {
  songsArr: Song[]
}
