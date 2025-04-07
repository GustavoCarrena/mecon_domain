export default class RenewPasswordModel {
  constructor() {
    this.initialValues = []
  }
  addInitialValues(idServidor, usuario, password, newPassword, repeatPassword) {
    this.initialValues.push({
      idServidor,
      usuario,
      password,
      newPassword,
      repeatPassword,
    })
  }
  getPayload() {
    return this.initialValues.map((model) => ({
      idServidor: model.idServidor,
      usuario: model.usuario,
      password: model.password,
      passwordNew: model.newPassword,
      passwordNewVerify: model.repeatPassword,
    }))
  }
  updateInitialValues(idServidor, newValues) {
    const model = this.initialValues.find((m) => m.idServidor === idServidor)
    if (model) {
      for (const key in newValues) {
        if (newValues[key] !== undefined && newValues[key] !== null) {
          model[key] = newValues[key]
        }
      }
    }
  }
}
