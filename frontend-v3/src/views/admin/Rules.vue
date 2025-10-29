<template>
  <div class="rules">
    <div class="page-header">
      <h1>Rules</h1>
      <el-button type="primary" @click="handleCreateRule">
        <el-icon><Plus /></el-icon>
        Create Rule
      </el-button>
    </div>
    
    <el-row :gutter="20">
      <el-col :span="8" v-for="i in 3" :key="i">
        <el-card class="rule-card" shadow="hover">
          <template #header>
            <div class="rule-header">
              <h3>Sample Rule {{ i }}</h3>
              <el-switch :model-value="true" />
            </div>
          </template>
          <p>Rule description goes here...</p>
          <div class="rule-actions">
            <el-button size="small">Edit</el-button>
            <el-button size="small" type="danger">Delete</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'

const handleCreateRule = () => {
  // TODO: Implement create rule drawer
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.rule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rule-header h3 {
  margin: 0;
}

.rule-actions {
  margin-top: var(--spacing-md);
  display: flex;
  gap: var(--spacing-sm);
}
</style>
