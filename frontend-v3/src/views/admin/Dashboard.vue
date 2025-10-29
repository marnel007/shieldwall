<template>
  <div class="dashboard">
    <div class="page-header">
      <div>
        <h1>Dashboard</h1>
        <p class="subtitle">Welcome back! Here's what's happening with your infrastructure.</p>
      </div>
      <el-button type="primary" @click="refreshData">
        <el-icon><Refresh /></el-icon>
        Refresh
      </el-button>
    </div>
    
    <!-- Statistics Cards -->
    <el-row :gutter="20" class="stat-cards">
      <el-col :xs="24" :sm="12" :md="6">
        <el-card shadow="hover" class="stat-card stat-card-primary">
          <div class="stat-content">
            <div class="stat-icon">
              <el-icon :size="32"><Monitor /></el-icon>
            </div>
            <div class="stat-details">
              <div class="stat-value">{{ stats.protectedAgents }}</div>
              <div class="stat-label">Protected Agents</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-card shadow="hover" class="stat-card stat-card-success">
          <div class="stat-content">
            <div class="stat-icon">
              <el-icon :size="32"><DocumentChecked /></el-icon>
            </div>
            <div class="stat-details">
              <div class="stat-value">{{ stats.activeRules }}</div>
              <div class="stat-label">Active Rules</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-card shadow="hover" class="stat-card stat-card-warning">
          <div class="stat-content">
            <div class="stat-icon">
              <el-icon :size="32"><WarningFilled /></el-icon>
            </div>
            <div class="stat-details">
              <div class="stat-value">{{ formatNumber(stats.threatsBlocked) }}</div>
              <div class="stat-label">Threats Blocked</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-card shadow="hover" class="stat-card stat-card-info">
          <div class="stat-content">
            <div class="stat-icon">
              <el-icon :size="32"><CircleCheck /></el-icon>
            </div>
            <div class="stat-details">
              <div class="stat-value">{{ stats.uptimePercentage }}%</div>
              <div class="stat-label">Uptime</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- Main Content -->
    <el-row :gutter="20" class="main-content-row">
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <h3>Recent Activity</h3>
              <el-tag v-if="activities.length > 0" type="success" effect="plain">Live</el-tag>
            </div>
          </template>
          
          <el-timeline v-if="activities.length > 0">
            <el-timeline-item
              v-for="activity in activities"
              :key="activity.id"
              :timestamp="formatTimestamp(activity.timestamp)"
              :type="getActivityType(activity.type)"
              placement="top"
            >
              <div class="activity-item">
                <div class="activity-message">{{ activity.message }}</div>
                <el-tag v-if="activity.agent_id" size="small">{{ activity.agent_id }}</el-tag>
              </div>
            </el-timeline-item>
          </el-timeline>
          
          <el-empty v-else description="No recent activity" />
        </el-card>
      </el-col>
      
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <h3>Active Rules</h3>
              <el-button text type="primary" @click="$router.push('/new/rules')">
                View All
              </el-button>
            </div>
          </template>
          
          <div v-if="rules.length > 0" class="rules-list">
            <div
              v-for="rule in rules"
              :key="rule.id"
              class="rule-item"
            >
              <div class="rule-info">
                <div class="rule-name">{{ rule.name }}</div>
                <div class="rule-description">{{ rule.description }}</div>
              </div>
              <div class="rule-status">
                <el-tag :type="rule.enabled ? 'success' : 'info'" size="small">
                  {{ rule.enabled ? 'Active' : 'Disabled' }}
                </el-tag>
              </div>
            </div>
          </div>
          
          <el-empty v-else description="No active rules" />
        </el-card>
      </el-col>
    </el-row>
    
    <!-- Live Monitoring Feed -->
    <el-card class="monitoring-feed">
      <template #header>
        <div class="card-header">
          <h3>Live Monitoring</h3>
          <div class="feed-controls">
            <el-tag :type="isMonitoring ? 'success' : 'info'" effect="plain">
              <el-icon v-if="isMonitoring"><VideoCamera /></el-icon>
              <el-icon v-else><VideoPause /></el-icon>
              {{ isMonitoring ? 'Monitoring' : 'Paused' }}
            </el-tag>
            <el-button size="small" @click="toggleMonitoring">
              {{ isMonitoring ? 'Pause' : 'Resume' }}
            </el-button>
          </div>
        </div>
      </template>
      
      <div v-if="monitoringEvents.length > 0" class="monitoring-events">
        <div
          v-for="event in monitoringEvents"
          :key="event.id"
          class="monitoring-event"
        >
          <el-tag :type="getEventSeverity(event.type)" size="small">
            {{ event.type }}
          </el-tag>
          <span class="event-message">{{ event.message }}</span>
          <span class="event-time">{{ formatTime(event.timestamp) }}</span>
        </div>
      </div>
      
      <el-empty v-else description="No events to display" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Monitor,
  DocumentChecked,
  WarningFilled,
  CircleCheck,
  Refresh,
  VideoCamera,
  VideoPause,
} from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { Statistics, Activity, Rule } from '@/types'

