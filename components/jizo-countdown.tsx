"use client"

import { useState, useEffect } from "react"

interface JizoCountdownProps {
  startDate: Date
}

// 弥勒菩薩が現れるまでの年数：五十六億七千万年
const YEARS_UNTIL_MAITREYA = 5_670_000_000
const SECONDS_PER_YEAR = 365 * 24 * 60 * 60
const SECONDS_PER_DAY = 24 * 60 * 60
const SECONDS_PER_HOUR = 60 * 60
const SECONDS_PER_MINUTE = 60

interface TimeRemaining {
  years: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeRemaining(startDate: Date): TimeRemaining {
  const now = new Date()
  const elapsedMs = Math.max(0, now.getTime() - startDate.getTime())
  const elapsedSeconds = Math.floor(elapsedMs / 1000)

  const elapsedYears = Math.floor(elapsedSeconds / SECONDS_PER_YEAR)
  const elapsedWithinYear = elapsedSeconds % SECONDS_PER_YEAR

  const hasRemainder = elapsedWithinYear > 0
  const remainingYears = Math.max(
    0,
    YEARS_UNTIL_MAITREYA - elapsedYears - (hasRemainder ? 1 : 0)
  )
  const remainingAfterYears =
    remainingYears === 0 && elapsedYears >= YEARS_UNTIL_MAITREYA
      ? 0
      : hasRemainder
        ? SECONDS_PER_YEAR - elapsedWithinYear
        : 0

  const remainingDays = Math.floor(remainingAfterYears / SECONDS_PER_DAY)
  const remainingAfterDays = remainingAfterYears % SECONDS_PER_DAY
  const remainingHours = Math.floor(remainingAfterDays / SECONDS_PER_HOUR)
  const remainingAfterHours = remainingAfterDays % SECONDS_PER_HOUR
  const remainingMinutes = Math.floor(remainingAfterHours / SECONDS_PER_MINUTE)
  const remainingSeconds = remainingAfterHours % SECONDS_PER_MINUTE

  return {
    years: remainingYears,
    days: remainingDays,
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
  }
}

function formatNumber(num: number, digits: number = 2): string {
  return num.toString().padStart(digits, "0")
}

function formatYears(years: number): string {
  return years.toLocaleString("ja-JP")
}

export function JizoCountdown({ startDate }: JizoCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(startDate)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(startDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  return (
    <div className="space-y-6">
      {/* Main countdown display */}
      <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-lg">
        <p className="text-xs text-muted-foreground mb-4 tracking-wider">
          成仏まであと
        </p>
        
        {/* Years - Large display */}
        <div className="mb-6">
          <div className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-primary tracking-tight">
            {formatYears(timeRemaining.years)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">年</div>
        </div>

        {/* Days, Hours, Minutes, Seconds */}
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          <TimeUnit value={timeRemaining.days} label="日" maxDigits={3} />
          <TimeUnit value={timeRemaining.hours} label="時間" />
          <TimeUnit value={timeRemaining.minutes} label="分" />
          <TimeUnit value={timeRemaining.seconds} label="秒" />
        </div>
      </div>

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full transition-all duration-1000"
            style={{ 
              width: `${((YEARS_UNTIL_MAITREYA - timeRemaining.years) / YEARS_UNTIL_MAITREYA) * 100}%`,
              minWidth: "0.5%"
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground/60">
          修行の進捗
        </p>
      </div>
    </div>
  )
}

function TimeUnit({ 
  value, 
  label, 
  maxDigits = 2 
}: { 
  value: number
  label: string
  maxDigits?: number
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-muted/50 rounded-lg px-3 py-2 md:px-4 md:py-3 w-full">
        <span className="text-xl md:text-2xl font-mono font-semibold text-foreground">
          {formatNumber(value, maxDigits)}
        </span>
      </div>
      <span className="text-xs text-muted-foreground mt-1.5">{label}</span>
    </div>
  )
}
