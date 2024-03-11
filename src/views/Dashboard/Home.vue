<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import router from '@/router'
import LoadingSpinner from '@/components/Loading/Loading.vue'
import Echart from '@/components/Echart/src/Echart.vue'

const blocks = ref([])
const trxs = ref([])
const totalTransactions = ref(0)
const maxTransactionPerDay = ref(0)
const blockTime = ref(0)
const chartInitialized = ref(false)
const chartInstance = ref(null)
const chartOptions = ref(null)
const loadingGraph = ref(true)
const loadingBlockTable = ref(true)
const loadingTransactionTable = ref(true)

const fetchGraphData = () => {
  fetch('http://localhost:8080/api/transaction/latestThirtyDay/transactionNumber')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      loadingGraph.value = false
      const output = data.output
      const dates = output.map((item) => item.date)
      const transactionCounts = output.map((item) => item.transactionCount)
      chartOptions.value = {
        xAxis: {
          type: 'category',
          data: dates,
          axisLabel: {
            formatter: function (value) {
              const date = new Date(value)
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) // Format date labels
            },
            textStyle: {
              color: '#ffffff' // Color of x-axis labels
            }
          }
        },
        yAxis: {
          type: 'value',
          name: 'Number of Transactions',
          nameLocation: 'center',
          nameRotate: 90,
          nameTextStyle: {
            color: '#ffffff', // Color of the Y-axis label
            fontSize: 14,
            padding: [0, 0, 10, 0] // Adjust font size if needed
          },
          splitLine: {
            show: false // Hide horizontal grid lines
          },
          axisLabel: {
            formatter: '{value}', // Format y-axis labels
            textStyle: {
              color: '#ffffff' // Color of y-axis labels
            }
          }
        },
        series: [
          {
            name: 'Number of Transactions',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(0, 123, 255, 0.5)' }, // Start color
                  { offset: 1, color: 'rgba(0, 123, 255, 0)' } // End color
                ]
              }
            },
            data: transactionCounts,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#4287f5', // Change line color here
              width: 3 // Change line width here
            },
            showSymbol: false
          }
        ],
        tooltip: {
          trigger: 'axis', // Show tooltip on hover over points
          axisPointer: {
            type: 'cross' // Show tooltip lines across axes
          },
          formatter: function (params) {
            const date = new Date(params[0].axisValue)
            const formattedDate = date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })
            const value = params[0].value.toFixed(0)
            return `<div style="text-align: left;">
                    <div style="font-weight: 800;">${formattedDate}</div>
                    <div>Number of transactions: <span style="font-weight: 800">${value}</span></div>
                </div>`
          }
        },
        grid: {
          x: 20, // Adjust the left margin if needed
          y: 30, // Adjust the top margin if needed
          x2: 20, // Adjust the right margin if needed
          y2: 30, // Adjust the bottom margin if needed
          containLabel: true, // Ensure that labels are within the grid area
          show: false // Hide grid lines
        },
        textStyle: {
          color: '#ffffff' // Default text color
        },
        backgroundColor: 'transparent', // Set background color to transparent
        animation: false
      }

      // statistic
      totalTransactions.value = data.statistics.totalTransactions
      maxTransactionPerDay.value = data.statistics.maxTransactionPerDay
    })
    .catch((error) => {
      console.error('Error fetching data from API:', error)
    })
}

const fetchBlockData = () => {
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
      blockTime.value = data.blockTime
      loadingBlockTable.value = false
    })
    .catch((error) => {
      console.error('There was a problem fetching the data:', error)
    })
}

const fetchTrxData = () => {
  fetch('http://localhost:8080/api/transaction/fetch/latestTransactionList')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Fetching encountered some error')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      trxs.value = data.output
      loadingTransactionTable.value = false
    })
    .catch((error) => {
      console.error('There was a problem fetching the data:', error)
    })
}

const fetchData = () => {
  fetchBlockData()
  fetchGraphData()
  fetchTrxData()
}

onMounted(fetchData)
setInterval(fetchData, 10000)

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

const chartHeight = ref(400) // Initial chart height
const resizeChartHeight = () => {
  if (window.innerWidth <= 800) {
    chartHeight.value = 200
  } else {
    chartHeight.value = 400
  }
}

onMounted(() => {
  resizeChartHeight() // Call resizeChartHeight on component mount
  window.addEventListener('resize', resizeChartHeight) // Listen for window resize events
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChartHeight)
})
</script>

<template>
  <main>
    <div class="transactionHistory">
      <div class="header">
        <div class="headerTitle">TRANSACTION HISTORY</div>
        <sub style="font-size: 10px; color: black">(in 30 days)</sub>
      </div>
      <div class="graphDetailContainer">
        <LoadingSpinner v-if="loadingGraph" :loading="loadingGraph" class="loading-spinner" />
        <Echart
          :options="chartOptions"
          width="100%"
          :height="`${chartHeight}px`"
          v-else
          id="chart"
        />
        <!-- <div class="transactionHistoryGraph" id="chart"></div> -->
        <div class="separator"></div>
        <div class="details">
          <div class="detailBlock">
            <Icon icon="ion:speedometer-outline" class="detailIcon" />
            <div>
              <p class="detailTitle">BLOCK SPEED</p>
              <p class="detailVal">{{ blockTime }} secs</p>
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
              <p class="detailVal">{{ totalTransactions }}</p>
            </div>
          </div>
          <div class="detailBlock">
            <Icon icon="cib:ethereum" class="detailIcon" />
            <div>
              <p class="detailTitle">MAX TRANSACTION/DAY</p>
              <p class="detailVal">{{ maxTransactionPerDay }}</p>
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
        <LoadingSpinner
          v-if="loadingBlockTable"
          :loading="loadingBlockTable"
          class="loading-spinner h-100%"
        />
        <div v-else class="list">
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
        <LoadingSpinner
          v-if="loadingTransactionTable"
          :loading="loadingTransactionTable"
          class="loading-spinner h-100%"
        />
        <div v-else class="list">
          <div class="item" v-for="trx in trxs" :key="trx.id">
            <div style="display: flex; align-items: center">
              <Icon icon="cib:ethereum" />
              Hash:
              <span class="clickable" @click="goToTransaction(trx.hash)">
                {{ formatHexString(trx.hash) }}
              </span>
            </div>
            <div>
              <div
                >From:
                <span class="clickable" @click="goToAccount(trx.senderAddress)">{{
                  formatHexString(trx.senderAddress)
                }}</span></div
              >
              <div
                >To:
                <span class="clickable" @click="goToAccount(trx.receiverAddress)">{{
                  formatHexString(trx.receiverAddress)
                }}</span></div
              >
            </div>
            <div>
              <div>
                Amount:
                <span style="color: #6afd36">{{ trx.amount }} ETH</span>
              </div>
              <div class="time"> {{ calcTimeDiff(trx.timestamp) }}secs ago </div>
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
  min-height: 300px;
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
  gap: 10px;
}

.item:last-child {
  border: none;
}

.latestTransactionContainer .item > div {
  flex: 1;
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

    /* width: 100%; */
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
