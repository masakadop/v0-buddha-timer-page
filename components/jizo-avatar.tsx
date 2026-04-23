"use client"

import { useEffect, useState } from "react"

export function JizoAvatar() {
  const [isGlowing, setIsGlowing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing(prev => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* Halo/Aura effect */}
      <div 
        className={`absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all duration-1000 ${
          isGlowing ? "scale-125 opacity-60" : "scale-100 opacity-30"
        }`}
      />
      
      {/* Main Jizo illustration */}
      <div className="relative w-32 h-40 md:w-40 md:h-48">
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Halo circle */}
          <circle
            cx="50"
            cy="35"
            r="28"
            className="stroke-primary/30"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Head */}
          <ellipse
            cx="50"
            cy="32"
            rx="18"
            ry="20"
            className="fill-muted stroke-muted-foreground/40"
            strokeWidth="1"
          />
          
          {/* Peaceful eyes (closed) */}
          <path
            d="M42 30 Q44 32 46 30"
            className="stroke-muted-foreground/60"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M54 30 Q56 32 58 30"
            className="stroke-muted-foreground/60"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Gentle smile */}
          <path
            d="M45 38 Q50 42 55 38"
            className="stroke-muted-foreground/60"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Body/Robe */}
          <path
            d="M32 52 Q30 80 35 110 L65 110 Q70 80 68 52 Q60 48 50 48 Q40 48 32 52"
            className="fill-muted stroke-muted-foreground/40"
            strokeWidth="1"
          />
          
          {/* Robe details */}
          <path
            d="M40 55 Q50 60 60 55"
            className="stroke-muted-foreground/30"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M38 70 Q50 75 62 70"
            className="stroke-muted-foreground/30"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Hands in prayer position */}
          <ellipse
            cx="50"
            cy="72"
            rx="6"
            ry="8"
            className="fill-muted stroke-muted-foreground/40"
            strokeWidth="1"
          />
          
          {/* Staff (shakujo) */}
          <line
            x1="75"
            y1="25"
            x2="75"
            y2="105"
            className="stroke-muted-foreground/50"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Staff rings */}
          <circle cx="75" cy="20" r="4" className="stroke-muted-foreground/50 fill-none" strokeWidth="1" />
          <circle cx="75" cy="12" r="3" className="stroke-muted-foreground/50 fill-none" strokeWidth="1" />
        </svg>
      </div>

      {/* Subtle floating animation indicator */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-muted-foreground/10 rounded-full blur-sm" />
    </div>
  )
}
