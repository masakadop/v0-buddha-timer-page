"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { JizoCountdown } from "@/components/jizo-countdown"
import { JizoAvatar } from "@/components/jizo-avatar"
import { ZenBackground } from "@/components/zen-background"

function parseStartDate(searchParams: URLSearchParams): Date {
  const year = searchParams.get("year")
  const month = searchParams.get("month")
  const day = searchParams.get("day")
  const hour = searchParams.get("hour")
  const minute = searchParams.get("minute")

  if (year && month && day) {
    const parsedYear = parseInt(year, 10)
    const parsedMonth = parseInt(month, 10) - 1 // Month is 0-indexed
    const parsedDay = parseInt(day, 10)
    const parsedHour = hour ? parseInt(hour, 10) : 0
    const parsedMinute = minute ? parseInt(minute, 10) : 0

    const date = new Date(parsedYear, parsedMonth, parsedDay, parsedHour, parsedMinute, 0)
    if (!isNaN(date.getTime())) {
      return date
    }
  }

  return new Date()
}

function hasValidStartDate(searchParams: URLSearchParams): boolean {
  const year = searchParams.get("year")
  const month = searchParams.get("month")
  const day = searchParams.get("day")

  if (!year || !month || !day) {
    return false
  }

  const parsedDate = parseStartDate(searchParams)
  return !isNaN(parsedDate.getTime())
}

function buildStartDateParams(date: Date): URLSearchParams {
  const params = new URLSearchParams()
  params.set("year", date.getFullYear().toString())
  params.set("month", (date.getMonth() + 1).toString())
  params.set("day", date.getDate().toString())
  params.set("hour", date.getHours().toString())
  params.set("minute", date.getMinutes().toString())
  return params
}

function formatDateDisplay(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  if (hour === 0 && minute === 0) {
    return `${year}年${month}月${day}日より`
  }
  return `${year}年${month}月${day}日 ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}より`
}

function JizoContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!hasValidStartDate(searchParams)) {
      const initialAccessDate = new Date()
      setStartDate(initialAccessDate)
      router.replace(`${pathname}?${buildStartDateParams(initialAccessDate).toString()}`)
      setMounted(true)
      return
    }

    setStartDate(parseStartDate(searchParams))
    setMounted(true)
  }, [pathname, router, searchParams])

  if (!mounted || !startDate) {
    return null
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <ZenBackground />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        {/* Title */}
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm tracking-widest">{formatDateDisplay(startDate)}</p>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-foreground tracking-wide">お地蔵様になりました</h1>
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

export default function Home() {
  return (
    <Suspense fallback={null}>
      <JizoContent />
    </Suspense>
  )
}
