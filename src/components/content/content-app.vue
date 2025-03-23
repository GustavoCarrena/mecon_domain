<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-grow">
      <div class="flex flex-col w-full custom-container">
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from '../navbar/NavBar.vue'
import Footer from '../footer/Footer.vue'
</script>

<style scoped>
.custom-container {
  padding: 0;
}
</style>
