import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUsersStore = defineStore('user', () => {
  const userName = ref('')
  const loginPassword = ref('')
  const getUserName = computed(() => userName.value)
  const setUserName = (newUserName) => (userName.value = newUserName)
  const getLoginPassword = computed(() => loginPassword.value)
  const setLoginPassword = (pass) => (loginPassword.value = pass)

  return {
    getUserName,
    setUserName,
    getLoginPassword,
    setLoginPassword,
  }
})
