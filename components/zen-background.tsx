"use client"

export function ZenBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      
      {/* Floating clouds/mist */}
      <div className="absolute top-20 left-10 w-64 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-48 h-24 bg-muted-foreground/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-1/4 w-56 h-28 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
      
      {/* Mountain silhouette at bottom */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-32 text-muted/50"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,120 L0,80 Q180,40 360,60 T720,50 T1080,70 T1440,55 L1440,120 Z" />
      </svg>
      
      {/* Lotus petals decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-6 bg-primary/40 rounded-full"
            style={{
              transform: `rotate(${(i - 2) * 15}deg)`,
              transformOrigin: "bottom center",
            }}
          />
        ))}
      </div>
    </div>
  )
}
