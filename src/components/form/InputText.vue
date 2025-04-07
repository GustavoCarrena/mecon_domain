<script setup>
import InputText from 'primevue/inputtext'

defineProps({
  label: { type: String, default: null },
  name: { type: String, default: null },
  errorMsg: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  id: { type: String, default: '' },
})

const model = defineModel()
</script>

<template>
  <div class="flex flex-col items-start gap-2">
    <label class="pl-1 text-sm text-gray-700 font-semibold" for="inputtext">{{
      label
    }}</label>
    <InputText
      :id
      v-model="model"
      class="w-full"
      :name
      type="text"
      :invalid="!!errorMsg"
      :disabled
    />
    <span class="text-red-500 text-xs">{{ errorMsg }}</span>
  </div>
</template>
