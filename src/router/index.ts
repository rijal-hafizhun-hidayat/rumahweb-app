import { createRouter, createWebHistory } from 'vue-router'
import DashboardIndexView from '@/views/dashboard/IndexView.vue'
import UserIndexView from '@/views/user/IndexView.vue'
import UserDetailView from '@/views/user/DetailUser.vue'

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
      children: [
        {
          path: '',
          name: 'user.index',
          component: UserIndexView,
        },
        {
          path: ':userId',
          name: 'user.detail',
          component: UserDetailView,
        },
      ],
    },
  ],
})

export default router
