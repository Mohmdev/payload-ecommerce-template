import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph'
import React from 'react'

import { LogoutPage } from './LogoutPage'
import PageClient from './page.client'

export default async function Logout() {
  return (
    <div className="container my-16 max-w-lg">
      <PageClient />
      <LogoutPage />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'You have been logged out.',
  openGraph: mergeOpenGraph({
    title: 'Logout',
    url: '/logout'
  }),
  title: 'Logout'
}
