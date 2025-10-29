<template>
  <div class="auth-container">
    <el-card class="auth-card">
      <template #header>
        <div class="auth-header">
          <h2>Verify Your Email</h2>
        </div>
      </template>
      
      <el-result
        icon="success"
        title="Check Your Email"
        sub-title="We've sent a verification link to your email address. Please click the link to verify your account."
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/login')">
            Go to Login
          </el-button>
        </template>
      </el-result>
    </el-card>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: var(--spacing-md);
}

.auth-card {
  width: 100%;
  max-width: 500px;
}

.auth-header {
  text-align: center;
}

.auth-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
}
</style>
