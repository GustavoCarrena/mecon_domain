<template>
  <nav class="w-full h-18" style="padding-left: 6%">
    <div class="w-full h-full pt-1">
      <Image src="/logos.svg" alt="Image" />
      <!-- <div class="h-1 w-full" style="background-color: #3d3d3d" /> -->
    </div>
  </nav>
  <div
    class="flex justify-start"
    style="padding-left: 6.5%; background-color: #3d3d3d"
  >
    <div class="text-xs text-white ml-2 py-1 opacity-70">
      Gestión de Contraseña
    </div>
  </div>
</template>

<script setup>
import Image from 'primevue/image'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
