import { api } from './index'

const authService = {
  login: async (payload) => {
    // const { data } = await api.post('/Auth/Login', payload)
    const data = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6IkFkbWluaXN0cmF0b3IiLCJQYXNzd29yZCI6ImZCQWV6NytwRjFyN25JV1hKSGx1NTVsdk9zQWM5a04yQkNOcnREUWxzV2M9IiwianRpIjoiNWFjNDlhNGQtMjMzOC00OWFlLTk3ZDAtYjY1ZDk3MGMxZTVkIiwiZXhwIjoxNzQ0NjI5NDg2LCJpc3MiOiJ1c3VhcmlvUC5QLiIsImF1ZCI6Ik15QXVkaWVuY2UifQ.zHglMenOsLCpEv-1jCtIdE1PwfSmSiHaYcHqb9oQCGw',
      isFirstLoggin: true,
      userProfile: [
        {
          idServidor: 1,
          user: 'Administrator',
        },
        {
          idServidor: 2,
          user: '',
        },
        {
          idServidor: 3,
          user: '',
        },
      ],
    }
    return data
  },

  refreshToken: async (refreshToken) => {
    const { data } = await api.post('/refresh-token', { refreshToken })
    return data
  },

  renewPassword: async (payload) => {
    // const { data } = await api.post(
    //   '/Credenciales/unificarCredencialesPrimeraVez',
    //   payload
    // )

    const data = { status: 200 }

    return data
  },
}

export default authService