dayjs.extend(relativeTime)

// Statistics
const stats = ref<Statistics>({
  protectedAgents: 0,
  activeRules: 0,
  threatsBlocked: 0,
  uptimePercentage: 0,
})

// Recent activity
const activities = ref<Activity[]>([])

// Active rules
const rules = ref<Partial<Rule>[]>([])

// Monitoring feed
const monitoringEvents = ref<any[]>([])
const isMonitoring = ref(true)
let monitoringInterval: number | null = null

// Mock data loading
const loadStats = async () => {
  // TODO: Replace with real API call
  stats.value = {
    protectedAgents: 12,
    activeRules: 45,
    threatsBlocked: 1234,
    uptimePercentage: 99.9,
  }
}

const loadActivities = async () => {
  // TODO: Replace with real API call
  activities.value = [
    {
      id: '1',
      type: 'agent_connected',
      message: 'Agent web-server-01 connected',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      agent_id: 'web-server-01',
    },
    {
      id: '2',
      type: 'threat_blocked',
      message: 'Blocked malicious request from 192.168.1.100',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      type: 'rule_triggered',
      message: 'Rate limit rule triggered for /api/users',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      rule_id: 'rate-limit-api',
    },
  ] as Activity[]
}

const loadRules = async () => {
  // TODO: Replace with real API call
  rules.value = [
    {
      id: '1',
      name: 'Block Malicious IPs',
      description: 'Blocks known malicious IP addresses',
      enabled: true,
    },
    {
      id: '2',
      name: 'Rate Limiting',
      description: 'Limit requests to 100/min',
      enabled: true,
    },
    {
      id: '3',
      name: 'Geo Blocking',
      description: 'Block traffic from specific countries',
      enabled: false,
    },
  ]
}

const loadMonitoringEvents = () => {
  if (!isMonitoring.value) return
  
  // TODO: Replace with real-time data (SSE or WebSocket)
  const newEvent = {
    id: `evt-${Date.now()}`,
    type: ['info', 'warning', 'success'][Math.floor(Math.random() * 3)],
    message: 'Sample monitoring event',
    timestamp: new Date().toISOString(),
  }
  
  monitoringEvents.value = [newEvent, ...monitoringEvents.value].slice(0, 50)
}

const refreshData = async () => {
  await Promise.all([loadStats(), loadActivities(), loadRules()])
}

const toggleMonitoring = () => {
  isMonitoring.value = !isMonitoring.value
  
  if (isMonitoring.value) {
    startMonitoring()
  } else {
    stopMonitoring()
  }
}

const startMonitoring = () => {
  if (monitoringInterval) return
  monitoringInterval = window.setInterval(loadMonitoringEvents, 10000) // Poll every 10s
}

const stopMonitoring = () => {
  if (monitoringInterval) {
    clearInterval(monitoringInterval)
    monitoringInterval = null
  }
}

const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

const formatTimestamp = (timestamp: string): string => {
  return dayjs(timestamp).fromNow()
}

const formatTime = (timestamp: string): string => {
  return dayjs(timestamp).format('HH:mm:ss')
}

