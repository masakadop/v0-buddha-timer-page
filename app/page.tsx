"use client"

import { useState, useEffect } from "react"
import { JizoCountdown } from "@/components/jizo-countdown"
import { JizoAvatar } from "@/components/jizo-avatar"
import { ZenBackground } from "@/components/zen-background"

export default function Home() {
  const [startDate] = useState(() => new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <ZenBackground />
      
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        {/* Title */}
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm tracking-widest">
            本日より
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-foreground tracking-wide">
            お地蔵様になりました
          </h1>
        </div>

        {/* Jizo Avatar */}
        <JizoAvatar />

        {/* Countdown Timer */}
        <JizoCountdown startDate={startDate} />

        {/* Footer Message */}
        <div className="mt-8 max-w-md space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            弥勒菩薩が現れるまでの五十六億七千万年間、
            <br />
            衆生を救い続けます
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
            <span className="w-8 h-px bg-muted-foreground/30" />
            <span>南無地蔵大菩薩</span>
            <span className="w-8 h-px bg-muted-foreground/30" />
          </div>
        </div>
      </div>
    </main>
  )
}
