import { api } from './index'

const authService = {
  login: async (payload) => {
    // const { data } = await api.post('/Auth/Login', payload)
    const data = {
      token: '',
      isFirstLoggin: false,
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
