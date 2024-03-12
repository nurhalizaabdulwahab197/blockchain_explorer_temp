<!-- LoadingSpinner.vue -->
<template>
  <div v-if="loading" class="loading-spinner">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Add loading state
const loading = ref(true)
</script>

<style scoped>
.loading-spinner {
  /* height: 100%;
  background-color: rgba(255, 255, 255, 0.5); */
  z-index: 2;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
