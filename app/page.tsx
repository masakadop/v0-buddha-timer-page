"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { JizoCountdown } from "@/components/jizo-countdown"
import { JizoAvatar } from "@/components/jizo-avatar"
import { ZenBackground } from "@/components/zen-background"

interface StartDateParts {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

function parseStartDate(searchParams: URLSearchParams): Date {
  const year = searchParams.get("year")
  const month = searchParams.get("month")
  const day = searchParams.get("day")
  const hour = searchParams.get("hour")
  const minute = searchParams.get("minute")
  const second = searchParams.get("second")

  if (year && month && day) {
    const parsedYear = parseInt(year, 10)
    const parsedMonth = parseInt(month, 10) - 1 // Month is 0-indexed
    const parsedDay = parseInt(day, 10)
    const parsedHour = hour ? parseInt(hour, 10) : 0
    const parsedMinute = minute ? parseInt(minute, 10) : 0
    const parsedSecond = second ? parseInt(second, 10) : 0

    const date = new Date(parsedYear, parsedMonth, parsedDay, parsedHour, parsedMinute, parsedSecond)
    if (!isNaN(date.getTime())) {
      return date
    }
  }

  return new Date(Date.now() - 1000)
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
  params.set("second", date.getSeconds().toString())
  return params
}

function toStartDateParts(date: Date): StartDateParts {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  }
}

function JizoContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [startDateParts, setStartDateParts] = useState<StartDateParts | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!hasValidStartDate(searchParams)) {
      const initialAccessDate = new Date()
      setStartDate(initialAccessDate)
      setStartDateParts(toStartDateParts(initialAccessDate))
      router.replace(`${pathname}?${buildStartDateParams(initialAccessDate).toString()}`)
      setMounted(true)
      return
    }

    const parsedStartDate = parseStartDate(searchParams)
    setStartDate(parsedStartDate)
    setStartDateParts(toStartDateParts(parsedStartDate))
    setMounted(true)
  }, [pathname, router, searchParams])

  const updateStartDatePart = (part: keyof StartDateParts, value: number) => {
    if (!startDateParts || !Number.isFinite(value)) {
      return
    }

    const nextParts = {
      ...startDateParts,
      [part]: value,
    }
    const nextDate = new Date(
      nextParts.year,
      nextParts.month - 1,
      nextParts.day,
      nextParts.hour,
      nextParts.minute,
      nextParts.second
    )

    if (isNaN(nextDate.getTime())) {
      return
    }

    const normalizedParts = toStartDateParts(nextDate)
    setStartDateParts(normalizedParts)
    setStartDate(nextDate)
    router.replace(`${pathname}?${buildStartDateParams(nextDate).toString()}`)
  }

  if (!mounted || !startDate || !startDateParts) {
    return null
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <ZenBackground />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
        {/* Title */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground tracking-widest">
            <DatePartInput
              value={startDateParts.year}
              unit="年"
              min={1}
              onChange={(nextValue) => updateStartDatePart("year", nextValue)}
            />
            <DatePartInput
              value={startDateParts.month}
              unit="月"
              min={1}
              max={12}
              onChange={(nextValue) => updateStartDatePart("month", nextValue)}
            />
            <DatePartInput
              value={startDateParts.day}
              unit="日"
              min={1}
              max={31}
              onChange={(nextValue) => updateStartDatePart("day", nextValue)}
            />
            <span> </span>
            <DatePartInput
              value={startDateParts.hour}
              unit="時"
              min={0}
              max={23}
              onChange={(nextValue) => updateStartDatePart("hour", nextValue)}
            />
            <DatePartInput
              value={startDateParts.minute}
              unit="分"
              min={0}
              max={59}
              onChange={(nextValue) => updateStartDatePart("minute", nextValue)}
            />
            <DatePartInput
              value={startDateParts.second}
              unit="秒"
              min={0}
              max={59}
              onChange={(nextValue) => updateStartDatePart("second", nextValue)}
            />
            <span>より</span>
          </div>
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

function DatePartInput({
  value,
  unit,
  onChange,
  min,
  max,
}: {
  value: number
  unit: string
  onChange: (value: number) => void
  min: number
  max?: number
}) {
  return (
    <label className="inline-flex items-center gap-1">
      <input
        type="number"
        inputMode="numeric"
        value={value}
        min={min}
        max={max}
        onChange={(event) => {
          const parsedValue = parseInt(event.target.value, 10)
          if (!isNaN(parsedValue)) {
            onChange(parsedValue)
          }
        }}
        className="w-16 rounded-md border border-border/60 bg-background/70 px-2 py-1 text-center text-sm text-foreground"
      />
      <span>{unit}</span>
    </label>
  )
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <JizoContent />
    </Suspense>
  )
}
