<script setup>
import { ref, onMounted, watch } from 'vue'
import ApexCharts from 'apexcharts'
import { options } from './apexChartOpt'
import { Icon } from '@iconify/vue'
import router from '@/router'

const temp = ref([
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 }
])
const chart = ref(null)
const chartHeight = ref(350)
const blocks = ref([])

onMounted(() => {
  const chartOptions = { ...options, chart: { ...options.chart, id: 'chart' } }
  // chartOptions.chart.width = 400
  //chartOptions.chart.height = chartHeight.value
  chart.value = new ApexCharts(document.querySelector('#chart'), chartOptions)
  chart.value.render()
})

const fetchData = () => {
  fetch('http://localhost:8080/api/block/latestBlockList')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Fetching encountered some error')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      blocks.value = data.output
    })
    .catch((error) => {
      console.error('There was a problem fetching the data:', error)
    })
}
onMounted(fetchData)
setInterval(fetchData, 5000) //fetch block every 10 seconds

const formatHexString = (hexString) => {
  const prefixLength = 5 // Length of the "0x" prefix
  const suffixLength = 5 // Number of characters to display at the end

  // Extract the first and last few characters
  const prefix = hexString.slice(0, prefixLength)
  const suffix = hexString.slice(-suffixLength)

  // Create the formatted string with 'X' placeholders in the middle
  const formattedString = prefix + '...' + suffix

  return formattedString
}

const calcTimeDiff = (timestamp) => {
  const blockTimestamp = new Date(timestamp)
  const currentDate = new Date()
  const timeDifferenceInMilliseconds = currentDate - blockTimestamp
  const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000)
  return timeDifferenceInSeconds
}

const goToAccount = (account) => {
  router.push(`/account/accountOverview/${account}`)
}

const goToBlock = (block) => {
  router.push(`/blockchain/blockList/blockdetail/${block}`)
}
const goToTransaction = (TxnHash) => {
  router.push(`/blockchain/transactionList/transactionDetail/${TxnHash}`)
}
</script>

<template>
  <main>
    <div class="transactionHistory">
      <div class="header">
        <div class="headerTitle">TRANSACTION HISTORY</div>
        <sub style="font-size: 10px; color: black">(in 30 days)</sub>
      </div>
      <div class="graphDetailContainer">
        <div class="transactionHistoryGraph" id="chart"> </div>
        <div class="separator"></div>
        <div class="details">
          <div class="detailBlock">
            <Icon icon="ion:speedometer-outline" class="detailIcon" />
            <div>
              <p class="detailTitle">BLOCK SPEED</p>
              <p class="detailVal">3.4secs</p>
            </div>
          </div>
          <div class="detailBlock">
            <Icon icon="clarity:blocks-group-line" class="detailIcon" />
            <div>
              <p class="detailTitle">BLOCKS</p>
              <p class="detailVal">{{ blocks && blocks.length > 0 ? blocks[0].number : 'N/A' }}</p>
            </div>
          </div>
          <div class="detailBlock">
            <Icon icon="fluent:arrow-swap-16-regular" class="detailIcon" />
            <div>
              <p class="detailTitle">TRANSACTIONS</p>
              <p class="detailVal">2,127,675,815</p>
            </div>
          </div>
          <div class="detailBlock">
            <Icon icon="cib:ethereum" class="detailIcon" />
            <div>
              <p class="detailTitle">MAX TRANSACTION/DAY</p>
              <p class="detailVal"> 188,694,310,338,933</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="listContainer">
      <div class="latestBlockContainer">
        <div class="header withBtn">
          <div class="headerTitle">Latest Blocks</div>
          <a class="viewAllBtn" href="#/blockchain/blockList"
            >VIEW ALL BLOCKS <Icon icon="majesticons:arrow-right-line" />
          </a>
        </div>
        <div class="list">
          <div class="item" v-for="block in blocks" :key="block.id">
            <div style="display: flex; align-items: center">
              <Icon icon="clarity:block-line" />
              <span class="clickable" @click="goToBlock(block.number)">{{ block.number }}</span>
            </div>
            <div>
              Hash:
              <span class="clickable" @click="goToBlock(block.hash)">
                {{ formatHexString(block.hash) }}
              </span>
            </div>
            <div> Txs: {{ block.transactions.length }}</div>
            <div class="time"> {{ calcTimeDiff(block.timestamp) }} secs ago </div>
          </div>
        </div>
      </div>
      <div class="latestTransactionContainer">
        <div class="header withBtn">
          <div class="headerTitle">Latest Transactions</div>
          <a class="viewAllBtn" href="#/blockchain/transactionList"
            >VIEW ALL TRANSACTIONS <Icon icon="majesticons:arrow-right-line" />
          </a>
        </div>
        <div class="list">
          <div class="item" v-for="v in temp" :key="v.id">
            <div style="display: flex; align-items: center">
              <Icon icon="cib:ethereum" />
              Hash: <span class="clickable" @click="goToTransaction(v.id)"> 0xb2....4dea</span>
            </div>
            <div>
              <div
                >Form: <span class="clickable" @click="goToAccount(v.id)">08f3....y5bf</span></div
              >
              <div>To: <span class="clickable" @click="goToAccount(v.id)">07r3....7uFe</span></div>
            </div>
            <div>
              <div>
                Amount:
                <span style="color: #6afd36">0.0034 ETH</span>
              </div>
              <div class="time"> 11 secs ago </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 80%;
  min-height: 100vh;
  margin: auto;
}

