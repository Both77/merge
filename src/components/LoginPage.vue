<template>
  <div class="auth-container">
    <div class="glow-bg"></div>
    
    <div class="auth-card">
      <div class="brand">
        <div class="logo-icon">📖</div>
        <h2>Library<span class="accent">Sys</span></h2>
        <p class="subtitle">Secure Access Portal</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="input-group">
          <label>Username</label>
          <input 
            v-model="form.user" 
            type="text" 
            placeholder="e.g. admin_jane"
            required 
          />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input 
            v-model="form.pass" 
            type="password" 
            placeholder="••••••••"
            required 
          />
        </div>

        <button :disabled="isLoading" class="login-btn">
          <span v-if="!isLoading">Authorize Session</span>
          <span v-else class="loader"></span>
        </button>
      </form>

      <footer class="auth-footer">
        <a href="#">Forgot credentials?</a>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)

const form = reactive({
  user: '',
  pass: ''
})

async function handleLogin() {
  if (form.user && form.pass) {
    isLoading.value = true
    
    // Simulate a network delay for better UX feel
    setTimeout(() => {
      router.push('/dashboard')
    }, 1200)
  }
}
</script>

<style scoped>
.auth-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #020617;
  overflow: hidden;
  position: relative;
}

/* Background Glow Effect */
.glow-bg {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%);
  filter: blur(60px);
  top: -100px;
  right: -100px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.brand {
  text-align: center;
  margin-bottom: 32px;
}

.logo-icon {
  font-size: 2.5rem;
  margin-bottom: 8px;
}

.brand h2 {
  font-size: 1.8rem;
  color: white;
  letter-spacing: -1px;
}

.accent { color: #38bdf8; }
.subtitle { color: #64748b; font-size: 0.9rem; margin-top: 4px; }

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #94a3b8;
  margin-left: 4px;
}

input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 14px 16px;
  border-radius: 12px;
  color: white;
  transition: all 0.3s;
}

input:focus {
  outline: none;
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.9);
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
}

.login-btn {
  margin-top: 10px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: #38bdf8;
  color: #020617;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-btn:hover {
  background: #7dd3fc;
  transform: translateY(-2px);
}

.login-btn:active { transform: translateY(0); }

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 24px;
  text-align: center;
}

.auth-footer a {
  color: #64748b;
  font-size: 0.85rem;
  text-decoration: none;
}

.auth-footer a:hover { color: #38bdf8; }

/* Loading Spinner */
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(2, 6, 23, 0.3);
  border-radius: 50%;
  border-top-color: #020617;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>