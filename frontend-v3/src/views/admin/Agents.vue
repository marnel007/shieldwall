<template>
  <div class="agents">
    <div class="page-header">
      <h1>Agents</h1>
      <el-button type="primary" @click="handleAddAgent">
        <el-icon><Plus /></el-icon>
        Add Agent
      </el-button>
    </div>
    
    <el-card>
      <el-input
        v-model="search"
        placeholder="Search agents..."
        style="max-width: 300px; margin-bottom: 20px;"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      
      <el-table :data="[]" style="width: 100%">
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="status" label="Status" />
        <el-table-column prop="lastSeen" label="Last Seen" />
        <el-table-column label="Actions" width="180">
          <template #default>
            <el-button size="small">Edit</el-button>
            <el-button size="small" type="danger">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-empty v-if="true" description="No agents found" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'

const search = ref('')

const handleAddAgent = () => {
  // TODO: Implement add agent modal
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}
</style>
