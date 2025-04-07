<script setup>
import Password from 'primevue/password'

const props = defineProps({
  label: { type: String, default: null },
  name: { type: String, default: null },
  errorMsg: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  feedback: { type: Boolean, default: false },
  id: { type: String, default: '' },
})

const model = defineModel()

const handlePaste = (event) => {
  if (props.name === 'repeatMeconNewPassword') {
    event.preventDefault()
  }
}
</script>

<template>
  <div class="flex flex-col items-start gap-2">
    <label class="pl-1 text-sm text-gray-700 font-semibold" for="password"
      >{{ label }} <span v-if="required" class="text-red-500">*</span></label
    >
    <Password
      :id
      v-model="model"
      :name="name"
      :invalid="!!errorMsg"
      :feedback
      toggleMask
      @paste="handlePaste"
    />
    <span class="text-red-500 text-xs">{{ errorMsg }}</span>
  </div>
</template>

<style scoped>
::v-deep(.p-component) {
  width: 100%;
}
</style>
