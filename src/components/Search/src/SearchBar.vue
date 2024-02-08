<script setup lang="tsx">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const searchVal = ref('')
</script>

<template>
  <div class="searchBar">
    <Icon icon="ion:search-outline" />
    <input
      type="text"
      v-model="searchVal"
      placeholder="Search for transaction/Block/Txn Hash/Domain Name"
    />
  </div>
</template>

<style scoped>
.searchBar {
  display: flex;
  width: 90%;
  padding: 0 20px 0 15px;
  color: black;
  background-color: #d9d9d9;
  border-radius: 20px;
  align-items: center;
}

.searchBar input {
  width: 100%;
  padding: 8px 10px;
  color: black;
  background-color: #d9d9d9;
  border: none;
}

input:focus {
  outline: none;
}
</style>