.header {
  display: flex;
  padding: 10px 15px;
  background-color: #d9d9d9;
  border-radius: 20px 20px 0 0;
  align-items: flex-end;
}

.headerTitle {
  font-weight: 600;
  color: black;
}

.transactionHistory {
  margin: 0 0 20px;
  background-color: #282b2e;
  border-radius: 20px;
}

.graphDetailContainer {
  display: flex;
  padding: 20px;
}

.transactionHistoryGraph {
  min-width: 70%;
  padding: 0 10px;
  color: black;
}

.details {
  padding: 0 10px;
  margin: auto 0;
}

.separator {
  margin: 0 auto;
  border-left: 2px solid #4a4a4a;
}

.detailBlock {
  display: flex;
  padding: 10px;
  align-items: center;
  font-size: 14px;
}

.detailBlock .detailIcon {
  margin: 0 20px 0 0;
  font-size: 35px;
  color: white;
}

.detailTitle {
  font-weight: 600px;
  color: #158fff;
}

.detailBlock p.detailVal {
  color: white;
}

.listContainer {
  display: flex;
  gap: 20px;
}

.latestBlockContainer,
.latestTransactionContainer {
  min-width: 300px;
  background-color: #282b2e;
  border-radius: 10px;
  flex: 1;
}

.header.withBtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px 10px 0 0;
}

.viewAllBtn {
  font-size: 10px;
  color: black;
  text-decoration: none;
}

.viewAllBtn:hover {
  text-decoration: underline;
}

.list {
  overflow-x: auto;
}

.item {
  display: flex;
  height: 40px;
  min-width: 380px;
  padding: 5px 20px;
  font-size: 14px;
  color: white;
  border-bottom: 2px solid #4a4a4a;
  justify-content: space-between;
  align-items: center;
}

.item:last-child {
  border: none;
}

.time {
  font-size: 13px;
  color: #9c9c9c;
}

.clickable {
  margin-left: 3px;
  color: #1688f2;
  cursor: pointer;
}

.clickable:hover {
  text-decoration: underline;
}

@media screen and (width <= 880px) {
  .graphDetailContainer {
    display: flex;
    width: 100%;
    padding: 20px;
    flex-direction: column;
  }

  .transactionHistory {
    min-width: 300px;
    margin: 0 0 20px;
    background-color: #282b2e;
    border-radius: 20px;
  }

  .transactionHistoryGraph {
    padding: 0 10px;
    color: black;
  }

  .separator {
    display: none;
  }

  .details {
    display: flex;
    flex-wrap: wrap;
  }

  .listContainer {
    display: flex;
    flex-direction: column;
  }
}
</style>
