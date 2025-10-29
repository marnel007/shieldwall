<template>
  <div class="organizations">
    <div class="page-header">
      <h1>Organizations</h1>
      <el-button type="primary" @click="handleCreateOrg">
        <el-icon><Plus /></el-icon>
        Create Organization
      </el-button>
    </div>
    
    <el-row :gutter="20">
      <el-col :span="8" v-for="org in organizations" :key="org.id">
        <el-card shadow="hover">
          <template #header>
            <h3>{{ org.name }}</h3>
          </template>
          <p><strong>Slug:</strong> {{ org.slug }}</p>
          <p><strong>Role:</strong> {{ org.role || 'Member' }}</p>
          <p><strong>Created:</strong> {{ formatDate(org.created_at) }}</p>
        </el-card>
      </el-col>
    </el-row>
    
    <el-empty v-if="organizations.length === 0" description="No organizations found" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrganizationStore } from '@/stores/organization'
import { Plus } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

const orgStore = useOrganizationStore()
const organizations = computed(() => orgStore.organizations)

const formatDate = (date: string) => {
  return dayjs(date).format('MMM D, YYYY')
}

const handleCreateOrg = () => {
  // TODO: Implement create organization modal
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

h3 {
  margin: 0;
}
</style>
