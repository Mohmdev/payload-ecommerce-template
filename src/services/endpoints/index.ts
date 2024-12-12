import { Config } from 'payload'
import { productsProxy } from './products'
import { createPaymentIntent } from './create-payment-intent'
// import { customersProxy } from './customers'
// import { seed } from './seed'

export const defaultEndpoints: Config['endpoints'] = [
  {
    handler: productsProxy,
    method: 'get',
    path: '/stripe/products'
  },
  {
    handler: createPaymentIntent,
    method: 'post',
    path: '/create-payment-intent'
  }
  // {
  //   handler: customersProxy,
  //   method: 'get',
  //   path: '/stripe/customers'
  // },
  // // The seed endpoint is used to populate the database with some example data
  // // You should delete this endpoint before deploying your site to production
  // {
  //   handler: seed,
  //   method: 'get',
  //   path: '/seed'
  // }
]
