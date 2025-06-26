"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function ParallaxSection({ children, className, speed = 0.1, direction = "up" }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const { top } = sectionRef.current.getBoundingClientRect()
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Calculate how far the element is from the viewport center
      const elementCenter = top + sectionRef.current.offsetHeight / 2
      const viewportCenter = windowHeight / 2
      const distanceFromCenter = elementCenter - viewportCenter

      // Calculate parallax offset based on distance from center
      setOffset(distanceFromCenter * speed)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed])

  const getTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${-offset}px)`
      case "down":
        return `translateY(${offset}px)`
      case "left":
        return `translateX(${-offset}px)`
      case "right":
        return `translateX(${offset}px)`
      default:
        return `translateY(${-offset}px)`
    }
  }

  return (
    <div ref={sectionRef} className={cn("parallax-layer", className)} style={{ transform: getTransform() }}>
      {children}
    </div>
  )
}
