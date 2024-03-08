<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import router from '@/router'
import LoadingSpinner from '@/components/Loading/Loading.vue'

const blocks = ref([])
const currentPageBlocks = ref([])
const skipCount = ref(0)
const currentPage = ref(1)
const maxPageSize = ref(1)
const lastestBlock = ref(0)
const loadingScrollBlock = ref(true)
const loadingTableBlock = ref(true)

const fetchLastBlock = async () => {
  fetch('http://localhost:8080/api/block/getLastSyncBlock')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Fetching encountered some error')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      lastestBlock.value = data.output
      maxPageSize.value = Math.ceil(lastestBlock.value / 10)
    })
    .catch((error) => {
      console.error('There was a problem fetching the data:', error)
    })
}

const fetchData = async () => {
  fetch(`http://localhost:8080/api/block/blockListWithSkip/${skipCount.value}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Fetching encountered some error')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      blocks.value = data.output
      loadingScrollBlock.value = false
    })
    .catch((error) => {
      console.error('There was a problem fetching the data:', error)
    })
}

const scrollBlocks = (direction) => {
  console.log(skipCount.value)
  if (direction === -1 && skipCount.value > 0) {
    skipCount.value--
  } else if (direction === 1 && skipCount.value < lastestBlock.value) {
    skipCount.value++
  }
  fetchData()
}

const formatHexString = (hexString) => {
  const prefixLength = 18
  const prefix = hexString.slice(0, prefixLength)
  return prefix + '...'
}

const calcTimeDiff = (timestamp) => {
  const blockTimestamp = new Date(timestamp)
  const currentDate = new Date()
  const timeDifferenceInSeconds = Math.floor((currentDate - blockTimestamp) / 1000)
  return timeDifferenceInSeconds
}

const goToBlock = (block) => {
  router.push(`/blockchain/blockList/blockdetail/${block}`)
}

const fetchDataBlockList = (pageNumber) => {
  fetchLastBlock()
  fetch(`http://localhost:8080/api/block/blockList/${pageNumber}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch block list for page ${pageNumber}')
      }
      return response.json()
    })
    .then((responseData) => {
      currentPageBlocks.value = responseData.output
      console.log(currentPageBlocks.value)
      loadingTableBlock.value = false
    })
    .catch((error) => {
      console.error('Error fetching block list:', error)
    })
}

const goToFirstPage = () => {
  currentPage.value = 1
  fetchDataBlockList(currentPage.value)
}

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchDataBlockList(currentPage.value)
  }
}

const goToNextPage = () => {
  if (currentPage.value < maxPageSize.value) {
    currentPage.value++
    fetchDataBlockList(currentPage.value)
  }
}

const goToLastPage = () => {
  currentPage.value = maxPageSize.value
  fetchDataBlockList(currentPage.value)
}

onMounted(() => {
  fetchLastBlock()
  fetchDataBlockList(currentPage.value)
  fetchData()
})

setInterval(() => {
  fetchData()
  fetchDataBlockList(currentPage.value)
}, 10000)
</script>

<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <div class="block-page">
    <!-- Body Content -->
    <main>
      <div class="title">
        <Icon icon="cib:ethereum" class="bigMoneyIcon" />
        <h2>Block Overview</h2>
      </div>

      <!--Block Container-->
      <div class="blockContainer">
        <Icon
          icon="bxs:left-arrow"
          class="blockarrow"
          @click="scrollBlocks(-1)"
          :class="{ disabled: skipCount.value <= 0 }"
        />
        <LoadingSpinner
          v-if="loadingScrollBlock"
          :loading="loadingScrollBlock"
          class="loading-spinner h-100%"
        />
        <div class="block-scroll">
          <div class="block">
            <div
              class="rectangle-container"
              v-for="(block, index) in blocks"
              :key="block.id"
              @click="goToBlock(block.number)"
            >
              <div class="rectangle">
                <div
                  class="overlapping-rectangle"
                  :style="{
                    height: Math.round((block.gasUsed / block.gasLimit) * 100) + 'px',
                    borderRadius: '0 0 30px 30px'
                  }"
                ></div>
              </div>
              <div class="blockno">
                <p>#{{ block.number }}</p>
                <template v-if="index != 0">
                  <Icon icon="bi:link" class="link" />
                </template>
              </div>
            </div>
          </div>
        </div>

        <Icon icon="bxs:right-arrow" class="blockarrow" @click="scrollBlocks(1)" />
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
            <tr v-if="loadingTableBlock">
              <td colspan="6" style="position: relative; text-align: center">
                <LoadingSpinner :loading="loadingTableBlock" class="loading-spinner" />
              </td>
            </tr>
            <tr v-for="block in currentPageBlocks" :key="block.id">
              <td>
                {{ block.number }}
              </td>
              <td
                style="padding: 20px 1px; color: #1688f2"
                class="clickable"
                @click="goToBlock(block.hash)"
              >
                {{ formatHexString(block.hash) }}
              </td>
              <td style="color: white">
                {{ block.timestamp }}
              </td>
              <td>
                {{ block.transactions.length }}
              </td>
              <td style="display: flex; color: white; gap: 15px">
                <span>Transfer {{ block.transactions.length }}</span>
                <span>App calls 0</span>
                <span>Asset config 0</span>
              </td>
              <td style="color: #9c9c9c"> {{ calcTimeDiff(block.timestamp) }} secs ago </td>
            </tr>

            <tr>
              <td colspan="7" class="pagination-buttons">
                <div class="pagination-container">
                  <div class="centered-content">
                    <button
                      class="first-page-button"
                      @click="goToFirstPage"
                      :class="{ disabled: currentPage === 1 }"
                    >
                      First Page
                    </button>
                    <button
                      class="previous-page-button"
                      @click="goToPreviousPage"
                      :class="{ disabled: currentPage === 1 }"
                    >
                      &lt;
                    </button>
                    <span class="page-number"> {{ currentPage }}</span>
                    <button
                      class="next-page-button"
                      @click="goToNextPage"
                      :class="{ disabled: currentPage === maxPageSize }"
                    >
                      &gt;
                    </button>

                    <button
                      class="last-page-button"
                      @click="goToLastPage"
                      :class="{ disabled: currentPage === maxPageSize }"
                    >
                      Last Page
                    </button>
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
.title {
  display: flex;
  flex-direction: row;
}

.title h2 {
  margin: 4px 0 0 10px;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #fff;
}

.bigMoneyIcon {
  font-size: 30px;
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
  cursor: pointer;
  transform: translateY(-50%);
}

.disable {
  pointer-events: none;
  opacity: 0.5;
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

.rectangle-container {
  position: relative; /* Set position relative to contain the absolute positioning of the link */
  margin: 0 5px;
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
  overflow: hidden;
  cursor: pointer;
  background-color: #d3d3d3;
  border-radius: 30px;
}

.rectangle:active {
  opacity: 0.8;
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
  position: absolute;
  top: 51%;
  left: auto;
  max-width: calc(100% - 12px); /* Ensure the link fits within its container */
  padding-right: 12px;
  overflow: hidden;
  font-size: medium;
  text-overflow: ellipsis;
  transform: translate(-50%, -50%);
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

.clickable {
  cursor: pointer;
}

.clickable:hover {
  text-decoration: underline;
}
</style>
