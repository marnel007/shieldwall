<template>
  <div class="documentation">
    <h1>Documentation</h1>
    
    <el-card>
      <h2>Getting Started</h2>
      <p>Welcome to Front Cloud documentation. This section will contain guides and API references.</p>
      
      <el-divider />
      
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#">Installation Guide</a></li>
        <li><a href="#">API Reference</a></li>
        <li><a href="#">Troubleshooting</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>
    </el-card>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: var(--spacing-lg);
}

h2, h3 {
  margin-top: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: var(--spacing-sm) 0;
}
</style>
