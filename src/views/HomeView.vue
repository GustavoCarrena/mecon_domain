<template>
  <div class="w-full h-full flex justify-center">
    <ScrollPanel class="w-full">
      <div class="flex justify-center px-4">
        <Form
          v-slot="$form"
          :validateOnValueUpdate="true"
          :resolver
          :initialValues
          class="w-[95%] max-w-lg flex flex-col gap-8 py-6"
          @submit="handleRenewPassword"
        >
          <Toast />
          <Fieldset>
            <template #legend>
              <div class="flex items-center -ml-3">
                <span
                  class="font-semibold text-blue-500 text-lg pb-1 opacity-80"
                  >@mecon.gob.ar</span
                >
              </div>
            </template>
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
          </Fieldset>

          <Fieldset v-if="isFirstLoggin">
            <template #legend>
              <div class="flex items-center -ml-3">
                <span
                  class="font-semibold text-blue-500 text-lg pb-1 opacity-80"
                  >Olimpus (ejemplo: @produccion.gob.ar)</span
                >
              </div>
            </template>
            <InputText
              :id="'prodUserName'"
              v-model="prodUserName"
              class="w-full"
              :name="'prodUserName'"
              label="Usuario"
              :errorMsg="$form.prodUserName?.error?.message"
            />

            <InputPassword
              :id="'prodRenewPassword'"
              class="w-full"
              :name="'prodPassword'"
              label="Contraseña actual"
              :errorMsg="$form.prodPassword?.error?.message"
            />
            <Message size="small" severity="secondary" variant="simple"
              ><span class="text-xs"
                >Si olvidó su contraseña comunicarse con el interno #5400</span
              ></Message
            >
          </Fieldset>

          <Fieldset v-if="isFirstLoggin">
            <template #legend>
              <div class="flex items-center -ml-3">
                <span
                  class="font-semibold text-blue-500 text-lg pb-1 opacity-80"
                  >@magyp.gob.ar</span
                >
              </div>
            </template>
            <InputText
              :id="'magypUserName'"
              v-model="magypUserName"
              class="w-full"
              :name="'magypUserName'"
              label="Usuario"
              :errorMsg="$form.magypUserName?.error?.message"
            />

            <InputPassword
              :id="'magypRenewPassword'"
              class="w-full"
              :name="'magypPassword'"
              label="Contraseña actual"
              :errorMsg="$form.magypPassword?.error?.message"
            />
            <Message size="small" severity="secondary" variant="simple"
              ><span class="text-xs">
                Si olvidó su contraseña comunicarse con el interno 42600</span
              ></Message
            >
          </Fieldset>
          <div class="flex justify-center">
            <Button
              class="button-style"
              type="Submit"
              :loading="isPending"
              label="Actualizar contraseña"
              :disabled="isPending"
            />
          </div>
        </Form>
      </div>
    </ScrollPanel>
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
import Fieldset from 'primevue/fieldset'
import ScrollPanel from 'primevue/scrollpanel'
import { onMounted, ref } from 'vue'
import { showError, showSuccess } from '@/helpers/toast.js'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import RenewPasswordModel from '@/models/renewModel'
import { deleteAuthFromLocalStorage } from '@/helpers/auth'

const userStore = useUsersStore()
const loginPassword = ref('')
const meconUserName = getAuthFromLocalStorage(userStore?.getUserName)?.usuario
const prodUserName = ref('')
const magypUserName = ref('')
const { isFirstLoggin } = getAuthFromLocalStorage()
const toast = useToast()
const renewPasswordModel = new RenewPasswordModel()
renewPasswordModel.addInitialValues(1, meconUserName, '', '', '') // MECON
renewPasswordModel.addInitialValues(2, prodUserName.value, '', '', '') // PROD
renewPasswordModel.addInitialValues(3, magypUserName.value, '', '', '') // MAGYP
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
      usuario: meconUserName.value,
      password: loginPassword.value,
      newPassword: newMeconPassword.value,
      repeatPassword: repeatMeconNewPassword.value,
    })
    renewPasswordModel.updateInitialValues(2, {
      usuario: prodUserName.value ? prodUserName.value : null,
      password: prodPassword?.value ? prodPassword.value : null,
      newPassword: newMeconPassword?.value ? newMeconPassword.value : null,
      repeatPassword: repeatMeconNewPassword?.value
        ? repeatMeconNewPassword?.value
        : null,
    })
    renewPasswordModel.updateInitialValues(3, {
      usuario: magypUserName.value ? magypUserName.value : null,
      password: magypPassword?.value ? magypPassword.value : null,
      newPassword: newMeconPassword?.value ? newMeconPassword.value : null,
      repeatPassword: repeatMeconNewPassword?.value
        ? repeatMeconNewPassword?.value
        : null,
    })
    const payload = renewPasswordModel.getPayload()
    try {
      // await renewPassword(payload)
      console.log('renew payload', payload)
      await showSuccess(
        { message: '', summary: 'Contraseña actualizada exitosamente' },
        toast
      )
      await new Promise((resolve) => setTimeout(resolve, 2000))
      loginPassword.value = userStore.setLoginPassword('')
      router.replace({ name: 'login' })
    } catch (error) {
      loginPassword.value = ''
      console.log(error)
      showError(
        { message: 'Usuario o Contraseña incorrectos', summary: 'Error' },
        toast
      )
    }
  }
}

const resolver = yupResolver(renewPasswordFormSchema)

onMounted(() => {
  loginPassword.value = userStore.getLoginPassword
  if (!loginPassword.value) {
    router.replace({ name: 'login' })
    deleteAuthFromLocalStorage()
  }
})
</script>

<style scoped>
:deep(.p-scrollpanel) {
  width: 100% !important;
  height: calc(100vh - 180px) !important; /* 120px footer + ~60px header */
}

:deep(.p-scrollpanel-wrapper) {
  height: 100% !important;
}

:deep(.p-scrollpanel-content) {
  height: 100% !important;
  padding: 0 !important;
}
</style>
