import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/lib/utilities/mergeOpenGraph'
import React, { Fragment } from 'react'

import { CheckoutPage } from './CheckoutPage'
import PageClient from './page.client'

export default function Checkout() {
  return (
    <div className="container my-16 min-h-[60vh]">
      <PageClient />
      {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
        <div>
          <Fragment>
            {'To enable checkout, you must '}
            <a
              href="https://dashboard.stripe.com/test/apikeys"
              rel="noopener noreferrer"
              target="_blank"
            >
              obtain your Stripe API Keys
            </a>
            {' then set them as environment variables. See the '}
            <a
              href="https://github.com/payloadcms/payload/blob/main/templates/ecommerce/README.md#stripe"
              rel="noopener noreferrer"
              target="_blank"
            >
              README
            </a>
            {' for more details.'}
          </Fragment>
        </div>
      )}

      <CheckoutPage />
    </div>
  )
}

export const metadata: Metadata = {
  description: 'Checkout.',
  openGraph: mergeOpenGraph({
    title: 'Checkout',
    url: '/checkout'
  }),
  title: 'Checkout'
}
