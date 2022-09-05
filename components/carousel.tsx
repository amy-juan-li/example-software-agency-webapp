import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react'
import React, { ReactNode,useEffect, useCallback, useState } from 'react'
import ClassNames from 'embla-carousel-class-names'
import AutoPlay from 'embla-carousel-autoplay'
import styles from '../styles/carousel.module.css'

interface ContextValue {
  embla: EmblaCarouselType | undefined
  selectedIndex: number
}

interface Props {
  className?: string
  children: ReactNode
}

export const CarouselContext = React.createContext<ContextValue>({
  embla: undefined,
  selectedIndex: -1
})

const Carousel: React.FC<Props> = ({ children, className }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false
  }, [ClassNames(), AutoPlay()])

  const onSelect = useCallback(() => {
    if (!emblaApi) return 
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex]) 

  useEffect(() => {
    if(!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <CarouselContext.Provider value={{ embla: emblaApi, selectedIndex }}>
      <div ref={emblaRef} className={`${styles.viewport} w-full overflow-x-hidden ${className}`}>
        <div className={`${styles.container} flex`}>
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

export default Carousel
