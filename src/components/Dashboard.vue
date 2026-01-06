<template>
  <div class="app-layout" :class="{ 'sidebar-collapsed': isCollapsed }">
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="brand">
          <div class="logo">LS</div>
          <h2 v-if="!isCollapsed">LibrarySys</h2>
        </div>
        <button class="collapse-toggle" @click="isCollapsed = !isCollapsed">
          {{ isCollapsed ? '→' : '←' }}
        </button>
      </div>

      <nav class="nav-links">
        <router-link 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path" 
          class="nav-item"
          active-class="active"
        >
          <span class="icon">{{ item.icon }}</span>
          <span v-if="!isCollapsed" class="label">{{ item.text }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-btn" @click="handleLogout">
          <span class="icon">🚀</span>
          <span v-if="!isCollapsed">Logout</span>
        </button>
      </div>
    </aside>

    <main class="content">
      <header class="top-bar">
        <div class="welcome">
          <h1>Dashboard Overview</h1>
          <p>Welcome back, Admin</p>
        </div>
        <div class="user-profile">
          <div class="avatar">JD</div>
        </div>
      </header>

      <section class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-icon" :style="{ backgroundColor: stat.color + '20', color: stat.color }">
            {{ stat.icon }}
          </div>
          <div class="stat-info">
            <span class="stat-label">{{ stat.label }}</span>
            <span class="stat-value">{{ stat.value }}</span>
          </div>
          <div class="trend" :class="stat.trend > 0 ? 'up' : 'down'">
            {{ stat.trend > 0 ? '↑' : '↓' }} {{ Math.abs(stat.trend) }}%
          </div>
        </div>
      </section>

      <div class="view-container">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCollapsed = ref(false)

const menuItems = [
  { text: 'Dashboard', path: '/dashboard', icon: '📊' },
  { text: 'Books', path: '/books', icon: '📚' },
  { text: 'Members', path: '/members', icon: '👥' },
  { text: 'Settings', path: '/settings', icon: '⚙️' },
]

const stats = [
  { label: 'Total Books', value: '1,284', icon: '📖', color: '#38bdf8', trend: 12 },
  { label: 'Active Members', value: '842', icon: '👤', color: '#a855f7', trend: 5 },
  { label: 'Issued Today', value: '42', icon: '📝', color: '#22c55e', trend: -2 },
]

const handleLogout = () => {
  if (confirm("Are you sure you want to log out?")) {
    // Clear Session/Tokens
    localStorage.removeItem('auth_token')
    sessionStorage.clear()
    
    // Redirect to Login Page
    router.push('/login')
    console.log("Logged out successfully.")
  }
}
</script>

<style scoped>
/* --- CORE LAYOUT --- */
.app-layout {
  display: flex;
  height: 100vh;
  background: #020617;
  color: #f8fafc;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
}

/* --- SIDEBAR --- */
.sidebar {
  width: 260px;
  background: #0f172a;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 24px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.sidebar-collapsed .sidebar {
  width: 85px;
  padding: 24px 15px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  background: #38bdf8;
  color: #020617;
  font-weight: 800;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-shrink: 0;
}

.collapse-toggle {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #94a3b8;
  border-radius: 6px;
  cursor: pointer;
  padding: 4px 8px;
}

.nav-links { flex: 1; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: 0.2s;
  white-space: nowrap;
}

.nav-item:hover { background: rgba(255, 255, 255, 0.05); color: white; }
.nav-item.active { background: #38bdf8; color: #020617; font-weight: 600; }

/* --- MAIN CONTENT --- */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 40px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.welcome h1 { font-size: 1.5rem; margin-bottom: 4px; }
.welcome p { color: #64748b; }

.avatar {
  width: 40px; height: 40px;
  background: #1e293b;
  border: 2px solid #38bdf8;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: bold;
}

/* --- STATS CARDS --- */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: #0f172a;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
}

.stat-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
.stat-label { color: #64748b; font-size: 0.9rem; }
.stat-value { font-size: 1.4rem; font-weight: 700; color: white; }

.trend { position: absolute; top: 24px; right: 24px; font-size: 0.75rem; padding: 2px 8px; border-radius: 6px; }
.trend.up { background: rgba(34, 197, 94, 0.1); color: #22c55e; }
.trend.down { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

/* --- LOGOUT BUTTON --- */
.logout-btn {
  width: 100%;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: none;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  transition: 0.3s;
}

.logout-btn:hover { background: #ef4444; color: white; }

/* --- ANIMATIONS --- */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>