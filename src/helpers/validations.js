import * as yup from 'yup'

const ALPHANUMERIC_USER_RULE = /^[a-zA-Z0-9]+$/

export const loginFormSchema = yup.object({
  meconUserName: yup
    .string()
    .required('El usuario es requerido')
    .matches(
      ALPHANUMERIC_USER_RULE,
      'El usuario solo puede contener letras y números'
    ),
  password: yup.string().required('La contraseña es requerida'),
})

export const renewPasswordFormSchema = yup.object({
  prodUserName: yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .matches(
      ALPHANUMERIC_USER_RULE,
      'El usuario solo puede contener letras y números'
    ),
  magypUserName: yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .matches(
      ALPHANUMERIC_USER_RULE,
      'El usuario solo puede contener letras y números'
    ),
  newMeconPassword: yup.string().required('La contraseña es requerida'),
  repeatMeconNewPassword: yup
    .string()
    .required('La contraseña es requerida')
    .oneOf([yup.ref('newMeconPassword')], 'Las contraseñas deben coincidir'),
  prodPassword: yup.string().required('La contraseña es requerida'),
  magypPassword: yup.string().required('La contraseña es requerida'),
})
