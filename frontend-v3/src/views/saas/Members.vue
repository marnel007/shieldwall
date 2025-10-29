<template>
  <div class="members">
    <div class="page-header">
      <h1>Members & Roles</h1>
      <el-button type="primary" @click="handleInviteMember">
        <el-icon><Plus /></el-icon>
        Invite Member
      </el-button>
    </div>
    
    <el-card>
      <el-table :data="[]" style="width: 100%">
        <el-table-column prop="email" label="Email" />
        <el-table-column prop="role" label="Role" />
        <el-table-column prop="status" label="Status" />
        <el-table-column prop="joinedAt" label="Joined" />
        <el-table-column label="Actions" width="180">
          <template #default>
            <el-button size="small">Change Role</el-button>
            <el-button size="small" type="danger">Remove</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-empty description="No members found" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'

const handleInviteMember = () => {
  // TODO: Implement invite member modal
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
