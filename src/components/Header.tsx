'use client'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components"
import { DarkModeToggle } from "./DarkModeToggle"
import {FiMenu} from 'react-icons/fi'
import {IoClose} from 'react-icons/io5'
import { useState } from "react"

export const Header = () => {
  const liStyle = 'transition-colors duration-300 hover:text-primary'
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <header className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Image src={'/logo.png'} 
            width={120}
            height={64}
            alt="Crypto task project" 
          />

          <ul className="items-center gap-6 hidden lg:flex">
            <li className={liStyle}><Link href=''>Markets</Link></li>
            <li className={liStyle}><Link href=''>Trade</Link></li>
            <li className={liStyle}><Link href=''>Derivatives</Link></li>
            <li className={liStyle}><Link href=''>More</Link></li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <Button href="" text='Login' className="hidden md:block bg-foreground text-black dark:bg-foreground dark:text-white" />
          <Button href="" text='Sign Up' className="hidden md:block bg-primary text-black" />
          <DarkModeToggle />
          <button className="lg:hidden" onClick={handleMenu}><FiMenu className="w-6 h-6" /></button>
        </div>
      </header>

      <div className={`fixed w-full h-full bg-black/50 z-50 top-0 ${menuOpen ? 'flex' : 'hidden'} justify-end`}>
        <div className="flex flex-col w-64 h-full bg-background gap-6">
          <div className="flex flex-col items-end px-4 pt-4"><button onClick={handleMenu}><IoClose className="w-6 h-6" /></button></div>
        </div>
      </div>
    </>
  )
}