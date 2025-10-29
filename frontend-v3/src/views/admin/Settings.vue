<template>
  <div class="settings">
    <h1>Settings</h1>
    
    <el-card>
      <el-tabs>
        <el-tab-pane label="Profile" name="profile">
          <h3>Profile Settings</h3>
          <p>Manage your profile information</p>
        </el-tab-pane>
        
        <el-tab-pane label="Security" name="security">
          <h3>Security Settings</h3>
          <p>Manage your security preferences</p>
        </el-tab-pane>
        
        <el-tab-pane label="Notifications" name="notifications">
          <h3>Notification Settings</h3>
          <p>Configure your notification preferences</p>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: var(--spacing-lg);
}

h3 {
  margin-bottom: var(--spacing-md);
}
</style>
