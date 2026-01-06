<template>
  <div class="app-bg"></div>

  <div class="page-layout">
    <header class="top-header">
      <nav class="navigation-wrapper">
        <button class="btn-back" @click="goToDashboard">
          <span class="back-icon">←</span> Back to Dashboard
        </button>
      </nav>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-label">TOTAL MEMBERS</span>
          <span class="stat-value">{{ members.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">ACTIVE NOW</span>
          <span class="stat-value highlight">3</span>
        </div>
      </div>
    </header>

    <section class="page-title-section">
      <h1>Directory</h1>
      <p class="subtitle">Overview of current community members and status</p>
    </section>
      
    <div class="controls-section">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input v-model="searchQuery" placeholder="Search by name or email..." class="dark-input" />
      </div>
      <div class="filter-tabs">
        <button class="tab active">All</button>
        <button class="tab">Active</button>
        <button class="tab">Inactive</button>
      </div>
    </div>

    <div class="main-content">
      <transition name="slide">
        <div v-if="showAddForm" class="dark-panel add-panel">
          <h3>Register Member</h3>
          <div class="form-grid">
            <div class="input-field">
              <label>Full Name</label>
              <input v-model="form.name" class="dark-input" @keyup.enter="addMember" placeholder="e.g. John Doe" />
            </div>
            <div class="input-field">
              <label>Email Address</label>
              <input v-model="form.email" class="dark-input" @keyup.enter="addMember" placeholder="e.g. john@example.com" />
            </div>
            <button @click="addMember" class="submit-btn" :disabled="!isFormValid">
              Confirm Addition
            </button>
          </div>
        </div>
      </transition>

      <TransitionGroup name="list" tag="div" class="members-grid">
        <div class="dark-card member-card" v-for="member in filteredMembers" :key="member.id">
          <div class="card-top">
            <span class="status-tag active">Active</span>
            <button class="menu-dots">•••</button>
          </div>
          
          <div class="card-body">
            <h4>{{ member.name }}</h4>
            <p>{{ member.email }}</p>
            <span class="join-date">Joined 2026</span>
          </div>
          
          <div class="card-action">
             <button class="action-btn">View Profile</button>
          </div>
        </div>
      </TransitionGroup>

      <div v-if="filteredMembers.length === 0" class="empty-state">
        <p>No members found matching "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('')
// NOTE: showAddForm state is kept but the button triggering it was replaced by filter tabs to match the image UI. 
// You would need to re-add a "New" button somewhere if you still need this functionality.
const showAddForm = ref(false) 
const form = reactive({ name: '', email: '' })

const members = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@mail.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@mail.com' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@mail.com' },
  { id: 4, name: 'Diana Prince', email: 'diana@mail.com' },
])

const isFormValid = computed(() => form.name.length > 2 && form.email.includes('@'))

const filteredMembers = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return members.value.filter(m => 
    m.name.toLowerCase().includes(query) || m.email.toLowerCase().includes(query)
  )
})

const goToDashboard = () => {
  router.push('/dashboard')
}

function addMember() {
  if (!isFormValid.value) return
  members.value.unshift({ id: Date.now(), ...form })
  form.name = ''; form.email = ''
  showAddForm.value = false
}

// removeMember function removed as the UI changed to a three-dot menu style
</script>

<style scoped>
/* === 1. Global Colors & Reset === */
.app-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-color: #0B1120; /* Deep dark navy background */
}

.page-layout {
  min-height: 100vh;
  padding: 40px 60px;
  position: relative;
  z-index: 1;
  color: #ffffff;
  font-family: 'Inter', system-ui, sans-serif;
}

/* === 2. Header & Navigation === */
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 60px;
}

