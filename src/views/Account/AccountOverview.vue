<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import Web3 from 'web3'
const route = useRoute()

var dataset = ref([
  {
    TxnHash: '0x3916d1d5a3e98e5ae9....',
    Block: '18374438',
    Time: '2023-10-18 21:52:59',
    From: '0x77a879bc1868c....',
    To: '08se67182189024....',
    Amount: '0.034 ETH',
    Age: '6 secs ago'
  },
  {
    TxnHash: '0x3916d1d5a3e98e5ae9....',
    Block: '18374438',
    Time: '2023-10-18 21:52:59',
    From: '0x77a879bc1868c....',
    To: '08se67182189024....',
    Amount: '0.034 ETH',
    Age: '6 secs ago'
  },
  {
    TxnHash: '0x3916d1d5a3e98e5ae9....',
    Block: '18374438',
    Time: '2023-10-18 21:52:59',
    From: '0x77a879bc1868c....',
    To: '08se67182189024....',
    Amount: '0.034 ETH',
    Age: '6 secs ago'
  },
  {
    TxnHash: '0x3916d1d5a3e98e5ae9....',
    Block: '18374438',
    Time: '2023-10-18 21:52:59',
    From: '0x77a879bc1868c....',
    To: '08se67182189024....',
    Amount: '0.034 ETH',
    Age: '6 secs ago'
  },
  {
    TxnHash: '0x3916d1d5a3e98e5ae9....',
    Block: '18374438',
    Time: '2023-10-18 21:52:59',
    From: '0x77a879bc1868c....',
    To: '08se67182189024....',
    Amount: '0.034 ETH',
    Age: '6 secs ago'
  },
  {
    TxnHash: '0x3916d1d5a3e98e5ae9....',
    Block: '18374438',
    Time: '2023-10-18 21:52:59',
    From: '0x77a879bc1868c....',
    To: '08se67182189024....',
    Amount: '0.034 ETH',
    Age: '6 secs ago'
  },
  {
    TxnHash: '0x3916d1d5a3e98e5ae9....',
    Block: '18374438',
    Time: '2023-10-18 21:52:59',
    From: '0x77a879bc1868c....',
    To: '08se67182189024....',
    Amount: '0.034 ETH',
    Age: '6 secs ago'
  },
  {
    TxnHash: '0x3916d1d5a3e98e5ae9....',
    Block: '18374438',
    Time: '2023-10-18 21:52:59',
    From: '0x77a879bc1868c....',
    To: '08se67182189024....',
    Amount: '0.034 ETH',
    Age: '6 secs ago'
  },
  {
    TxnHash: '0x3916d1d5a3e98e5ae9....',
    Block: '18374438',
    Time: '2023-10-18 21:52:59',
    From: '0x77a879bc1868c....',
    To: '08se67182189024....',
    Amount: '0.034 ETH',
    Age: '6 secs ago'
  },
  {
    TxnHash: '0x3916d1d5a3e98e5ae9....',
    Block: '18374438',
    Time: '2023-10-18 21:52:59',
    From: '0x77a879bc1868c....',
    To: '08se67182189024....',
    Amount: '0.034 ETH',
    Age: '6 secs ago'
  },
  {
    TxnHash: '0x3916d1d5a3e98e5ae9....',
    Block: '18374438',
    Time: '2023-10-18 21:52:59',
    From: '0x77a879bc1868c....',
    To: '08se67182189024....',
    Amount: '0.034 ETH',
    Age: '6 secs ago'
  }
])

const itemsPerPage = 10
const currentPage = ref(1)
const paginatedData = ref([])

const totalPages = computed(() => Math.ceil(dataset.value.length / itemsPerPage))

function toNextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    updatePaginateData()
  }
}

function toPrevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    updatePaginateData()
  }
}

function jumpToFirst() {
  currentPage.value = 1
  updatePaginateData()
}

function jumpToLast() {
  currentPage.value = totalPages.value
  updatePaginateData()
}

function updatePaginateData() {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  console.log(startIndex)
  console.log(endIndex)
  paginatedData.value = dataset.value.slice(startIndex, endIndex)
}

updatePaginateData()

