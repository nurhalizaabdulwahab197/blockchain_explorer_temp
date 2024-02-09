<template>
  <ContentWrap title="TransactionList">
    <div class="transactions-page">
      <!-- Body Content -->
      <main>
        <div class="logo-section">
          <span class="dashicons--money-alt"></span>
          <h1>TRANSACTIONS</h1>
        </div>

        <div class="table-section">
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
              <!-- Display a fixed number of data rows (e.g., 10 rows) -->
              <tr v-for="(item, index) in slicedDummyData" :key="index">
                <td
                  style="
                    max-width: 180px;
                    overflow: hidden;
                    color: #1688f2;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                  >{{ item.TxnHash }}</td
                >
                <td
                  style="
                    max-width: 100px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                  >{{ item.block }}</td
                >
                <td
                  style="
                    max-width: 170px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                  >{{ item.time }}
                </td>
                <td
                  style="
                    max-width: 140px;
                    overflow: hidden;
                    color: #1688f2;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                  >{{ item.from }}</td
                >
                <td
                  style="
                    max-width: 140px;
                    overflow: hidden;
                    color: #1688f2;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                  >{{ item.to }}</td
                >
                <td
                  style="
                    max-width: 100px;
                    overflow: hidden;
                    color: #6afd36;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                  >{{ item.amount }} ETH</td
                >
                <td
                  style="
                    max-width: 80px;
                    overflow: hidden;
                    color: #9c9c9c;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  "
                  >{{ item.age }} secs ago</td
                >
              </tr>

              <tr>
                <td colspan="7" class="pagination-buttons">
                  <div class="pagination-container">
                    <div class="centered-content">
                      <button class="first-page-button" @click="goToFirstPage">First Page</button>
                      <button class="previous-page-button" @click="goToPreviousPage">&lt;</button>
                      <span class="page-number"> {{ currentPage }}</span>
                      <button class="next-page-button" @click="goToNextPage">&gt;</button>
                      <button class="last-page-button" @click="goToLastPage">Last Page</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </ContentWrap>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'

interface Transaction {
  TxnHash: string
  block: number
  time: string
  from: string
  to: string
  amount: number
  age: number
}

const dummyData = ref<Transaction[]>([
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  },
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  },
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  },
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  },
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  },
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  },
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  },
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  },
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  },
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  },
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  },
  {
    TxnHash: '0x981629818926489127649812709',
    block: 12345678,
    time: '2023-10-18 21:52:59',
    from: '8JKDBSV8712349aefdfqv235bw4t',
    to: '0x77IUAHSFU32682Bsdvscv234',
    amount: 0.034,
    age: 6
  }
])

const currentPage = ref(1)

const slicedDummyData = ref<Transaction[]>([])

const goToFirstPage = () => {
  currentPage.value = 1
  updateSlicedDummyData()
}

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    updateSlicedDummyData()
  }
}

const goToNextPage = () => {
  // Replace 10 with the total number of pages in your data
  if (currentPage.value < 10) {
    currentPage.value++
    updateSlicedDummyData()
  }
}

const goToLastPage = () => {
  // Replace 10 with the total number of pages in your data
  currentPage.value = Math.ceil(dummyData.value.length / 10)
  updateSlicedDummyData()
}

const updateSlicedDummyData = () => {
  const startIndex = (currentPage.value - 1) * 10
  const endIndex = startIndex + 10
  slicedDummyData.value = dummyData.value.slice(startIndex, endIndex)
}

updateSlicedDummyData()
</script>
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
  min-height: 100%;
  font-family: Arial, sans-serif;
  flex-direction: column;
}

main {
  flex: 1;
  padding: 20px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 20px;
  margin-left: 70px;
}

.logo {
  margin-right: 10px;
  color: #ffc107; /* FontAwesome's default "gold" color */
}

h1 {
  margin: 0;
  font-size: 24px;
}

.table-section table {
  width: 80%;
  margin: auto;
  border-collapse: collapse;
}

th {
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-align: left; /* Add top border for header */
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
  color: white;
  text-align: left;
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

.dashicons--money-alt {
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23000' d='M10.6 9c-.4-.1-.8-.3-1.1-.6c-.3-.1-.4-.4-.4-.6c0-.2.1-.5.3-.6c.3-.2.6-.4.9-.3c.6 0 1.1.3 1.4.7l.9-1.2c-.3-.3-.6-.5-.9-.7c-.3-.2-.7-.3-1.1-.3V4H9.4v1.4c-.5.1-1 .4-1.4.8c-.4.5-.7 1.1-.6 1.7c0 .6.2 1.2.6 1.6c.5.5 1.2.8 1.8 1.1c.3.1.7.3 1 .5c.2.2.3.5.3.8c0 .3-.1.6-.3.9c-.3.3-.7.4-1 .4c-.4 0-.9-.1-1.2-.4c-.3-.2-.6-.5-.8-.8l-1 1.1c.3.4.6.7 1 1c.5.3 1.1.6 1.7.6V16h1.1v-1.5c.6-.1 1.1-.4 1.5-.8c.5-.5.8-1.3.8-2c0-.6-.2-1.3-.7-1.7c-.5-.5-1-.8-1.6-1M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8m0 14.9c-3.8 0-6.9-3.1-6.9-6.9S6.2 3.1 10 3.1s6.9 3.1 6.9 6.9s-3.1 6.9-6.9 6.9'/%3E%3C/svg%3E");

  display: inline-block;
  width: 3rem;
  height: 3rem;
  background-color: currentcolor;
  mask-image: var(--svg);
  mask-image: var(--svg);
  mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
  mask-size: 100% 100%;
}
</style>