.btn-back {
  background: #1E293B; /* Slate 800 */
  border: 1px solid #334155;
  color: #94a3b8;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: 0.2s;
}
.btn-back:hover { background: #334155; color: #fff; }

.header-stats { display: flex; gap: 40px; }
.stat-item { display: flex; flex-direction: column; align-items: flex-end; }
.stat-label { color: #64748b; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 4px; }
.stat-value { font-size: 2rem; font-weight: 700; line-height: 1; }
.stat-value.highlight { color: #fff; position: relative; }
/* Subtle indicator bar next to active count */
.stat-value.highlight::after {
    content: ''; position: absolute; right: -20px; top: 50%; transform: translateY(-50%);
    height: 4px; width: 12px; background: #10B981; border-radius: 2px; opacity: 0.5;
}

.page-title-section h1 { font-size: 2.5rem; font-weight: 700; margin: 0 0 8px 0; color: #fff; }
.subtitle { color: #94a3b8; font-size: 1.1rem; margin: 0; }


/* === 3. Controls (Search & Filters) === */
.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 30px;
}

.search-wrapper {
  position: relative;
  width: 400px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  pointer-events: none;
}

.dark-input {
  width: 100%;
  background: #1E293B; /* Slate 800 */
  border: 1px solid #334155;
  padding: 14px 16px 14px 48px; /* padded for icon */
  border-radius: 12px;
  color: #fff;
  outline: none;
  transition: 0.3s;
  font-size: 0.95rem;
}
.dark-input::placeholder { color: #64748b; }
.dark-input:focus { border-color: #3b82f6; }

.filter-tabs {
  display: flex;
  background: #1E293B;
  padding: 4px;
  border-radius: 10px;
  border: 1px solid #334155;
}

.tab {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 8px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: 0.2s;
}
.tab.active { background: #0F172A; color: #fff; }
.tab:hover:not(.active) { color: #fff; }


/* === 4. Dark Cards & Grid === */
.members-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 25px; }

.dark-card {
  background: #1E293B; /* Slate 800 - Matches reference card color */
  border-radius: 16px;
  border: 1px solid #334155; /* Subtle border */
  overflow: hidden; /* Ensure button at bottom gets rounded corners */
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.dark-card:hover { transform: translateY(-4px); border-color: #475569; }

.card-top { display: flex; justify-content: space-between; align-items: center; padding: 24px 24px 0; }

.status-tag {
    font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
    padding: 6px 12px; border-radius: 6px;
}
.status-tag.active { background: rgba(16, 185, 129, 0.2); color: #10B981; /* Green */ }

.menu-dots {
    background: transparent; border: none; color: #94a3b8; font-size: 1.2rem; cursor: pointer; padding: 4px;
}
.menu-dots:hover { color: #fff; }

.card-body { padding: 20px 24px 30px; flex-grow: 1; }
.card-body h4 { font-size: 1.25rem; margin: 0 0 8px; color: #fff; font-weight: 700; }
.card-body p { color: #94a3b8; margin: 0 0 16px; font-size: 0.95rem; }
.join-date { display: block; color: #64748b; font-size: 0.8rem; }

.card-action { padding: 0 24px 24px; }
.action-btn {
    width: 100%;
    background: #334155; /* Slightly lighter than card bg */
    color: #fff;
    border: none;
    padding: 14px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}
.action-btn:hover { background: #475569; }


/* Legacy Styles for Add Form (adapted slightly for dark theme) */
.dark-panel { background: #1E293B; border: 1px solid #334155; border-radius: 24px; padding: 30px; margin-bottom: 30px;}
.submit-btn { background: #3b82f6; color: white; padding: 14px 24px; border-radius: 14px; border: none; font-weight: 700; cursor: pointer; width: 100%; margin-top: 20px;}
.form-group label { color: #94a3b8; display: block; margin-bottom: 8px;}
.input-field { margin-bottom: 20px; }

/* Transitions */
.list-move, .list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-leave-active { position: absolute; }
.list-enter-from, .list-leave-to { opacity: 0; transform: scale(0.95); }
</style>