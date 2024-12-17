import { createRouter, createWebHistory } from 'vue-router'
import DashboardIndexView from '@/views/dashboard/IndexView.vue'
import UserIndexView from '@/views/user/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard.index',
      component: DashboardIndexView,
    },
    {
      path: '/user',
      name: 'user.index',
      component: UserIndexView,
    },
  ],
})

export default router