const goToDetail = (TxnHash) => {
  router.push(`/blockchain/transactionList/transactionDetail/${TxnHash}`)
}

const goToAccount = (account) => {
  router.push(`/Account/accountOverview/${account}`)
}

const accountAddress = ref('')
const accountBalance = ref(null) // Initialize balance as null or any appropriate initial value

onMounted(() => {
  // Execute this code when the component is mounted
  accountAddress.value = route.params.id // Set the initial value of accountAddress
  fetchBalance() // Fetch the balance
})

// Connect to an Ethereum node
const web3 = new Web3('http://172.188.99.169:8545', { mode: 'no-cors' })

async function fetchBalance() {
  try {
    if (!accountAddress.value) return // Skip if address is empty
    // Get the balance of the address
    const balance = await web3.eth.getBalance(accountAddress.value)
    // Convert the balance from wei to ether
    accountBalance.value = web3.utils.fromWei(balance, 'ether')
    console.log(accountBalance)
  } catch (error) {
    console.error('Error fetching balance:', error)
    // Handle error gracefully, e.g., set accountBalance to a default value or show an error message
    accountBalance.value = 0
  }
}
</script>

<template>
  <div class="body">
    <div class="main">
      <div class="header">
        <Icon icon="codicon:account" class="accountIcon" /><h1>Account Overview</h1>
      </div>
      <div class="info-cont">
        <div class="address">
          <div class="add-sub-cont">
            <h3>ADDRESS</h3>
            <button class="btn"
              ><Icon icon="icon-park-twotone:copy" class="copyIcon" /><span
                >CLICK TO COPY</span
              ></button
            >
          </div>
          <div class="add-sub-cont-2">
            <p>{{ accountAddress }}</p>
          </div>
        </div>
        <div class="balance">
          <div class="bal-sub-cont">
            <h3>ETH BALANCE</h3>
          </div>
          <div class="bal-sub-cont">
            <Icon icon="ri:eth-line" class="eth" /><h2>{{ accountBalance }}</h2>
          </div>
        </div>
      </div>
      <div class="transaction-cont">
        <div class="trans-title"><h2>TRANSACTIONS</h2></div>
        <div class="trans-table">
          <table>
            <thead>
              <tr class="theader">
                <th class="th1">Txn Hash</th>
                <th class="th2">Block</th>
                <th class="th3">Time</th>
                <th class="th4">From</th>
                <th class="th5">To</th>
                <th class="th6">Amount</th>
                <th class="th7">Age</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in paginatedData" :key="index" class="row">
                <td class="td1 clickable" @click="goToDetail(item.TxnHash)">{{ item.TxnHash }}</td>
                <td class="td2">{{ item.Block }}</td>
                <td class="td3">{{ item.Time }}</td>
                <td class="td4 clickable" @click="goToAccount(item.From)">{{ item.From }}</td>
                <td class="td5 clickable" @click="goToAccount(item.To)">{{ item.To }}</td>
                <td class="td6">{{ item.Amount }}</td>
                <td class="td7">{{ item.Age }}</td>
              </tr>
              <tr class="paginatecont">
                <td colspan="7" class="paginatesubcont">
                  <div class="paginate">
                    <div class="fpage" @click="jumpToFirst()">First Page</div>
                    <div class="prev" @click="toPrevPage()">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path fill="white" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z" />
                      </svg>
                    </div>
                    <div class="page">
                      {{ currentPage }}
                    </div>
                    <div class="next" @click="toNextPage()">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path fill="white" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z" />
                      </svg>
                    </div>
                    <div class="lpage" @click="jumpToLast()">Last Page</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  width: 100%;
  height: auto;
  justify-content: flex;
  align-items: flex;
}

.main {
  width: 90%;
  height: auto;
  margin: auto;
}

.header {
  display: flex;
  margin: 8px 0;
}

.accountIcon {
  font-size: 32px;
}

h1 {
  margin: auto 12px;
  font-size: 25px;
  font-weight: 500;
}

.info-cont {
  display: flex;
  width: 90%;
  height: auto;
  margin: 35px auto 25px;
  flex: 1;
  justify-content: space-between;
}

