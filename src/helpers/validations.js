import * as yup from 'yup'

const ALPHANUMERIC_USER_RULE = /^[a-zA-Z0-9]+$/
// const PASSWORD_RULE =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

export const loginFormSchema = yup.object({
  meconUserName: yup
    .string()
    .required('El usuario es requerido')
    .matches(
      ALPHANUMERIC_USER_RULE,
      'El usuario solo puede contener letras y números'
    ),
  password: yup.string().required('La contraseña es requerida'),
  // .min(
  //   8,
  //   'La contraseña debe tener al menos 8 caracteres y al menos una letra mayúscula, una minúscula, un número y un caracter especial'
  // )
  // .matches(
  //   PASSWORD_RULE,
  //   'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un caracter especial'
  // ),
})

export const renewPasswordFormSchema = yup.object({
  newMeconPassword: yup.string().required('La contraseña es requerida'),
  repeatMeconNewPassword: yup.string().required('La contraseña es requerida'),
  prodPassword: yup.string().required('La contraseña es requerida'),
  magypPassword: yup.string().required('La contraseña es requerida'),
})
