import type React from "react"
import { cn } from "@/lib/utils"

interface NeonTextProps {
  children: React.ReactNode
  color?: "blue" | "purple" | "pink" | "green" | "yellow"
  className?: string
}

export default function NeonText({ children, color = "blue", className }: NeonTextProps) {
  const neonClass = `neon-text neon-text-${color}`

  return <span className={cn(neonClass, className)}>{children}</span>
}
