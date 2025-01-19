import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      { path: '/profile', name: 'profile', component: () => import('../pages/ProfileView.vue') },
      { path: '/', name: 'home', component: () => import('../pages/HomeView.vue') },
      { path: '/login', name: 'login', component: () => import('../pages/LoginView.vue') },
      { path: '/register', name: 'register', component: () =>import('../pages/Register.vue')}, 
      { path: '/chatbot', name: 'groq', component: () =>import('../pages/groqExample.vue')}, 
      { path: '/dashboard', name: 'dashboard', component: () =>import('../pages/dashboardView.vue')},
      { path: '/matches', name: 'alreadyMatched', component: () =>import('../pages/alreadyMatched.vue')},
      { path: '/chat', name: 'chat', component: () =>import('../pages/TestChat.vue')},
      { path: '/yourprofile', name: 'yourprofile', component: () => import('../pages/PersonProfileView.vue')},
      { path: '/explore', name: 'explore', component: () => import('../pages/Explore.vue')},
      { path: '/ourmission', name: 'ourmission', component: () => import('../pages/OurMission.vue')}

    ]
  })
  
  export default router