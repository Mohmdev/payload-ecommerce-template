import type { Metadata } from 'next'

import { RenderParams } from '@/components/RenderParams'
import { getMeUser } from '@/lib/data/getMeUser'
import Link from 'next/link'
import React from 'react'

import { LoginForm } from './LoginForm'
import PageClient from './page.client'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`
  })

  return (
    <div className="container">
      <PageClient />
      <div className="mx-auto my-12 max-w-xl">
        <RenderParams />

        <h1 className="mb-4 text-[1.8rem]">Log in</h1>
        <p className="mb-8">
          {`This is where your customers will login to manage their account, review their order history, and more. To manage all users, `}
          <Link href="/admin/collections/users">
            login to the admin dashboard
          </Link>
          .
        </p>
        <LoginForm />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Login or create an account to get started.',
  openGraph: {
    title: 'Login',
    url: '/login'
  },
  title: 'Login'
}
