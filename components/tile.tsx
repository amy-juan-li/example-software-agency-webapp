import React, { useRef, useContext } from 'react'
import { ScrollContext } from '../utils/scroll-observer'

interface WrapperProps {
  children: React.ReactNode
  numberOfPages: number
}
interface TileContextValue {
  numberOfPages: number
  currentPage: number
}
interface Props {
  children: React.ReactNode
}
interface TileProps {
  pageIndex: number
  renderContent: (props: { progress: number }) => any
}

export const TileContext = React.createContext<TileContextValue>({
  numberOfPages: 0,
  currentPage: 0
})

export const TileWrapper: React.FC<WrapperProps> = ({ children, numberOfPages }) => {
  const divRef = useRef<HTMLDivElement>(null)
  const { current: elContainer } = divRef
  const { scrollY } = useContext(ScrollContext)
  let currentPage = 0
  if (elContainer) {
    const { clientHeight, offsetTop } = elContainer
    const screenH = window.innerHeight
    const halfH = screenH / 2
    const percentY = Math.min(
      clientHeight + halfH,
      Math.max(-screenH, scrollY - offsetTop) + halfH
    ) / clientHeight
    currentPage = percentY * numberOfPages
    console.log('tile wrapper: percentY: ', percentY)
    console.log('currentPage: ', currentPage)
  }
  return (
    <TileContext.Provider value={{ numberOfPages, currentPage }}>
      <div ref={divRef} className='relative bg-black text-white' style={{ height: (100 * numberOfPages) + 'vh' }}>
        {children}
      </div>
    </TileContext.Provider>
  )
}

export const TileBackground: React.FC<Props> = ({ children }) => {
  return <div className='absolute w-full h-full'>{children}</div>
}
export const TileContent: React.FC<Props> = ({ children }) => {
  return <div className='sticky top-0 h-screen overflow-hidden'>{children}</div>
}

export const Tile: React.FC<TileProps> = ({ pageIndex, renderContent }) => {
  const { currentPage, numberOfPages } = useContext(TileContext)
  const progress = Math.max(0, currentPage - pageIndex)
  let opacity = Math.min(1, Math.max(0, progress * 4))
  if (progress > 0.85 && pageIndex < numberOfPages - 1) {
    opacity = Math.max(0, (1.0 - progress) * 4)
  }
  return <div className='absolute top-0 w-full h-full'
    style={{ pointerEvents: progress <= 0 || progress >= 1 ? 'none' : undefined, opacity }}> {renderContent({ progress })} </div>
}

