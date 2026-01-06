<template>
  <div class="dashboard-container">
    <header class="page-header">
      <div class="title-area">
        <button class="back-btn" @click="goBack">
          <span class="back-icon">←</span>
          <span>Back to Dashboard</span>
        </button>

        <h1>Library <span class="highlight">Analytics</span></h1>
        <p class="text-secondary">Overview of your current collection and status</p>
      </div>
      
      <div class="stats-bento">
        <div class="bento-item main-stat">
          <div class="stat-content">
            <span class="stat-label">Total Books</span>
            <span class="stat-value">{{ books.length }}</span>
          </div>
          <div class="stat-icon">📚</div>
        </div>
        <div class="bento-item stat-warning">
          <div class="stat-content">
            <span class="stat-label">Currently Issued</span>
            <span class="stat-value">{{ issuedCount }}</span>
          </div>
          <div class="progress-mini">
            <div class="progress-fill" :style="{ width: (issuedCount / books.length) * 100 + '%' }"></div>
          </div>
        </div>
      </div>
    </header>

    <div class="toolbar">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input v-model="searchQuery" type="text" placeholder="Search by title or author..." class="modern-input" />
      </div>
      
      <div class="filter-pills">
        <button 
          v-for="s in ['all', 'available', 'issued']" 
          :key="s"
          @click="filter = s"
          :class="['pill', { active: filter === s }]"
        >
          {{ s }}
        </button>
      </div>
    </div>

    <TransitionGroup name="staggered-list" tag="div" class="book-grid">
      <div 
        v-for="book in filteredBooks" 
        :key="book.id" 
        class="glass-card"
        :class="book.status"
      >
        <div class="card-glow"></div>
        <div class="card-header">
          <span :class="['status-tag', book.status]">{{ book.status }}</span>
          <button class="menu-dots">•••</button>
        </div>
        
        <div class="card-body">
          <h3>{{ book.title }}</h3>
          <p class="author-name">{{ book.author }}</p>
        </div>

        <div class="card-footer">
          <button @click="toggleStatus(book.id)" class="action-trigger">
            {{ book.status === 'available' ? 'Issue to Member' : 'Process Return' }}
          </button>
        </div>
      </div>
    </TransitionGroup>

    <div v-if="filteredBooks.length === 0" class="empty-state-fancy">
      <div class="empty-icon">📂</div>
      <h3>No matches found</h3>
      <p>Try adjusting your search or filters.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router' // Import router for navigation

const router = useRouter()
const searchQuery = ref('')
const filter = ref('all')

const goBack = () => {
  // If you are using vue-router:
  router.push('/dashboard') 
  // Or simply: router.back()
}

const books = ref([
  { id: 1, title: 'Project Hail Mary', author: 'Andy Weir', status: 'available' },
  { id: 2, title: 'The Silent Patient', author: 'Alex Michaelides', status: 'issued' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', status: 'available' },
  { id: 4, title: 'The Midnight Library', author: 'Matt Haig', status: 'available' },
])

const issuedCount = computed(() => books.value.filter(b => b.status === 'issued').length)

const filteredBooks = computed(() => {
  return books.value.filter(b => {
    const searchMatch = (b.title + b.author).toLowerCase().includes(searchQuery.value.toLowerCase())
    const filterMatch = filter.value === 'all' || b.status === filter.value
    return searchMatch && filterMatch
  })
})

const toggleStatus = (id) => {
  const book = books.value.find(b => b.id === id)
  book.status = book.status === 'available' ? 'issued' : 'available'
}
</script>

<style scoped>
/* Design System Variables */
:root {
  --primary: #38bdf8;
  --bg: #020617;
  --card-bg: #0f172a;
  --border: rgba(255,255,255,0.08);
}

.dashboard-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 60px 40px;
  background: var(--bg);
  min-height: 100vh;
  color: white;
}

/* NEW: Back Button Style */
.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  color: #94a3b8;
  padding: 10px 18px;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 24px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  width: fit-content;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--primary);
  border-color: var(--primary);
  transform: translateX(-4px);
}

.back-icon {
  font-size: 1.1rem;
}

/* Header & Bento Stats */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 50px;
  gap: 40px;
}

.highlight { color: var(--primary); }

.stats-bento {
  display: flex;
  gap: 15px;
}

.bento-item {
  background: var(--card-bg);
  border: 1px solid var(--border);
  padding: 20px 30px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 220px;
}

.stat-value { font-size: 2rem; font-weight: 800; display: block; }
.stat-label { color: #64748b; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }

.progress-mini {
  width: 100px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  transition: width 0.5s ease;
}

/* Modern Input */
.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: center;
}

.search-wrapper {
  position: relative;
  width: 400px;
}

.search-icon { position: absolute; left: 15px; top: 12px; opacity: 0.5; }

.modern-input {
  width: 100%;
  background: #1e293b;
  border: 1px solid var(--border);
  padding: 12px 12px 12px 45px;
  border-radius: 14px;
  color: white;
  transition: 0.3s;
}

.modern-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
}

/* Filter Pills */
.pill {
  background: transparent;
  border: 1px solid transparent;
  color: #64748b;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
  text-transform: capitalize;
}

.pill.active {
  background: rgba(56, 189, 248, 0.1);
  color: var(--primary);
  border-color: rgba(56, 189, 248, 0.2);
}

/* Glass Cards */
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.glass-card {
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 24px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.glass-card:hover {
  transform: translateY(-10px);
  border-color: rgba(56, 189, 248, 0.4);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.author-name { color: #94a3b8; font-size: 0.9rem; margin-top: 5px; }

.status-tag {
  font-size: 0.7rem;
  padding: 4px 10px;
  border-radius: 8px;
  font-weight: 700;
  text-transform: uppercase;
}

.available .status-tag { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
.issued .status-tag { background: rgba(239, 68, 68, 0.15); color: #f87171; }

.action-trigger {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.03);
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.action-trigger:hover {
  background: white;
  color: black;
}

/* Empty State */
.empty-state-fancy {
  text-align: center;
  padding: 100px 0;
  color: #64748b;
}

.empty-icon { font-size: 4rem; margin-bottom: 20px; }

/* Animations */
.staggered-list-enter-active,
.staggered-list-leave-active { transition: all 0.5s ease; }
.staggered-list-enter-from,
.staggered-list-leave-to { opacity: 0; transform: translateY(30px); }
.staggered-list-move { transition: transform 0.5s ease; }
</style>