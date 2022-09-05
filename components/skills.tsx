import React, { useContext, useRef } from 'react'
import style from '../styles/skills.module.css'
import { ScrollContext } from '../utils/scroll-observer'

interface Props {
  downloads: number
  commits: number
}

// const fallbackDownloads = 33388721
// const fallbackCommits = 282


const opacityForBlock = (sectionProgress: number, blockNo: number) => {
  const progress = sectionProgress - blockNo;
  if (progress >= 0 && progress < 1) return 1
  return 0.2
}

const Skills: React.FC<Props> = ({ downloads, commits }) => {
  const { scrollY } = useContext(ScrollContext)
  const divRef = useRef<HTMLDivElement>(null)
  const { current: divContainer } = divRef

  const numberOfPages = 3
  let progress = 0
  if (divContainer) {
    const { clientHeight, offsetTop } = divContainer
    const screenH = window.innerHeight
    const halfH = screenH / 2
    const percentY = Math.min(
      clientHeight + halfH,
      Math.max(-screenH, scrollY - offsetTop) + halfH
    ) / clientHeight
    //console.log('percentY: ', percentY)
    progress = Math.min(numberOfPages - 0.5, Math.max(0.5, percentY * numberOfPages))
  }

  // const numberOfDownloads = Math.round((downloads || fallbackDownloads) / 1000 / 1000).toLocaleString() + ' million'
  // const numberOfCommits = Math.round(commits || fallbackCommits).toLocaleString()
  const numberOfDownloads = Math.round((downloads) / 1000 / 1000).toLocaleString() + ' million'
  const numberOfCommits = Math.round(commits).toLocaleString()

  return (
    <section ref={divRef} className="bg-black text-white">
      <div className="tracking-tight font-semibold min-h-screen mx-auto flex flex-col justify-center items-center px-10 py-24 md:py-28 text-4xl md:text-6xl lg:px-20  lg:text-7xl">
        <div className="leading-[1.5]">
          <div className={style.skillText}
            style={{ opacity: opacityForBlock(progress, 0) }}> We know our tools inside out.</div>
          <span className={`${style.skillText} inline-block`}
            style={{ opacity: opacityForBlock(progress, 1) }}> Our team has contributed {numberOfCommits} commits to React Native core, powering thousands of apps worldwide.</span>
          <span className={`${style.skillText} inline-block`}
            style={{ opacity: opacityForBlock(progress, 2) }}>We&apos;re maintaining some of the most popular open-source projects, with over <strong>{numberOfDownloads}</strong> downloads.</span>
        </div>
      </div>
    </section>
  )
}

export default Skills
