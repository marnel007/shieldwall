<template>
  <div class="billing">
    <h1>Billing</h1>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <template #header>
            <h3>Current Plan</h3>
          </template>
          <div style="margin-bottom: 20px;">
            <div style="color: var(--text-secondary); margin-bottom: 8px;">Plan</div>
            <div style="font-size: 24px; font-weight: 600;">Free</div>
          </div>
          <el-button type="primary" @click="handleUpgrade">
            Upgrade Plan
          </el-button>
        </el-card>
      </el-col>
      
      <el-col :span="16">
        <el-card>
          <template #header>
            <h3>Billing History</h3>
          </template>
          <el-empty description="No billing history" />
        </el-card>
      </el-col>
    </el-row>
    
    <el-card style="margin-top: 20px;">
      <template #header>
        <h3>Payment Methods</h3>
      </template>
      <el-empty description="No payment methods added">
        <el-button type="primary" @click="handleAddPayment">Add Payment Method</el-button>
      </el-empty>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const handleUpgrade = () => {
  // TODO: Implement upgrade flow
}

const handleAddPayment = () => {
  // TODO: Implement add payment method
}
</script>

<style scoped>
h1 {
  margin-bottom: var(--spacing-lg);
}

h3 {
  margin: 0;
}
</style>
