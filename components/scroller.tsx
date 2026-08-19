"use client"

import * as React from "react"
import Image from "next/image"

export interface Gear {
  name: string
  src: string
}

export const gears: Gear[] = [
  { name: "Types of Gears", src: "gears/gear1.jpg" },
  { name: "Machined Gear", src: "/gears/gear2.jpg" },
  { name: "Steampunk Gear", src: "/gears/gear3.jpg" },
  { name: "Gear Drive", src: "/gears/gear4.jpg" },
]

// Duplicate the list so the track can loop seamlessly.
const infiniteGears = [...gears, ...gears]

export function GearCarousel() {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // Respect users who prefer reduced motion — no auto-scroll for them.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    let animationId: number
    let paused = false
    let resumeTimer: ReturnType<typeof setTimeout>

    const pause = () => {
      paused = true
    }
    const resume = () => {
      paused = false
    }
    // On touch devices there is no hover, so pause while the user is
    // swiping and resume a moment after they let go.
    const pauseThenResume = () => {
      paused = true
      clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => {
        paused = false
      }, 2000)
    }

    container.addEventListener("pointerenter", pause)
    container.addEventListener("pointerleave", resume)
    container.addEventListener("touchstart", pause, { passive: true })
    container.addEventListener("touchend", pauseThenResume, { passive: true })

    const scroll = () => {
      if (!paused) {
        // The track holds two copies of `gears`. Once we've scrolled past
        // the first copy, subtract that width to loop without a visible jump.
        const halfway = container.scrollWidth / 2
        if (container.scrollLeft >= halfway) {
          container.scrollLeft -= halfway
        }
        container.scrollLeft += 0.5
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(resumeTimer)
      container.removeEventListener("pointerenter", pause)
      container.removeEventListener("pointerleave", resume)
      container.removeEventListener("touchstart", pause)
      container.removeEventListener("touchend", pauseThenResume)
    }
  }, [])

  return (
    <div className="w-full">
      <div
        ref={scrollRef}
        className="flex w-full gap-3 overflow-x-auto px-3 py-4 sm:gap-4 sm:px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {infiniteGears.map((gear, index) => (
          <figure
            key={`${gear.name}-${index}`}
            className="group w-[75vw] shrink-0 sm:w-[45vw] md:w-[30vw] lg:w-[24vw] xl:w-[20vw]"
          >
            <div className="overflow-hidden rounded-lg bg-muted">
              <Image
                src={gear.src || "/placeholder.svg"}
                alt={gear.name}
                width={600}
                height={800}
                sizes="(max-width: 640px) 75vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, (max-width: 1280px) 24vw, 20vw"
                className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <figcaption className="pt-2 text-xs text-muted-foreground sm:text-sm">
              <span className="font-semibold text-foreground">{gear.name}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
