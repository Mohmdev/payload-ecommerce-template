import { stripePlugin } from '@payloadcms/plugin-stripe'
import { paymentSucceeded } from './webhooks/paymentSucceeded'
import { productUpdated } from './webhooks/productUpdated'

import type { Plugin } from 'payload'

export const stripePluginConfig: Plugin = stripePlugin({
  isTestKey: Boolean(process.env.PAYLOAD_PUBLIC_STRIPE_IS_TEST_KEY),
  logs: true,
  rest: false,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET,
  webhooks: {
    'payment_intent.succeeded': paymentSucceeded,
    'product.updated': productUpdated
  }
})