.address,
.balance {
  display: flex;
  height: auto;
  margin-bottom: 15px;
  background-color: #d9d9d9;
  flex-direction: column;
}

.address {
  width: 58%;
  border-radius: 8px;
}

.add-sub-cont {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  flex-wrap: wrap;
}

.add-sub-cont-2 {
  display: flex;
  justify-content: center;
  margin: 5px 15px 15px;
  flex-wrap: wrap;
}

.add-sub-cont h3,
.add-sub-cont button {
  padding: 5px 15px;
}

.btn {
  width: 150px;
  height: auto;
  padding: 5px 15px;
  margin: 0 15px 0 0;
  color: #9c9c9c;
  background-color: #d9d9d9;
  border: 1px solid #7f7f7f;
  border-radius: 20px;
}

.copyIcon {
  padding: 0;
  margin: 0;
}

.address p {
  width: 100%;
  margin: 0;
  font-size: 18px;
  color: #158fff;
  word-wrap: break-word;
}

.balance {
  width: 40%;
  border-radius: 8px;
}

.balance h3 {
  padding: 5px 15px;
}

.balance h2 {
  width: 100%;
  padding: 5px 8px;
}

h3 {
  padding: 0;
  font-size: 20px;
  color: black;
}

.bal-sub-cont {
  display: flex;
  align-items: center;
  width: 100%;
  flex: 1;
}

.bal-sub-cont h3 {
  width: 100%;
  word-wrap: normal;
}

.eth {
  padding: 0 0 0 15px;
  font-size: 30px;
  color: #676767;
}

.balance h2 {
  width: 70%;
  color: #676767;
  word-wrap: break-word;
  flex-wrap: wrap;
}

.transaction-cont {
  width: 90%;
  height: auto;
  margin: 5px auto 20px;
}

.trans-title h2 {
  margin: 5px 0;
  font-size: 22px;
  font-weight: 400;
}

.trans-table {
  height: auto;
  overflow-x: auto;
}

table {
  width: 100%;
  margin: 25px auto 0;
  border-collapse: collapse;
}

th {
  padding: 10px 15px;
  color: black;
  text-align: left;
  background-color: #d9d9d9;
}

th:first-child {
  border-top-left-radius: 10px;
}

th:last-child {
  border-top-right-radius: 10px;
}

td {
  padding: 12px 15px;
  white-space: nowrap;

  /* border-bottom: 2px solid #4a4a4a; */
  background-color: #282b2e;
}

tr {
  border-bottom: 2px solid #4a4a4a;
}

tr:last-child {
  border-bottom: 0;
}

tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}

tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}

.td1,
.td4,
.td5 {
  color: #1688f2;
  cursor: pointer;
}

.clickable:hover {
  text-decoration: underline;
}

.td6 {
  color: #6afd36;
}

.td7 {
  color: #9c9c9c;
}

.paginatecont {
  width: 100%;
}

.paginatesubcont {
  width: 100%;
  padding-right: 25px;
}

.paginate {
  display: flex;
  width: 100%;
  background-color: #282b2e;
  border-radius: 0 0 10px 10px;
  justify-content: flex-end;
  align-items: center;
}

.prev,
.next {
  padding-top: 6px;
  font-size: 25px;
}

.fpage,
.page,
.lpage {
  display: flex;
  height: 20px;
  padding: 2px 5px;
  margin: 5px;
  color: #000;
  background-color: #fff;
  border-radius: 5px;
  opacity: 0.6;
}

@media screen and (width <= 600px) {
  .info-cont {
    flex-direction: column;
  }

  .address,
  .balance {
    width: 100%;
  }

  .add-sub-cont,
  .add-sub-cont-2 {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn {
    margin: 10px 0;
  }

  .balance h2 {
    width: 100%;
  }

  .transaction-cont {
    width: 90%;
    height: auto;
    overflow-x: auto;
  }

  .paginate {
    justify-content: center;
  }
}

@media screen and (height <= 717px) {
  .body {
    flex-direction: column;
  }

  .main {
    height: auto;
  }

  .footer {
    margin-top: auto;
  }
}
</style>
