<template>
  <div
    class="flex flex-col justify-center items-center responsive-screen-container"
  >
    <div class="font-bold text-center title-style">Login</div>
    <Form
      v-slot="$form"
      class="flex flex-col items-center justify-center p-4 gap-8 form-style"
      :validateOnValueUpdate="true"
      :resolver
      :initialValues
      @submit="handleLogin"
    >
      <Toast />

      <InputText
        :id="'meconLoginUserName'"
        class="w-full"
        name="meconUserName"
        label="Usuario"
        :errorMsg="$form.meconUserName?.error?.message"
      />
      <div class="w-full">
        <InputPassword
          :id="'meconLoginPassword'"
          class="w-full"
          name="password"
          label="Contraseña"
          :errorMsg="$form.password?.error?.message"
        />
        <Message size="small" severity="secondary" variant="simple"
          ><span class="text-xs">
            Si olvidó su contraseña, comunicarse con...</span
          ></Message
        >
      </div>

      <Button
        class="mb-4 button-style"
        type="Submit"
        :loading="isPending"
        label="Ingresar"
        :disabled="isPending"
      />
    </Form>
  </div>
</template>

<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'
import Footer from '@/components/footer/Footer.vue'
import { useLogin } from '@/composables/auth.js'
import {
  setAuthToLocalStorage,
  deleteAuthFromLocalStorage,
} from '@/helpers/auth'
import { loginFormSchema } from '@/helpers/validations'
import { showError } from '@/helpers/toast.js'
import Toast from 'primevue/toast'
import { Form } from '@primevue/forms'
import { useToast } from 'primevue/usetoast'
import { yupResolver } from '@primevue/forms/resolvers/yup'
import { InputText, InputPassword, Button } from '../components/form/index'
import { useUsersStore } from '@/stores/userStore'
import Message from 'primevue/message'

const toast = useToast()
const userStore = useUsersStore()

const initialValues = ref({
  meconUserName: '',
  password: '',
  idServidor: null,
})

const { isPending, mutateAsync: login } = useLogin()

const handleLogin = async ({ states: { meconUserName, password }, valid }) => {
  if (valid) {
    const payload = {
      idServidor: 1,
      usuario: meconUserName.value,
      password: password.value,
    }
    try {
      const response = await login(payload)
      const meconUserName = userStore.setUserName(payload.usuario)
      userStore.setLoginPassword(payload.password)
      await setAuthToLocalStorage({
        ...response,
        usuario: meconUserName,
      })
      router.replace({ name: 'home' })
    } catch (error) {
      console.log(error)
      showError(
        { message: 'Usuario o Contraseña incorrectos', summary: 'Error' },
        toast
      )
      userStore.setUserName('')
      userStore.setLoginPassword('')
      deleteAuthFromLocalStorage()
    }
  }
}

const resolver = yupResolver(loginFormSchema)

onMounted(() => {
  deleteAuthFromLocalStorage()
})
</script>

<style lang="scss" scoped>
.responsive-screen-container {
  @media (max-width: 320px) {
    width: 300px;
    margin-top: 20%;

    .title-style {
      font-size: 1.6rem;
    }

    .form-style {
      .button-style {
        width: 100px;
      }
    }
  }

  @media (min-width: 321px) and (max-width: 529px) {
    width: auto;
    min-width: 320px;
    max-width: 510px;
    margin-top: 20%;

    .title-style {
      font-size: 2rem;
    }

    .form-style {
      width: 80%;

      .button-style {
        width: 120px;
      }
    }
  }

  @media (min-width: 530px) and (max-width: 599px) {
    width: auto;
    min-width: 500px;
    max-width: 580px;
    margin-top: 15%;

    .title-style {
      font-size: 2rem;
    }

    .form-style {
      width: 70%;

      .button-style {
        width: 130px;
      }
    }
  }

  @media (min-width: 600px) and (max-width: 799px) {
    width: auto;
    min-width: 590px;
    max-width: 880px;
    margin-top: 12%;

    .title-style {
      font-size: 2.3rem;
    }

    .form-style {
      width: 60%;

      .button-style {
        width: 130px;
      }
    }
  }

  @media (min-width: 800px) and (max-width: 899px) {
    width: auto;
    min-width: 780px;
    max-width: 880px;
    margin-top: 12%;

    .title-style {
      font-size: 2.3rem;
    }

    .form-style {
      width: 50%;

      .button-style {
        width: 130px;
      }
    }
  }

  @media (min-width: 900px) and (max-width: 999px) {
    width: auto;
    min-width: 900px;
    max-width: 970px;
    margin-top: 10%;

    .title-style {
      font-size: 2.3rem;
    }

    .form-style {
      width: 40%;

      .button-style {
        width: 130px;
      }
    }
  }

  @media (min-width: 1000px) and (max-width: 1199px) {
    width: auto;
    min-width: 1000px;
    max-width: 1180px;
    margin-top: 10%;

    .title-style {
      font-size: 2.3rem;
    }

    .form-style {
      width: 35%;

      .button-style {
        width: 130px;
      }
    }
  }

  @media (min-width: 1200px) {
    width: auto;
    margin-top: 5%;
    height: 100%;

    .title-style {
      font-size: 2.5rem;
    }

    .form-style {
      width: 25%;

      .button-style {
        width: 130px;
      }
    }
  }
}
</style>
