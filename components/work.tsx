import React from 'react'
import Link from 'next/link'


interface Props {
  children: React.ReactNode
}

interface WorkProps {
  progress: number
  children: React.ReactNode
}

export const WorkBackground: React.FC = () => {
  return <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen sticky top-0">
    <div className="bg-black h-[30vh] lg:h-full"></div>
    <div className="bg-white h-[70vh] lg:h-full"></div>
  </div>
}

export const WorkContainer: React.FC<Props> = ({ children }) => {
  return <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">{children}</div>
}

export const WorkLeft: React.FC<WorkProps> = ({ progress, children }) => {
  let translateY = Math.max(0, 50 - progress * 3 * 50)
  if (progress > 0.85) translateY = Math.max(-50, -(progress - 0.85) * 2 * 50)
  return <div className="flex flex-col justify-center items-center text-3xl h-[30vh] lg:h-auto" style={{ transform: `translateY(${translateY}px)` }}><div className="leading-10">{children}</div> </div>
}
export const WorkRight: React.FC<WorkProps> = ({ progress, children }) => {
  let translateY = Math.max(-50, -(progress - 0.5) * 50)
  return <div className="flex justify-center lg:items-center h-screen" style={{
    transform: `translateY(${translateY})`
  }}><div className="w-full max-w-md pt-10 lg:pt-0">{children}</div></div>
}
interface LinkProps {
  children: React.ReactNode,
  href: string
}
export const WorkLink: React.FC<LinkProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className="underline underline-offset-8 decoration-1" ref="noreferrer" target="_blank">
        {children}
      </a>
    </Link>
  )
} 
