<template>
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-teal-100">
<div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
<!-- Logo o título -->
<div class="text-center mb-6">
<h1 class="text-3xl font-bold text-sky-600">Asistente Médico</h1>
<p class="text-gray-500 mt-2">Inicia sesión para continuar</p>
</div>

<!-- Formulario -->
<form @submit.prevent="handleLogin">
<!-- Email -->
<div class="mb-4">
<label class="block text-gray-700 text-sm font-medium mb-2">Correo electrónico</label>
<input
v-model="email"
type="email"
placeholder="ejemplo@correo.com"
class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
required
/>
</div>

<!-- Contraseña -->
<div class="mb-6">
<label class="block text-gray-700 text-sm font-medium mb-2">Contraseña</label>
<input
v-model="password"
type="password"
placeholder="••••••••"
class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
required
/>
</div>

<!-- Botón -->
<button
type="submit"
class="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition duration-200"
>
Iniciar sesión
</button>
</form>

<!-- Link a registro -->
<p class="text-center text-gray-500 mt-6">
¿No tienes cuenta?
<a href="/register" class="text-teal-600 hover:underline">Regístrate</a>
</p>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = async () => {
// Aquí irá la llamada al backend
console.log('Login:', email.value, password.value)
}
</script>