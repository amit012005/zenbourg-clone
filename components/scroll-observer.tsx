"use client"

import { useEffect, useRef } from "react"

export default function ScrollObserver() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Create intersection observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe all elements with scroll-animate class
    const animateElements = document.querySelectorAll(".scroll-animate")
    animateElements.forEach((el) => {
      observerRef.current?.observe(el)
    })

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return null
}
