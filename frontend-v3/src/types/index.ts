// Common type definitions for Front Cloud

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface Agent {
  id: string
  name: string
  hostname: string
  ip_address: string
  status: 'online' | 'offline' | 'error'
  last_seen: string
  version: string
  organization_id: string
  created_at: string
  updated_at: string
}

export interface Rule {
  id: string
  name: string
  description: string
  type: 'firewall' | 'rate_limit' | 'geo_block' | 'custom'
  enabled: boolean
  priority: number
  conditions: RuleCondition[]
  actions: RuleAction[]
  organization_id: string
  created_at: string
  updated_at: string
}

export interface RuleCondition {
  field: string
  operator: 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'regex'
  value: string
}

export interface RuleAction {
  type: 'allow' | 'deny' | 'rate_limit' | 'log'
  params?: Record<string, any>
}

export interface Activity {
  id: string
  type: 'agent_connected' | 'agent_disconnected' | 'rule_triggered' | 'threat_blocked'
  message: string
  metadata?: Record<string, any>
  timestamp: string
  agent_id?: string
  rule_id?: string
}

export interface Statistics {
  protected_agents: number
  active_rules: number
  threats_blocked: number
  uptime_percentage: number
}

export interface Member {
  id: string
  email: string
  username: string
  role: 'owner' | 'admin' | 'analyst' | 'viewer'
  status: 'active' | 'invited' | 'suspended'
  organization_id: string
  joined_at: string
}

export interface Invite {
  id: string
  email: string
  role: 'admin' | 'analyst' | 'viewer'
  status: 'pending' | 'accepted' | 'expired'
  expires_at: string
  sent_at: string
}

export interface BillingPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  limits: {
    agents: number
    rules: number
    members: number
  }
}

export interface Subscription {
  id: string
  plan_id: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'bank_account'
  last4: string
  brand?: string
  exp_month?: number
  exp_year?: number
  is_default: boolean
}

// Form types
export type FormMode = 'create' | 'edit' | 'view'

// Table types
export interface TableColumn<T = any> {
  key: keyof T
  label: string
  width?: string | number
  sortable?: boolean
  filterable?: boolean
  formatter?: (value: any, row: T) => string | number
}

export interface TableFilter {
  field: string
  operator: string
  value: any
}

export interface TableSort {
  field: string
  order: 'asc' | 'desc'
}

// Navigation types
export interface NavItem {
  path: string
  name: string
  icon?: any
  children?: NavItem[]
  meta?: {
    requiresAuth?: boolean
    roles?: string[]
  }
}
