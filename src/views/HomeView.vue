<template>
  <div
    class="flex flex-col justify-center items-center responsive-screen-container"
  >
    <Form
      v-slot="$form"
      class="flex flex-col items-center justify-center p-4 gap-8 form-style"
      :validateOnValueUpdate="true"
      :resolver
      :initialValues
      @submit="handleRenewPassword"
    >
      <Toast />
      <fieldset class="w-full">
        <legend class="text-lg font-semibold mb-4">MECON</legend>
        <InputText
          :id="'meconRenewUserName'"
          v-model="meconUserName"
          class="w-full"
          name="'meconRenewUserName'"
          label="Usuario"
          :disabled="true"
        />

        <InputPassword
          :id="'meconRenewPassword'"
          class="w-full"
          :name="'newMeconPassword'"
          label="Nueva Contraseña"
          :errorMsg="$form.newMeconPassword?.error?.message"
        />
        <InputPassword
          :id="'meconRenewRepeatPassword'"
          class="w-full"
          :name="'repeatMeconNewPassword'"
          label="Repetir Contraseña"
          :errorMsg="$form.repeatMeconNewPassword?.error?.message"
        />
      </fieldset>

      <fieldset class="w-full">
        <legend class="text-lg font-semibold mb-4">PROD</legend>
        <InputText
          :id="'prodRenewUserName'"
          class="w-full"
          :name="'prodUserName'"
          label="Usuario"
        />

        <InputPassword
          :id="'prodRenewPassword'"
          class="w-full"
          :name="'prodPassword'"
          label="Contraseña"
          :errorMsg="$form.prodPassword?.error?.message"
        />
        <Message size="small" severity="secondary" variant="simple"
          ><span class="text-xs"
            >Si olvidó su contraseña, comunicarse con...</span
          ></Message
        >
      </fieldset>

      <fieldset class="w-full">
        <legend class="text-lg font-semibold mb-4">MAGYP</legend>
        <InputText
          :id="'magypRenewUserName'"
          class="w-full"
          :name="'magypUserName'"
          label="Usuario"
        />

        <InputPassword
          :id="'magypRenewPassword'"
          class="w-full"
          :name="'magypPassword'"
          label="Contraseña"
          :errorMsg="$form.magypPassword?.error?.message"
        />
        <Message size="small" severity="secondary" variant="simple"
          ><span class="text-xs"
            >Si olvidó su contraseña, comunicarse con...</span
          ></Message
        >
      </fieldset>

      <Button
        class="mb-4 button-style"
        type="Submit"
        :loading="isPending"
        label="Actualizar contraseña"
        :disabled="isPending"
      />
    </Form>
  </div>
</template>

<script setup>
import router from '@/router'
import { Form } from '@primevue/forms'
import { yupResolver } from '@primevue/forms/resolvers/yup'
import { renewPasswordFormSchema } from '@/helpers/validations'
import { InputText, InputPassword, Button } from '../components/form/index'
import { useUsersStore } from '@/stores/userStore'
import { getAuthFromLocalStorage } from '@/helpers/auth'
import { useRenewPassword } from '@/composables/renewPassword.js'
import Message from 'primevue/message'
import { ref } from 'vue'
import { showError } from '@/helpers/toast.js'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import RenewPasswordModel from '@/models/renewModel'

const encodedPassword = localStorage.getItem('encodedPassword')
const loginPassword = ref(atob(encodedPassword))
const userStore = useUsersStore()
const toast = useToast()
const meconUserName = getAuthFromLocalStorage(userStore?.getUserName)?.usuario
const renewPasswordModel = new RenewPasswordModel()
renewPasswordModel.addInitialValues(1, meconUserName, '', '', '') // MECON
renewPasswordModel.addInitialValues(2, '', '', '', '') // PROD
renewPasswordModel.addInitialValues(3, '', '', '', '') // MAGYP
const initialValues = ref(renewPasswordModel.initialValues)

const { isPending, mutateAsync: renewPassword } = useRenewPassword()

const handleRenewPassword = async ({
  states: {
    newMeconPassword,
    repeatMeconNewPassword,
    prodUserName,
    prodPassword,
    magypUserName,
    magypPassword,
  },
  valid,
}) => {
  if (valid) {
    renewPasswordModel.updateInitialValues(1, {
      password: loginPassword.value,
      newPassword: newMeconPassword.value,
      repeatPassword: repeatMeconNewPassword.value,
    })
    renewPasswordModel.updateInitialValues(2, {
      password: loginPassword.value,
      userName: prodUserName.value,
      newPassword: prodPassword.value,
      repeatPassword: prodPassword.value,
    })
    renewPasswordModel.updateInitialValues(3, {
      password: loginPassword.value,
      userName: magypUserName.value,
      newPassword: magypPassword.value,
      repeatPassword: magypPassword.value,
    })
    const payload = renewPasswordModel.getPayload()
    try {
      // await renewPassword(payload)
      // mensaje de exito y ademas ir a home
      // router.replace({ name: 'home' })
      console.log('renew payload', payload)
    } catch (error) {
      loginPassword.value = ''
      console.log(error)
      showError(
        { message: 'Usuario o Contraseña incorrectos', summary: 'Error' },
        toast
      )
    } finally {
      localStorage.removeItem('encodedPassword')
      loginPassword.value = ''
    }
  }
}

const resolver = yupResolver(renewPasswordFormSchema)
</script>

<style lang="scss" scoped></style>
