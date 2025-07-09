'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { SignedIn } from '@clerk/nextjs'

// Fix: Move usePathname hook inside the component function
const NavItems = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row gap-4 sm:gap-8 items-center">
      <Link href="/">
        <p className={pathname === '/' ? 'font-bold text-black ' : ''}>Home</p>
      </Link>
      <Link href="/companion">
        <p className={pathname === '/companion' ? 'font-bold text-black ' : ''}>Companion</p>
      </Link>
      <Link href="/my-journey">
        <p className={pathname === '/my-journey' ? 'font-bold text-black ' : ''}>My Journey</p>
      </Link>
      <SignedIn>
        <Link href="/dashboard">
          <p className={pathname === '/dashboard' ? 'font-bold text-black ' : ''}>Dashboard</p>
        </Link>
      </SignedIn>
    </div>
  )
}

export default NavItems
