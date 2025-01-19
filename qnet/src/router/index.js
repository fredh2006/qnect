import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      { path: '/profile', name: 'profile', component: () => import('../pages/ProfileView.vue') },
      { path: '/', name: 'home', component: () => import('../pages/HomeView.vue') },
      { path: '/login', name: 'login', component: () => import('../pages/LoginView.vue') },
      { path: '/register', name: 'register', component: () =>import('../pages/Register.vue')}, 
      { path: '/groq', name: 'groq', component: () =>import('../pages/groqExample.vue')}, 
      { path: '/dashboard', name: 'dashboard', component: () =>import('../pages/dashboardView.vue')},
      { path: '/matches', name: 'matches', component: () =>import('../pages/matches.vue')},
      { path: '/alreadyMatched', name: 'alreadyMatched', component: () =>import('../pages/AlreadyMatched.vue')},

    ]
  })
  
  export default router