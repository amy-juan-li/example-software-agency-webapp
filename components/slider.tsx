import { X509Certificate } from 'crypto'
import React, { useContext, useRef, useCallback } from 'react'
import { SizeContext } from '../utils/size-observer'
import useAnimationFrame from '../utils/use-animation-frame'

interface ContainerProps {
  children: React.ReactNode
  initialOffsetX: number
  className: string
  contentWidth: number
}


const SliderContainer: React.FC<ContainerProps> = ({ children, initialOffsetX, className, contentWidth }) => {
  const { innerWidth } = useContext(SizeContext)
  const refScrollX = useRef<number>(initialOffsetX)
  const refContainer = useRef<HTMLDivElement>(null)
  const refContent = useRef<HTMLDivElement>(null)

  const enabled = innerWidth < contentWidth
  useAnimationFrame(enabled, useCallback(() => {
    const { current: elContainer } = refContainer
    const { current: elContent } = refContent
    if (elContainer && elContent) {
      refScrollX.current += 0.5
      elContainer.scrollLeft = refScrollX.current
        if (elContainer.scrollLeft >= elContent.clientWidth) {
          refScrollX.current = 0
          elContainer.scrollLeft = 0
        }
    }
  }, []))

  return (
    <div ref={refContainer} className={`slider-container overflow-x-hidden whitespace-nowrap max-w-full pointer-events-none ${className}`}>
      <div ref={refContent} className="inline-block">
        {children}
      </div>
    </div>
  )
}

interface ItemProps {
  children: React.ReactNode
}
export const SliderItem: React.FC<ItemProps> = ({ children }) => {
  return <div className="inline-flex justify-center items-center">
    {' '}
    {children}</div>
}

export default SliderContainer
