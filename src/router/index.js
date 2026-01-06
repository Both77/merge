import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import Dashboard from '../components/Dashboard.vue'
import BookPage from '../components/BookPage.vue'
import Member from '../components/Member.vue'
import Setting from '../components/Setting.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginPage },
    { path: '/dashboard', component: Dashboard },
    { path: '/books', component: BookPage },
    { path: '/members', component: Member },
    { path: '/settings', component: Setting },
  ]
})
