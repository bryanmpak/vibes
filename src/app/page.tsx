import SpotifyPlayer from "../components/SpotifyPlayer"

export default function Home() {
  return (
    <div className="flex-1 flex flex-col space-y-8 px-4 ">
      {/* change this so that it's either spotify player OR prompt instructions */}
      <SpotifyPlayer />

      <div className="gap-2 text-white">
        <p className="mb-2">
          Create a playlist using the following attributes:
        </p>
        {/* Tone/Genre/Occasion/Setting/Featuring Wildcard */}
        <div className="infoText">
          <h2 className=" underline decoration-accent_1">tone:</h2>
          <p className="text-sm font-light">
            Bright, Energetic, Meloncholy, Pensive, etc
          </p>
        </div>
        <div className="infoText">
          <h2 className=" underline decoration-accent_1">genre:</h2>
          <p className="text-sm font-light">
            Hip-hop, R&B, Soul, Pop, K-Pop, etc
          </p>
        </div>
        <div className="infoText">
          <h2 className=" underline decoration-accent_1">occasion:</h2>
          <p className="text-sm font-light">
            Cruising, Working, Working out, etc{" "}
          </p>
        </div>
        <div className="infoText">
          <h2 className=" underline decoration-accent_1">setting:</h2>
          <p className="text-sm font-light">
            At the desk, In the car, In the gym, etc{" "}
          </p>
        </div>
      </div>
    </div>
  )
}
