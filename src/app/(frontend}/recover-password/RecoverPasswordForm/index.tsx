'use client'

import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.'
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <h1 className="mb-4 text-xl">Recover Password</h1>
          <div className="prose mb-8 dark:prose-invert">
            <p>
              {`Please enter your email below. You will receive an email message with instructions on
              how to reset your password. To manage your all users, `}
              <Link href="/admin/collections/users">
                login to the admin dashboard
              </Link>
              .
            </p>
          </div>
          <form className="max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            <Message className="mb-8" error={error} />
            <div className="mb-8">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                {...register('email', { required: true })}
                required
                type="email"
              />
            </div>
            <Button type="submit" variant="default">
              Recover Password
            </Button>
          </form>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <h1 className="mb-4 text-xl">Request submitted</h1>
          <div className="prose dark:prose-invert">
            <p>
              Check your email for a link that will allow you to securely reset
              your password.
            </p>
          </div>
        </React.Fragment>
      )}
    </Fragment>
  )
}
