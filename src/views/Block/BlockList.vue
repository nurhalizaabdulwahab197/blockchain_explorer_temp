<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <div class="block-page">
    <!-- Body Content -->
    <main>
      <div class="title">
        <Icon icon="dashicons:money-alt" class="bigMoneyIcon" />
        <h2>Block Overview</h2>
      </div>

      <!--Block Container-->
      <div class="blockContainer">
        <Icon icon="bxs:left-arrow" class="blockarrow" />
        <div class="block-scroll">
          <div class="block">
            <div class="rectangle-container">
              <div class="rectangle">
                <div style="height: 40px" class="overlapping-rectangle"></div>
              </div>
              <div class="blockno">
                <p>#18374445</p>
              </div>
            </div>
            <Icon icon="bi:link" class="link" />
            <div class="rectangle-container">
              <div class="drectangle">
                <div style="height: 63px" class="overlapping-rectangle"></div>
              </div>
              <div class="blockno">
                <p>#18374444</p>
              </div>
            </div>

            <Icon icon="bi:link" class="link" />
            <div class="rectangle-container">
              <div class="drectangle">
                <div style="height: 60px" class="overlapping-rectangle"></div>
              </div>
              <div class="blockno">
                <p>#18374443</p>
              </div>
            </div>

            <Icon icon="bi:link" class="link" />
            <div class="rectangle-container">
              <div class="drectangle">
                <div style="height: 55px" class="overlapping-rectangle"></div>
              </div>
              <div class="blockno">
                <p>#18374442</p>
              </div>
            </div>

            <Icon icon="bi:link" class="link" />
            <div class="rectangle-container">
              <div class="drectangle">
                <div style="height: 40px" class="overlapping-rectangle"></div>
              </div>
              <div class="blockno">
                <p>#18374441</p>
              </div>
            </div>

            <Icon icon="bi:link" class="link" />
            <div class="rectangle-container">
              <div class="drectangle">
                <div style="height: 38px" class="overlapping-rectangle"></div>
              </div>
              <div class="blockno">
                <p>#18374440</p>
              </div>
            </div>

            <Icon icon="bi:link" class="link" />
            <div class="rectangle-container">
              <div class="drectangle">
                <div style="height: 45px" class="overlapping-rectangle"></div>
              </div>
              <div class="blockno">
                <p>#18374439</p>
              </div>
            </div>

            <Icon icon="bi:link" class="link" />
            <div class="rectangle-container">
              <div class="drectangle">
                <div style="height: 38px" class="overlapping-rectangle"></div>
              </div>
              <div class="blockno">
                <p>#18374438</p>
              </div>
            </div>

            <Icon icon="bi:link" class="link" />
            <div class="rectangle-container">
              <div class="drectangle">
                <div style="height: 33px" class="overlapping-rectangle"></div>
              </div>
              <div class="blockno">
                <p>#18374437</p>
              </div>
            </div>
          </div>
        </div>

        <Icon icon="bxs:right-arrow" class="blockarrow" />
      </div>

      <div class="table-section" style="overflow-x: auto">
        <table>
          <thead>
            <tr class="rounded-header">
              <th>Block</th>
              <th>Hash</th>
              <th>Time</th>
              <th>Txs</th>
              <th>Txs Summary</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <!-- Display a fixed number of data rows (e.g., 10 rows) -->
            <tr v-for="(item, index) in slicedDummyData" :key="index">
              <td
                style="overflow: hidden; color: white; text-overflow: ellipsis; white-space: nowrap"
                >{{ item.block }}</td
              >
              <td
                style="
                  overflow: hidden;
                  color: #1688f2;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
                >{{ item.hash }}</td
              >
              <td
                style="overflow: hidden; color: white; text-overflow: ellipsis; white-space: nowrap"
                >{{ item.time }}
              </td>
              <td
                style="overflow: hidden; color: white; text-overflow: ellipsis; white-space: nowrap"
                >{{ item.txs }}
              </td>
              <td
                style="overflow: hidden; color: white; text-overflow: ellipsis; white-space: nowrap"
                >{{ item.txssummary }}</td
              >
              <td
                style="
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
interface Block {
  block: number
  hash: string
  time: string
  txs: number
  txssummary: string
  age: number
}

const dummyData = ref<Block[]>([
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  },
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  },
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  },
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  },
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  },
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  },
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  },
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  },
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  },
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  },
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  },
  {
    block: 18374438,
    hash: '0x0d4dde84447bdd54....',
    time: '2023-10-18 21:52:59',
    txs: 35,
    txssummary: 'Transfers 26 \u00A0\u00A0\u00A0 App calls 6 \u00A0\u00A0\u00A0 set config 4',
    age: 11
  }
])

const currentPage = ref(1)

const slicedDummyData = ref<Block[]>([])

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
  if (currentPage.value < 10) {
    currentPage.value++
    updateSlicedDummyData()
  }
}

const goToLastPage = () => {
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
.title {
  display: flex;
  flex-direction: row;
}

.title h2 {
  margin: 4px 0 0 5px;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #fff;
}

.bigMoneyIcon {
  font-size: 38px;
  color: #fff;
}

.blockContainer {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.blockarrow {
  margin: 25px 15px 0;
  font-size: 25px;
}

.block-scroll {
  flex: 1;
  overflow-x: auto;
}

.block {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: fit-content;
}

.overlapping-rectangle {
  position: absolute;
  bottom: 0;
  width: 100px;
  background: #158fff;
  border-radius: 0 0 30px 30px;
}

.rectangle {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 30px 6px 10px;
  background-color: #d3d3d3;
  border-radius: 30px;
}

.drectangle {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 30px 6px 10px;
  background-color: rgb(211 211 211 / 50%);
  border-radius: 30px;
}

.link {
  margin-top: 30px;
}

.blockno p {
  margin: 0 14px;
  text-align: center;
}

.block-page {
  display: flex;
  width: 90%;
  min-height: 100%;
  margin: auto;
  flex-direction: column;
}

main {
  flex: 1;
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
  background-color: rgb(255 255 255 / 60%);
  border-radius: 25px;
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
  background-color: rgb(255 255 255 / 60%);
  border-radius: 5px;
}
</style>
