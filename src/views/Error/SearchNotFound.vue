<script setup lang="ts">
import { usePermissionStore } from '@/store/modules/permission'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const permissionStore = usePermissionStore()

const errorClick = () => {
  push(permissionStore.addRouters[0]?.path as string)
}
</script>

<template>
  <div class="searchErrorContainer">
    <h1>No Result Found</h1>
    <button @click="errorClick">Back</button>
  </div>
</template>

<style scoped>
.searchErrorContainer {
  display: flex;
  width: fit-content;
  width: 100%;
  height: 50%;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.searchErrorContainer h1 {
  font-size: 20px;
}

.searchErrorContainer button {
  padding: 5px 15px;
  cursor: pointer;
}
</style>
