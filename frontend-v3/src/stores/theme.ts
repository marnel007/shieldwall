import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'

export const useThemeStore = defineStore('theme', () => {
  // Get saved theme or default to 'auto'
  const savedTheme = localStorage.getItem('theme') as ThemeMode | null
  const mode = ref<ThemeMode>(savedTheme || 'auto')
  const isDark = ref(false)

  // Function to check system preference
  const getSystemPreference = (): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // Function to apply theme
  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    isDark.value = dark
  }

  // Function to update theme based on mode
  const updateTheme = () => {
    if (mode.value === 'auto') {
      applyTheme(getSystemPreference())
    } else {
      applyTheme(mode.value === 'dark')
    }
  }

  // Set theme mode
  const setMode = (newMode: ThemeMode) => {
    mode.value = newMode
    localStorage.setItem('theme', newMode)
    updateTheme()
  }

  // Toggle between light and dark (skip auto)
  const toggle = () => {
    if (mode.value === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  // Watch for system preference changes when in auto mode
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    if (mode.value === 'auto') {
      updateTheme()
    }
  })

  // Watch mode changes
  watch(mode, updateTheme, { immediate: true })

  return {
    mode,
    isDark,
    setMode,
    toggle,
  }
})
