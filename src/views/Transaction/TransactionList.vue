<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import router from '@/router'

interface Transaction {
  hash: string
  block: number
  senderAddress: string
  amount: number
  receiverAddress: string
  timestamp: Date
}

const transactions = ref<Transaction[]>([])
const transactionsPerPage = 10 // determine how many transactions to display per page
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(transactions.value.length / transactionsPerPage))

const displayedTransactions = computed(() => {
  const startIndex = (currentPage.value - 1) * transactionsPerPage
  const endIndex = startIndex + transactionsPerPage
  return transactions.value.slice(startIndex, endIndex)
})

const fetchTransactions = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/transaction/')
    transactions.value = response.data.output
  } catch (error) {
    console.error('Error fetching transactions:', error)
  }
}

const calculateAge = (timestamp: Date) => {
  const currentTime = new Date()
  const ageInSeconds = Math.floor((currentTime.getTime() - new Date(timestamp).getTime()) / 1000)
  return ageInSeconds
}
const goToDetail = (hash: string) => {
  router.push({ name: 'TransactionDetail', params: { id: hash } })
}
onMounted(() => {
  fetchTransactions()
  setInterval(fetchTransactions, 10000) // interval to fetch new data
})

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
const formatTimestamp = (timestamp: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  const formattedDate = new Date(timestamp).toLocaleString('en-GB', options)
  return formattedDate.replace(/[/]/g, '-').replace(',', '') // Replace slashes with dashes
}
</script>

<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <div class="transactions-page">
    <!-- Body Content -->
    <main>
      <div class="logo-section">
        <Icon icon="cib:ethereum" class="logo" />
        <h1>Transactions</h1>
      </div>

      <div class="table-section" style="overflow-x: auto">
        <table>
          <thead>
            <tr class="rounded-header">
              <th>Txn Hash</th>
              <th>Block</th>
              <th>Time</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in displayedTransactions" :key="index">
              <td class="clickable" @click="goToDetail(item.hash)">{{ item.hash }}</td>
              <td>{{ item.block }}</td>
              <td>{{ formatTimestamp(item.timestamp) }}</td>
              <td>{{ item.senderAddress }}</td>
              <td>{{ item.receiverAddress }}</td>
              <td>{{ item.amount }} ETH</td>
              <td>{{ calculateAge(item.timestamp) }} secs ago</td>
            </tr>
            <tr>
              <td colspan="7" class="pagination-buttons">
                <div class="pagination-container">
                  <div class="centered-content">
                    <button class="first-page-button" @click="changePage(1)">First Page</button>
                    <button class="previous-page-button" @click="changePage(currentPage - 1)"
                      >&lt;</button
                    >
                    <span class="page-number">{{ currentPage }}</span>
                    <button class="next-page-button" @click="changePage(currentPage + 1)"
                      >&gt;</button
                    >
                    <button class="last-page-button" @click="changePage(totalPages)"
                      >Last Page</button
                    >
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
  color: white; /* Set the default text color */
  background-color: black; /* Set the background color for the entire page */
}

.transactions-page {
  display: flex;
  width: 90%;
  min-height: 100%;
  margin: auto;

  /* font-family: Arial, sans-serif; */
  flex-direction: column;
}

main {
  flex: 1;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 20px;
}

.logo {
  font-size: 30px;
  color: #fff;
}

h1 {
  margin: 0;
  font-size: 25px;
  font-weight: 500;
}

.table-section table {
  width: 90%;
  max-width: 90%;
  margin: auto;
  overflow-x: auto;
  border-collapse: collapse;
}

th {
  padding: 15px;
  overflow: hidden;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  text-align: left; /* Add top border for header */
  text-overflow: ellipsis;
  white-space: nowrap; /* Allow content to overflow and not wrap */
  background-color: #d9d9d9;
  border-bottom: 1px solid #4a4a4a; /* Only show horizontal lines */
}

th:first-child {
  padding-left: 30px;
  border-top-left-radius: 20px;
}

th:last-child {
  padding-right: 30px;
  border-top-right-radius: 20px;
}

td {
  padding: 20px;
  overflow: hidden;
  font-size: 15px;
  color: white;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap; /* Allow content to overflow and not wrap */
  background-color: #282b2e;
  border-bottom: 1px solid #4a4a4a; /* Only show horizontal lines */
}

td:first-child {
  padding-left: 30px;
}

td:last-child {
  padding-right: 30px;
}

tr:last-child td:first-child {
  border-color: #000;
  border-bottom-left-radius: 10px; /* Adjust the radius as needed */
}

tr:last-child td:last-child {
  border-color: #000;
  border-bottom-right-radius: 10px; /* Adjust the radius as needed */
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  text-decoration: underline;
}

.pagination-buttons {
  padding: 10px;
  text-align: right;
}

.pagination-container {
  display: flex;
  height: 100%;
  margin-right: 5px;
  background-color: #282b2e;
  align-items: center;
  justify-content: flex-end;
}

.centered-content {
  display: flex;
  align-items: center;
}

.first-page-button,
.last-page-button {
  padding: 8px 16px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  background-color: #909182;
  border-radius: 20px;
}

.previous-page-button,
.next-page-button {
  padding: 8px 13px;
  font-size: 25px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #282b2e;
}

.page-number {
  padding: 5px 30px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  background-color: #909182;
  border-radius: 5px;
}

@media (width <= 767px) {
  .logo-section {
    margin-left: 0;
  }

  .logo-section img {
    margin-right: 5px;
  }

  .logo-section h1 {
    margin-left: 10px;
  }
}

td:nth-child(1) {
  max-width: 180px;
  overflow: hidden;
  color: #1688f2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

td:nth-child(2) {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

td:nth-child(3) {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

td:nth-child(4) {
  max-width: 100px;
  overflow: hidden;
  color: #1688f2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

td:nth-child(5) {
  max-width: 100px;
  overflow: hidden;
  color: #1688f2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

td:nth-child(6) {
  max-width: 100px;
  overflow: hidden;
  color: #6afd36;
  text-overflow: ellipsis;
  white-space: nowrap;
}

td:nth-child(7) {
  max-width: 100px;
  overflow: hidden;
  color: #9c9c9c;
  text-overflow: ellipsis;
  white-space: nowrap;
}

th:nth-child(1) {
  width: 180px;
}

th:nth-child(2) {
  width: 100px;
}

th:nth-child(3) {
  width: 170px;
}

th:nth-child(4) {
  width: 140px;
}

th:nth-child(5) {
  width: 140px;
}

th:nth-child(6) {
  width: 100px;
}

th:nth-child(7) {
  width: 80px;
}
</style>
