<template>
  <div class="heartbeat">
    <h1>Heartbeat</h1>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <h3>API Heartbeat</h3>
          </template>
          <el-result
            icon="success"
            title="API is Healthy"
            sub-title="All systems operational"
          />
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card>
          <template #header>
            <h3>Agent Heartbeats</h3>
          </template>
          <el-empty description="No agent data available" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: var(--spacing-lg);
}
</style>
