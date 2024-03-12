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
    <h1>Oops! We couldn't find what you are looking for.</h1>
    <p>Please enter an address, transaction hash, block number or hash</p>
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
  font-size: 25px;
}

.searchErrorContainer button {
  padding: 5px 15px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
