<template>
  <el-container class="app-shell">
    <el-aside :width="sidebarWidth" class="sidebar">
      <div class="sidebar-header">
        <h1 class="brand">Front Cloud</h1>
      </div>
      
      <el-menu
        :default-active="activeMenu"
        router
        class="sidebar-menu"
        @select="handleMenuSelect"
      >
        <el-menu-item index="/new">
          <el-icon><HomeFilled /></el-icon>
          <span>Dashboard</span>
        </el-menu-item>
        
        <el-menu-item index="/new/agents">
          <el-icon><Monitor /></el-icon>
          <span>Agents</span>
        </el-menu-item>
        
        <el-menu-item index="/new/rules">
          <el-icon><DocumentChecked /></el-icon>
          <span>Rules</span>
        </el-menu-item>
        
        <el-menu-item index="/new/heartbeat">
          <el-icon><Notification /></el-icon>
          <span>Heartbeat</span>
        </el-menu-item>
        
        <el-menu-item index="/new/docs">
          <el-icon><Reading /></el-icon>
          <span>Documentation</span>
        </el-menu-item>
        
        <el-divider style="margin: 12px 0;" />
        
        <el-sub-menu index="saas">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>SaaS</span>
          </template>
          <el-menu-item index="/new/organizations">Organizations</el-menu-item>
          <el-menu-item index="/new/members">Members & Roles</el-menu-item>
          <el-menu-item index="/new/billing">Billing</el-menu-item>
        </el-sub-menu>
        
        <el-menu-item index="/new/settings">
          <el-icon><Tools /></el-icon>
          <span>Settings</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header class="topbar">
        <div class="topbar-left">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/new' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentRouteName">{{ currentRouteName }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <div class="topbar-right">
          <!-- Organization Switcher -->
          <el-select
            v-model="currentOrgId"
            placeholder="Select Organization"
            class="org-switcher"
            @change="handleOrgChange"
          >
            <el-option
              v-for="org in organizations"
              :key="org.id"
              :label="org.name"
              :value="org.id"
            />
          </el-select>
          
          <!-- Dark Mode Toggle -->
          <el-tooltip :content="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            <el-button circle @click="toggleTheme">
              <el-icon v-if="isDark"><Moon /></el-icon>
              <el-icon v-else><Sunny /></el-icon>
            </el-button>
          </el-tooltip>
          
          <!-- User Menu -->
          <el-dropdown @command="handleUserCommand">
            <span class="user-dropdown">
              <el-avatar :size="32">
                {{ userInitials }}
              </el-avatar>
              <el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item disabled>
                  {{ user?.email }}
                </el-dropdown-item>
                <el-dropdown-item divided command="profile">
                  Profile
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  Logout
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useOrganizationStore } from '@/stores/organization'
import { useThemeStore } from '@/stores/theme'
import {
  HomeFilled,
  Monitor,
  DocumentChecked,
  Notification,
  Reading,
  Setting,
  Tools,
  ArrowDown,
  Moon,
  Sunny,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const orgStore = useOrganizationStore()
const themeStore = useThemeStore()

const sidebarWidth = ref('240px')
const isDark = computed(() => themeStore.isDark)

const activeMenu = computed(() => route.path)
const currentRouteName = computed(() => route.name as string)
const user = computed(() => authStore.user)
const organizations = computed(() => orgStore.organizations)
const currentOrgId = computed({
  get: () => orgStore.currentOrgId || '',
  set: (value) => orgStore.setCurrentOrg(value),
})

const userInitials = computed(() => {
  if (!user.value) return 'U'
  const parts = user.value.username?.split(' ') || [user.value.email]
  return parts.map((p: string) => p[0]).join('').toUpperCase().slice(0, 2)
})

const handleMenuSelect = (_index: string) => {
  // Menu selection handled by router
}

const handleOrgChange = (orgId: string) => {
  orgStore.setCurrentOrg(orgId)
  // Optionally reload data when org changes
  window.location.reload()
}

const toggleTheme = () => {
  themeStore.toggle()
}

const handleUserCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push('/new/settings')
      break
    case 'logout':
      authStore.logout()
      router.push('/login')
      break
  }
}
</script>

<style scoped>
.app-shell {
  height: 100vh;
}

.sidebar {
  background-color: #001529;
  color: #fff;
  overflow-y: auto;
}

.sidebar-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.brand {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.sidebar-menu {
  border-right: none;
  background-color: transparent;
}

:deep(.sidebar-menu .el-menu-item),
:deep(.sidebar-menu .el-sub-menu__title) {
  color: rgba(255, 255, 255, 0.65);
}

:deep(.sidebar-menu .el-menu-item:hover),
:deep(.sidebar-menu .el-sub-menu__title:hover) {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}

:deep(.sidebar-menu .el-menu-item.is-active) {
  color: #fff;
  background-color: #1890ff;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid var(--border-light);
  padding: 0 var(--spacing-lg);
}

.topbar-left {
  flex: 1;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.org-switcher {
  width: 200px;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
}

.main-content {
  background-color: var(--bg-secondary);
  padding: var(--spacing-lg);
  overflow-y: auto;
}
</style>
