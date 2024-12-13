'use client'

import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { useAuth } from '@/providers/Auth'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense, useEffect } from 'react'

import { Search, SearchSkeleton } from './search'

interface Props {
  menu: Header['navItems']
}

export function MobileMenu({ menu }: Props) {
  const { user } = useAuth()

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(min-width: 768px)')
  //   const handleChange = (e: MediaQueryListEvent) => {
  //     if (e.matches) {
  //       document.body.style.pointerEvents = 'none'
  //       const closeButton = document.querySelector(
  //         '[aria-label="Close"]'
  //       ) as HTMLButtonElement
  //       if (closeButton) closeButton.click()
  //       document.body.style.pointerEvents = 'auto'
  //     }
  //   }

  //   mediaQuery.addEventListener('change', handleChange)
  //   return () => mediaQuery.removeEventListener('change', handleChange)
  // }, [])

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:bg-black dark:text-white"
        >
          <MenuIcon className="h-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>My Store</SheetTitle>

          <SheetDescription />
        </SheetHeader>

        <div className="py-4">
          <div className="mb-4 w-full">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          {menu?.length ? (
            <ul className="flex w-full flex-col">
              {menu.map((item) => (
                <li className="py-2" key={item.id}>
                  <CMSLink {...item.link} appearance="link" />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {user ? (
          <div className="mt-4">
            <h2 className="mb-4 text-xl">My account</h2>
            <hr className="my-2" />
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/orders">Orders</Link>
              </li>
              <li>
                <Link href="/account">Manage account</Link>
              </li>
              <li className="mt-6">
                <Button asChild variant="outline">
                  <Link href="/logout">Log out</Link>
                </Button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <h2 className="mb-4 text-xl">My account</h2>
            <div className="mt-4 flex items-center gap-2">
              <Button asChild className="w-full" variant="outline">
                <Link href="/login">Log in</Link>
              </Button>
              <span>or</span>
              <Button asChild className="w-full">
                <Link href="/create-account">Create an account</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
