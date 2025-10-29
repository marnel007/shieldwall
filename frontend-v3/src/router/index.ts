import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/verify',
    name: 'Verify',
    component: () => import('@/views/auth/Verify.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/new',
    component: () => import('@/layouts/AppShell.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
      },
      {
        path: 'agents',
        name: 'Agents',
        component: () => import('@/views/admin/Agents.vue'),
      },
      {
        path: 'rules',
        name: 'Rules',
        component: () => import('@/views/admin/Rules.vue'),
      },
      {
        path: 'heartbeat',
        name: 'Heartbeat',
        component: () => import('@/views/admin/Heartbeat.vue'),
      },
      {
        path: 'docs',
        name: 'Documentation',
        component: () => import('@/views/admin/Documentation.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/admin/Settings.vue'),
      },
      {
        path: 'organizations',
        name: 'Organizations',
        component: () => import('@/views/saas/Organizations.vue'),
      },
      {
        path: 'members',
        name: 'Members',
        component: () => import('@/views/saas/Members.vue'),
      },
      {
        path: 'billing',
        name: 'Billing',
        component: () => import('@/views/saas/Billing.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/new',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth !== false

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (!requiresAuth && authStore.isAuthenticated && to.name !== 'Verify') {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
