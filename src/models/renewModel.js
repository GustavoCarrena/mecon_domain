export default class RenewPasswordModel {
  constructor() {
    this.initialValues = []
  }
  addInitialValues(
    idServidor,
    userName,
    password,
    newPassword,
    repeatPassword
  ) {
    this.initialValues.push({
      idServidor,
      userName,
      password,
      newPassword,
      repeatPassword,
    })
  }
  getPayload() {
    return this.initialValues.map((model) => ({
      idServidor: model.idServidor,
      usuario: model.userName,
      password: model.password,
      passwordNew: model.newPassword,
      passwordNewVerify: model.repeatPassword,
    }))
  }
  updateInitialValues(idServidor, newValues) {
    const model = this.initialValues.find((m) => m.idServidor === idServidor)
    if (model) {
      Object.assign(model, newValues)
    }
  }
}
