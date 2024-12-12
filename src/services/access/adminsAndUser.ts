import type { Access } from 'payload'

import { checkRole } from '@/services/access/checkRole'

export const adminsAndUser: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }

    return {
      id: {
        equals: user.id
      }
    }
  }

  return false
}
