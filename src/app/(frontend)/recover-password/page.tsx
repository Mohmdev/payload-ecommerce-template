import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph'
import React from 'react'

import { RecoverPasswordForm } from './RecoverPasswordForm'
import PageClient from './page.client'

export default async function RecoverPassword() {
  return (
    <div className="container py-16">
      <PageClient />
      <RecoverPasswordForm />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Recover Password',
    url: '/recover-password'
  }),
  title: 'Recover Password'
}
