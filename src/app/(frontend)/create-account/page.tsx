import type { Metadata } from 'next'

import { RenderParams } from '@/components/RenderParams'
import { getMeUser } from '@/lib/data/getMeUser'
import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph'
import React from 'react'

import { CreateAccountForm } from './CreateAccountForm'
import PageClient from './page.client'

export default async function CreateAccount() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(
      'Cannot create a new account while logged in, please log out and try again.'
    )}`
  })

  return (
    <div className="container">
      <PageClient />
      <h1 className="mb-4 text-xl">Create Account</h1>
      <RenderParams />
      <CreateAccountForm />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account'
  }),
  title: 'Account'
}
