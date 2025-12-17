import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Home from '../views/Home.vue'
import Login from '../views/LoginView.vue'
import Asistente from '../views/Asistente.vue'
import HistorialView from '../views/HistorialView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/asistente',
      name: 'asistente',
      component: Asistente,
      meta: { requiresAuth: true }
    },
    {
      path: '/historial',
      name: 'historial',
      component: HistorialView,
      meta: { requiresAuth: true } // Protegido con autenticación
    }
  ]
})

// Guard de navegación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
