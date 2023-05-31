interface Song {
  id: number
  playlist_title: string
  spotify_uri: string
  title: string
  artist: string
  album?: string
  duration?: string
}

interface SongsList {
  songsArr: Song[]
}
