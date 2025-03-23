<template>
  <footer class="footer w-full flex justify-center items-center">
    <div class="text-white footer-text py-2">
      <div class="text text-center">
        Subsecretaría de Gestión Administrativa de Producción | Dirección
        General de Tecnologías de la Información y las Comunicaciones | Hipólito
        Yrigoyen 250 | (C1086AAB) CABA República Argentina | Tel. 0800.333.7963
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  background-color: #242c4f;
  height: 95px;
  .footer-text {
    font-weight: 500;
    line-height: 1.5;
    @media (min-width: 320px) and (max-width: 767px) {
      width: 95%;
      font-size: 10px;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      width: 90%;
      font-size: 13px;
    }
    @media (min-width: 1024px) {
      width: 60%;
      font-size: 14px;
    }
  }
}
</style>