const getActivityType = (type: string): 'primary' | 'success' | 'warning' | 'danger' | 'info' => {
  const typeMap: Record<string, any> = {
    agent_connected: 'success',
    agent_disconnected: 'danger',
    rule_triggered: 'warning',
    threat_blocked: 'danger',
  }
  return typeMap[type] || 'info'
}

const getEventSeverity = (type: string): 'success' | 'warning' | 'danger' | 'info' => {
  const severityMap: Record<string, any> = {
    success: 'success',
    warning: 'warning',
    error: 'danger',
    info: 'info',
  }
  return severityMap[type] || 'info'
}

onMounted(async () => {
  await refreshData()
  startMonitoring()
})

onUnmounted(() => {
  stopMonitoring()
})
</script>

<style scoped>
.dashboard {
  width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--fc-space-6);
}

.page-header h1 {
  margin-bottom: var(--fc-space-2);
}

.subtitle {
  color: var(--fc-text-secondary);
  margin: 0;
}

.stat-cards {
  margin-bottom: var(--fc-space-6);
}

.stat-card {
  cursor: pointer;
  transition: transform var(--fc-transition-fast);
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: var(--fc-space-4);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: var(--fc-radius-lg);
  background: var(--fc-bg-secondary);
}

.stat-card-primary .stat-icon {
  color: var(--fc-brand-primary);
  background: color-mix(in srgb, var(--fc-brand-primary) 10%, transparent);
}

.stat-card-success .stat-icon {
  color: var(--fc-success);
  background: color-mix(in srgb, var(--fc-success) 10%, transparent);
}

.stat-card-warning .stat-icon {
  color: var(--fc-warning);
  background: color-mix(in srgb, var(--fc-warning) 10%, transparent);
}

.stat-card-info .stat-icon {
  color: var(--fc-info);
  background: color-mix(in srgb, var(--fc-info) 10%, transparent);
}

.stat-details {
  flex: 1;
}

.stat-value {
  font-size: var(--fc-text-3xl);
  font-weight: var(--fc-font-bold);
  color: var(--fc-text-primary);
  line-height: 1;
  margin-bottom: var(--fc-space-1);
}

.stat-label {
  font-size: var(--fc-text-sm);
  color: var(--fc-text-secondary);
}

.main-content-row {
  margin-bottom: var(--fc-space-6);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: var(--fc-text-lg);
  font-weight: var(--fc-font-semibold);
}

.activity-item {
  display: flex;
  flex-direction: column;
  gap: var(--fc-space-2);
}

.activity-message {
  color: var(--fc-text-primary);
  font-size: var(--fc-text-sm);
}

.rules-list {
  display: flex;
  flex-direction: column;
  gap: var(--fc-space-3);
}

.rule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--fc-space-3);
  background: var(--fc-bg-secondary);
  border-radius: var(--fc-radius-md);
  transition: background var(--fc-transition-fast);
}

.rule-item:hover {
  background: var(--fc-bg-tertiary);
}

.rule-name {
  font-weight: var(--fc-font-medium);
  color: var(--fc-text-primary);
  margin-bottom: var(--fc-space-1);
}

.rule-description {
  font-size: var(--fc-text-sm);
  color: var(--fc-text-secondary);
}

.monitoring-feed {
  margin-bottom: var(--fc-space-6);
}

.feed-controls {
  display: flex;
  align-items: center;
  gap: var(--fc-space-3);
}

.monitoring-events {
  display: flex;
  flex-direction: column;
  gap: var(--fc-space-2);
  max-height: 400px;
  overflow-y: auto;
}

.monitoring-event {
  display: flex;
  align-items: center;
  gap: var(--fc-space-3);
  padding: var(--fc-space-2) var(--fc-space-3);
  background: var(--fc-bg-secondary);
  border-radius: var(--fc-radius-sm);
  font-size: var(--fc-text-sm);
}

.event-message {
  flex: 1;
  color: var(--fc-text-primary);
}

.event-time {
  color: var(--fc-text-tertiary);
  font-family: var(--fc-font-mono);
  font-size: var(--fc-text-xs);
}
</style>
