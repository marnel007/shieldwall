import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export interface Organization {
  id: string
  name: string
  slug: string
  created_at: string
  role?: string
}

export const useOrganizationStore = defineStore('organization', () => {
  const organizations = ref<Organization[]>([])
  const currentOrgId = ref<string | null>(localStorage.getItem('currentOrgId'))
  const loading = ref(false)

  const currentOrganization = computed(() => {
    if (!currentOrgId.value) return null
    return organizations.value.find((org) => org.id === currentOrgId.value) || null
  })

  const setCurrentOrg = (orgId: string | null) => {
    currentOrgId.value = orgId
    if (orgId) {
      localStorage.setItem('currentOrgId', orgId)
    } else {
      localStorage.removeItem('currentOrgId')
    }
  }

  const fetchOrganizations = async () => {
    loading.value = true
    try {
      const response = await api.get('/organizations')
      organizations.value = response.data.organizations || []
      
      // Set first org as current if none selected
      if (!currentOrgId.value && organizations.value.length > 0) {
        setCurrentOrg(organizations.value[0]?.id || null)
      }
    } catch (error) {
      console.error('Failed to fetch organizations:', error)
    } finally {
      loading.value = false
    }
  }

  const createOrganization = async (name: string, slug: string) => {
    const response = await api.post('/organizations', { name, slug })
    await fetchOrganizations()
    return response.data
  }

  return {
    organizations,
    currentOrgId,
    currentOrganization,
    loading,
    setCurrentOrg,
    fetchOrganizations,
    createOrganization,
  }
})
