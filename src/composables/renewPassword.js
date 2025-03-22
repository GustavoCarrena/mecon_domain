import { useMutation } from '@tanstack/vue-query'
import authService from '../api/authService'

export const useRenewPassword = () => {
  const query = useMutation({
    mutationKey: ['renewPassword'],
    mutationFn: (payload) => authService.renewPassword(payload),
  })
  return query
}
