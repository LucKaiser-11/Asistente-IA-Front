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
