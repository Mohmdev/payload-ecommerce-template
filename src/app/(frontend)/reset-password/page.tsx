import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph'
import React, { Suspense } from 'react'

import { ResetPasswordForm } from './ResetPasswordForm'
import PageClient from './page.client'

export default function ResetPassword() {
  return (
    <div className="container py-16">
      <PageClient />
      <h1 className="mb-4 text-xl">Reset Password</h1>
      <p>Please enter a new password below.</p>
      <Suspense fallback={<React.Fragment />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Enter a new password.',
  openGraph: mergeOpenGraph({
    title: 'Reset Password',
    url: '/reset-password'
  }),
  title: 'Reset Password'
}
