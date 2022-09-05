import React from 'react'
import Image from 'next/image'

import { Tile, TileBackground, TileContent, TileWrapper } from './tile'
import { WorkBackground, WorkContainer, WorkLeft, WorkRight, WorkLink } from './work'

const Works = () =>
  <TileWrapper numberOfPages={3}>
    <TileBackground>
      <WorkBackground />
    </TileBackground>
    <TileContent>
      <Tile
        pageIndex={0}
        renderContent={({ progress }) => (
          <WorkContainer>
            <WorkLeft progress={progress}>
              <div>We designed and developed</div>
              <div className="text-4xl font-semibold tracking-tighter">
                <WorkLink href="https://pinkpanda.io/">Pink Panda</WorkLink> &apos;s app. </div>
            </WorkLeft>
            <WorkRight progress={progress}>
               <Image src="/assets/works/pinkpanda.webp" layout="responsive" width={840} height={1620}/> 
            </WorkRight>
          </WorkContainer>
        )}></Tile>
      <Tile
        pageIndex={1}
        renderContent={({ progress }) => (
          <WorkContainer>
            <WorkLeft progress={progress}>
              <div>We made</div>
              <div className="font-semibold"><WorkLink href="https://steakwallet.fi/">Steakwallet </WorkLink>faster.</div>
            </WorkLeft>
            <WorkRight progress={progress}>
               <Image src="/assets/works/steakwallet.webp" layout="responsive" width={840} height={1620}/> 
            </WorkRight>
          </WorkContainer>
        )}></Tile>
      <Tile
        pageIndex={2}
        renderContent={({ progress }) => (
          <WorkContainer>
            <WorkLeft progress={progress}>
              <div>We helped</div>
              <div className="text-4xl font-semibold tracking-tighter">
                <WorkLink href="https://showtime.io/">Showtime</WorkLink>ship faster
              </div>
            </WorkLeft>
            <WorkRight progress={progress}>
               <Image src="/assets/works/showtime.webp" layout="responsive" width={840} height={1620}/> 
            </WorkRight>
          </WorkContainer>
        )}></Tile>
    </TileContent>
  </TileWrapper>


export default Works


