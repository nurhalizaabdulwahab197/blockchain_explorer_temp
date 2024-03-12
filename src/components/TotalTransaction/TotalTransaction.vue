<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getTransactionList } from '@/api/transaction'

const totalTransactionNum = ref(0)
let intervalId
const fetchData = async () => {
  try {
    const data = await getTransactionList()
    totalTransactionNum.value = data.output.length
    console.log(totalTransactionNum.value)
  } catch (error) {
    console.error('There was a problem fetching the data:', error)
  }
}

onMounted(() => {
  fetchData()
  intervalId = setInterval(fetchData, 10000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="transacDetail">
    <div style="display: flex; align-items: center">
      <span
        >Total Transactions:
        <span>{{ totalTransactionNum > 0 ? totalTransactionNum : 'N/A' }}</span></span
      >
      <!-- <span style="display: flex; color: red; align-items: center; margin-left: 10px">
        <Icon icon="akar-icons:triangle-down-fill" style="margin-right: 5px; font-size: 13px" />
        -1.34%
      </span> -->
    </div>
    <div> Gas: <span style="color: #158fff">1 Gwei</span> </div>
    <div></div>
  </div>
</template>

<style scoped>
.transacDetail {
  display: flex;
  align-items: center;
  font-size: 13px;
  justify-content: center;
  gap: 10px;
  flex: 1;
}
</style>
