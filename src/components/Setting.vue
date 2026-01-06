<template>
  <div class="settings-container animate-fade-in">
    <nav class="navigation-top">
      <button class="btn-back" @click="goBack">
        <span class="back-icon">←</span> Back to Dashboard
      </button>
    </nav>

    <header class="section-header">
      <div class="title-meta">
        <h1>System Configuration</h1>
        <p>Adjust global parameters, admin profiles, and lending protocols.</p>
      </div>
      <div class="save-indicator" v-if="lastSaved">
        Last saved: {{ lastSaved }}
      </div>
    </header>

    <div class="settings-grid">
      <section class="settings-card glass profile-border">
        <div class="card-header">
          <span class="card-icon">👤</span>
          <h3>Admin Profile</h3>
        </div>
        <div class="form-group">
          <label>Display Name</label>
          <input type="text" v-model="settings.adminName" class="modern-input" placeholder="Enter admin name" />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" v-model="settings.email" class="modern-input" placeholder="admin@example.com" />
        </div>
      </section>

      <section class="settings-card glass prefs-border">
        <div class="card-header">
          <span class="card-icon">⚙️</span>
          <h3>Preferences</h3>
        </div>
        <div class="setting-row">
          <div class="label-info">
            <span class="main-label">Email Notifications</span>
            <span class="sub-label">Alerts for overdue books</span>
          </div>
          <label class="switch">
            <input type="checkbox" v-model="settings.notifications">
            <span class="slider"></span>
          </label>
        </div>
        <div class="divider"></div>
        <div class="setting-row">
          <div class="label-info">
            <span class="main-label">High-Contrast Mode</span>
            <span class="sub-label">Optimized for accessibility</span>
          </div>
          <label class="switch">
            <input type="checkbox" checked disabled>
            <span class="slider disabled"></span>
          </label>
        </div>
      </section>

      <section class="settings-card glass rules-border">
        <div class="card-header">
          <span class="card-icon">📚</span>
          <h3>Lending Rules</h3>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label>Checkout Limit</label>
            <input type="number" v-model="settings.maxBooks" class="modern-input" />
          </div>
          <div class="form-group">
            <label>Loan Period (Days)</label>
            <input type="number" v-model="settings.loanDays" class="modern-input" />
          </div>
        </div>
      </section>
    </div>

    <div class="actions">
      <button class="save-btn" :class="{ 'saving': isSaving }" @click="saveSettings">
        <span v-if="!isSaving">Save Changes</span>
        <span v-else class="loader"></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router' // 2. IMPORTED ROUTER

const router = useRouter() // 3. INITIALIZED ROUTER
const isSaving = ref(false)
const lastSaved = ref('')

const settings = reactive({
  adminName: 'Admin User',
  email: 'admin@librarysys.com',
  notifications: true,
  maxBooks: 5,
  loanDays: 14
})

// 4. ADDED NAVIGATION FUNCTION
const goBack = () => {
  router.push('/dashboard') 
}

const saveSettings = () => {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    const now = new Date()
    lastSaved.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }, 1000)
}
</script>

<style scoped>
/* 5. ADDED STYLES FOR BACK BUTTON */
.navigation-top {
  margin-bottom: 24px;
}

.btn-back {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 18px;
  border-radius: 12px;
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-color: #38bdf8;
  transform: translateX(-4px); /* Arrow "nudge" effect */
}

/* Original styles below */
.settings-container { padding: 40px 0; max-width: 1200px; margin: 0 auto; position: relative; z-index: 1;}
.section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
.title-meta h1 { font-size: 2.2rem; font-weight: 800; color: #fff; margin: 0; }
.title-meta p { color: #64748b; margin-top: 8px; }
.save-indicator { color: #22c55e; font-size: 0.85rem; font-weight: 600; }
.settings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; }
.settings-card { padding: 32px; border-radius: 28px; position: relative; overflow: hidden; transition: 0.3s ease; }
.settings-card:hover { transform: translateY(-4px); }
.glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); }
.profile-border { border-top: 4px solid #38bdf8; }
.prefs-border { border-top: 4px solid #a855f7; }
.rules-border { border-top: 4px solid #22c55e; }
.card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.card-icon { font-size: 1.5rem; }
.card-header h3 { font-size: 1.1rem; color: #fff; margin: 0; }
.form-group label { display: block; color: #94a3b8; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 10px; }
.modern-input { width: 100%; background: rgba(2, 6, 23, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); padding: 14px 18px; border-radius: 14px; color: #fff; transition: 0.2s; }
.modern-input:focus { outline: none; border-color: #38bdf8; background: rgba(2, 6, 23, 0.8); box-shadow: 0 0 20px rgba(56, 189, 248, 0.15); }
.setting-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; }
.label-info { display: flex; flex-direction: column; }
.main-label { color: #f8fafc; font-weight: 600; }
.sub-label { color: #64748b; font-size: 0.8rem; }
.divider { height: 1px; background: rgba(255, 255, 255, 0.05); margin: 8px 0; }
.switch { position: relative; width: 44px; height: 24px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; inset: 0; background: #1e293b; border-radius: 34px; transition: .4s; }
.slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: .4s; }
input:checked + .slider { background: #38bdf8; }
input:checked + .slider:before { transform: translateX(20px); }
.actions { margin-top: 48px; }
.save-btn { background: #38bdf8; color: #020617; padding: 18px 40px; border-radius: 16px; font-weight: 800; border: none; cursor: pointer; transition: 0.3s; min-width: 200px; }
.save-btn:hover:not(.saving) { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(56, 189, 248, 0.3); }
.saving { opacity: 0.7; cursor: wait; }
.loader { width: 20px; height: 20px; border: 3px solid rgba(2, 6, 23, 0.2); border-top-color: #020617; border-radius: 50%; display: inline-block; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fadeIn 0.5s ease-out; }
</style>