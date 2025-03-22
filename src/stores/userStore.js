import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUsersStore = defineStore('user', () => {
  const userName = ref('')
  const getUserName = computed(() => userName.value)
  const setUserName = (newUserName) => (userName.value = newUserName)

  return {
    getUserName,
    setUserName,
  }
})
