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
    )
    .test(
      'require-prodUserName-if-prodPassword',
      'El usuario de Olimpus es requerido si ingresas una contraseña',
      function (value) {
        const { prodPassword } = this.parent
        return !prodPassword || (prodPassword && value)
      }
    ),

  magypUserName: yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .matches(
      ALPHANUMERIC_USER_RULE,
      'El usuario solo puede contener letras y números'
    )
    .test(
      'require-magypUserName-if-magypPassword',
      'El usuario de MAGyP es requerido si ingresas una contraseña',
      function (value) {
        const { magypPassword } = this.parent
        return !magypPassword || (magypPassword && value)
      }
    ),

  newMeconPassword: yup
    .string()
    .required('La contraseña es requerida')
    .min(10, 'La contraseña debe tener al menos 10 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(
      /[^A-Za-z0-9]/,
      'Debe contener al menos un caracter especial (#,%,?,etc.)'
    ),
  repeatMeconNewPassword: yup
    .string()
    .required('La contraseña es requerida')
    .oneOf([yup.ref('newMeconPassword')], 'Las contraseñas deben coincidir'),

  prodPassword: yup
    .string()
    .test(
      'require-prodPassword-if-prodUserName',
      'La contraseña de Olimpus es requerida si ingresas un usuario',
      function (value) {
        const { prodUserName } = this.parent
        return !prodUserName || (prodUserName && value)
      }
    )
    .when('prodUserName', {
      is: (value) => !!value,
      then: (schema) =>
        schema
          .min(10, 'La contraseña debe tener al menos 10 caracteres')
          .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
          .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
          .matches(/[0-9]/, 'Debe contener al menos un número')
          .matches(
            /[^A-Za-z0-9]/,
            'Debe contener al menos un caracter especial'
          ),
    }),

  magypPassword: yup
    .string()
    .test(
      'require-magypPassword-if-magypUserName',
      'La contraseña de MAGyP es requerida si ingresas un usuario',
      function (value) {
        const { magypUserName } = this.parent
        return !magypUserName || (magypUserName && value)
      }
    )
    .when('magypUserName', {
      is: (value) => !!value,
      then: (schema) =>
        schema
          .min(8, 'La contraseña debe tener al menos 8 caracteres')
          .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
          .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
          .matches(/[0-9]/, 'Debe contener al menos un número'),
    }),
})
