import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authMiddleware from '@/middleware/auth.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      beforeEnter: () => authMiddleware,
    },
    {
      path: '/tasks',
      name: 'tasks.index',
      component: () => import('../views/tasks/Index.vue'),
      beforeEnter: () => authMiddleware,
    },
    {
      path: '/tasks/create',
      name: 'tasks.create',
      component: () => import('../views/tasks/Create.vue'),
      beforeEnter: () => authMiddleware,
    },
    {
      path: '/tasks/:id/edit',
      name: 'tasks.edit',
      component: () => import('../views/tasks/Edit.vue'),
      beforeEnter: () => authMiddleware,
    },
  ],
})

export default router
