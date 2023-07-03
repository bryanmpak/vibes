import React from "react"

const LoadingScreen = () => {
  return (
    <div className="border-bg-group max-w-[50vh] p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-4 bg-white/20 rounded col-span-1"></div>
            <div className="h-4 bg-white/20 rounded col-span-1"></div>
            <div className="h-4 bg-white/20 rounded col-span-1"></div>
          </div>
          <div className="space-y-2">
            <div className="h-5 bg-white/20 rounded"></div>
            <div className="h-[1px] bg-white/50"></div>
            <div className="h-5 bg-white/20 rounded"></div>
            <div className="h-[1px] bg-white/50"></div>
            <div className="h-5 bg-white/20 rounded"></div>
            <div className="h-[1px] bg-white/50"></div>
            <div className="h-5 bg-white/20 rounded"></div>
            <div className="h-[1px] bg-white/50"></div>
            <div className="h-5 bg-white/20 rounded"></div>
            <div className="h-[1px] bg-white/50"></div>
            <div className="h-5 bg-white/20 rounded"></div>
            <div className="h-[1px] bg-white/50"></div>
            <div className="h-5 bg-white/20 rounded"></div>
            <div className="h-[1px] bg-white/50"></div>
            <div className="h-5 bg-white/20 rounded"></div>
            <div className="h-[1px] bg-white/50"></div>
            <div className="h-5 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
