<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <main>
      <RouterView />
    </main>
    <Footer v-if="showFooter" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

// Ocultar navbar y footer en la página de login
const showNavbar = computed(() => route.path !== '/login')
const showFooter = computed(() => route.path !== '/login')
</script>

<style>
  /* ========================================
   SCROLLBAR TEMA MÉDICO
   ======================================== */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #ecfdf5, #d1fae5);
  border-radius: 12px;
  margin: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #10b981, #059669);
  border-radius: 12px;
  border: 3px solid #ecfdf5;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #059669, #047857);
  transform: scale(1.05);
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #10b981 #ecfdf5;
}

</style>
