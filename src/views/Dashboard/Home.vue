<script setup>
import { ref, onMounted, watch } from 'vue'
import ApexCharts from 'apexcharts'
import { options } from './apexChartOpt'
import { Icon } from '@iconify/vue'

const temp = ref([
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' },
  { a: 'a' }
])
const chart = ref(null)
const chartHeight = ref(350)

onMounted(() => {
  const chartOptions = { ...options, chart: { ...options.chart, id: 'chart' } }
  // chartOptions.chart.width = 400
  //chartOptions.chart.height = chartHeight.value
  chart.value = new ApexCharts(document.querySelector('#chart'), chartOptions)
  chart.value.render()
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
              <p class="detailVal">18,375,205</p>
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
    <div class="container">
      <div class="latestBlockContainer">
        <div class="header withBtn">
          <div class="headerTitle">Latest Blocks</div>
          <RouterLink class="viewAllBtn" to="/blocks"
            >VIEW ALL BLOCKS <Icon icon="majesticons:arrow-right-line" />
          </RouterLink>
        </div>
        <div class="list">
          <div class="item" v-for="v in temp" :key="v.id">
            <div style="display: flex; align-items: center">
              <Icon icon="clarity:block-line" />
              <span>18374438</span>
            </div>
            <div> Hash: <span style="color: #1688f2">0xe3....7fbf</span> </div>
            <div> Txs: 12 </div>
            <div class="time"> 11 secs ago </div>
          </div>
        </div>
      </div>
      <div class="latestTransactionContainer">
        <div class="header withBtn">
          <div class="headerTitle">Latest Transactions</div>
          <RouterLink class="viewAllBtn" to="/transactions"
            >VIEW ALL TRANSACTIONS <Icon icon="majesticons:arrow-right-line" />
          </RouterLink>
        </div>
        <div class="list">
          <div class="item" v-for="v in temp" :key="v.id">
            <div style="display: flex; align-items: center">
              <Icon icon="cib:ethereum" />
              <span>Hash: <span>0xb2....4dea</span></span>
            </div>
            <div>
              <div>Form: <span>08f3....y5bf</span></div>
              <div>To: <span>07r3....7uFe</span></div>
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
  background-color: #141414;
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

.container {
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

.item {
  display: flex;
  height: 40px;
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

.item span {
  color: #1688f2;
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

  .container {
    display: flex;
    flex-direction: column;
  }
}
</style>
