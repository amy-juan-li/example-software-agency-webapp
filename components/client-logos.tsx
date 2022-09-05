import React from 'react'
import Image from 'next/image'
import SliderContainer, { SliderItem } from './slider'


const ClientLogos: React.FC = () => (
  <>
    <SliderContainer className="" contentWidth={1290} initialOffsetX={0}>
      <SliderItem>
        <Image
          src="/assets/trustedby/audubon.webp"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain" />
      </SliderItem>
      <SliderItem>
        <Image
          src="/assets/trustedby/coinbase.webp"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain" />
      </SliderItem>
      <SliderItem>
        <Image
          src="/assets/trustedby/picnic.webp"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain" />
      </SliderItem>
      <SliderItem>
        <Image
          src="/assets/trustedby/shopify.webp"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain" />
      </SliderItem>
      <SliderItem>
        <Image
          src="/assets/trustedby/walletconnect.webp"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain" />
      </SliderItem>
      <SliderItem>
        <Image
          src="/assets/trustedby/tocsen.webp"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain" />
      </SliderItem>
      <SliderItem>
        <Image
          src="/assets/trustedby/rainbow.webp"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain" />
      </SliderItem>
      <SliderItem>
        <Image
          src="/assets/trustedby/status.webp"
          width={150}
          height={50}
          alt="Audubon"
          objectFit="contain" />
      </SliderItem>
    </SliderContainer>
  </>
)

export default ClientLogos
