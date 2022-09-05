import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer: React.FC = () => (
  <footer className="bg-black text-white flex justify-center items-center gap-10 px-20 py-20">
    <Image src="/assets/logo.svg" width={20} height={20}/>
    <Link href="/terms">Terms</Link>
    <Link href="/terms">Imprint</Link>
    <Link href="/terms">Privacy Policy</Link>
    <Link href="/terms">GitHub</Link>
    <Link href="/terms">Twitter</Link>
  </footer>
)

export default Footer;
