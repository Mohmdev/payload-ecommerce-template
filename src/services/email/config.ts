import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import type { Config } from 'payload'

// TODO
export const emailConfig: Config['email'] = nodemailerAdapter()