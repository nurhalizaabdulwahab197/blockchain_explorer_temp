<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import LoadingSpinner from '@/components/Loading/Loading.vue'

const route = useRoute()
// change title with reference to url
const pageTitle = ref('')
const dataset = ref([])
const balance = ref('')
const accAddress = ref('')
const isButtonClicked = ref(false)
const showToast = ref(false)
const copyMessageTitle = ref('')
const copyMessage = ref('')
const loading = ref(true)

const fetchData = async () => {
  const addressFromUrl = route.params.address
  accAddress.value = addressFromUrl
  fetch(`http://localhost:8080/api/account/accountOverview/${addressFromUrl}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Fetching encountered some error')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      dataset.value = data.data
      balance.value = data.balance
      updatePaginateData()
      pageTitle.value = route.meta.title
    })
    .finally(() => {
      loading.value = false
    })
    .catch((error) => {
      console.error('There was a problem fetching the data:', error)
    })
}

const formattedBalance = computed(() => {
  return balance.value === '0.' ? '0' : balance.value
})

// Call fetchData when the component is mounted
onMounted(() => {
  fetchData()
})

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
  paginatedData.value = dataset.value.slice(startIndex, endIndex)
  console.log(paginatedData.value)
}

updatePaginateData()

const goToDetail = (TxnHash) => {
  router.push('/blockchain/transactionList/transactionDetail/' + TxnHash)
}

const goToToAccount = (account) => {
  if (account.input === '0x' && account.receiverAddress !== 'null') {
    router.push('/account/accountOverview/' + account.receiverAddress)
  } else if (
    account.input !== '0x' &&
    account.receiverAddress !== 'null' &&
    account.contractAddress === 'null'
  ) {
    router.push('/contract/contractOverview/' + account.receiverAddress)
  } else {
    router.push('/contract/contractOverview/' + account.contractAddress)
  }
}

const goToFromAccount = (account) => {
  router.push('/account/accountOverview/' + account)
}

const calcTimeDiff = (timestamp) => {
  const blockTimestamp = new Date(timestamp)
  const currentDate = new Date()
  const timeDifferenceInMilliseconds = currentDate - blockTimestamp
  const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000)
  return timeDifferenceInSeconds
}

function copyToClipboard() {
  const addValue = document.createElement('input')
  addValue.value = accAddress.value
  document.body.appendChild(addValue)
  addValue.select()
  addValue.setSelectionRange(0, 99999) // For mobile devices
  document.execCommand('copy')
  document.body.removeChild(addValue)
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 6000)
  copyMessageTitle.value = 'Address copied'
  copyMessage.value = 'The address was copied to the clipboard'
}
</script>

<template>
  <LoadingSpinner v-if="loading" class="h-100%" />
  <div v-else class="body">
    <div class="main">
      <div v-if="showToast" class="alertbox">
        <div class="bardesign"></div
        ><div class="copymessage"
          ><div class="copymessagetitle"
            ><Icon
              icon="charm:tick-double"
              style="margin-right: 5px; font-size: 1.5rem; color: blue"
            />
            {{ copyMessageTitle }} </div
          >{{ copyMessage }}</div
        >
      </div>
      <div class="header">
        <Icon icon="codicon:account" class="accountIcon" /><h1>{{ pageTitle }}</h1>
      </div>
      <div class="info-cont">
        <div class="address">
          <div class="add-sub-cont">
            <h3>ADDRESS</h3>
            <button class="btn" @click="copyToClipboard()" :class="{ clicked: isButtonClicked }"
              ><Icon icon="icon-park-twotone:copy" class="copyIcon" /><span
                >CLICK TO COPY</span
              ></button
            >
          </div>
          <div class="add-sub-cont-2">
            <p id="copyAdd">{{ accAddress }}</p>
          </div>
        </div>
        <div class="balance">
          <div class="bal-sub-cont">
            <h3>ETH BALANCE</h3>
          </div>
          <div class="bal-sub-cont">
            <Icon icon="ri:eth-line" class="eth" /><h2>{{ formattedBalance }}</h2>
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
                <td class="td1 clickable" @click="goToDetail(item.hash)"
                  ><span>{{ item.hash }}</span></td
                >
                <td class="td2">{{ item.block }}</td>
                <td class="td3">{{ item.timestamp }}</td>
                <td class="td4 clickable" @click="goToFromAccount(item.senderAddress)">{{
                  item.senderAddress
                }}</td>
                <td class="td5 clickable" @click="goToToAccount(item)">
                  <span v-if="item.receiverAddress !== 'null'">{{ item.receiverAddress }}</span>
                  <span v-else>{{ item.contractAddress }}</span>
                </td>

                <td class="td6">{{ item.amount }} ETH</td>
                <td class="td7">{{ calcTimeDiff(item.timestamp) }} secs ago</td>
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
  font-size: 22px;
  font-weight: 500;
}

.info-cont {
  display: flex;
  width: 90%;
  gap: 30px;
  height: auto;
  margin: 35px auto 25px;
  flex: 1;
  justify-content: space-between;
  flex-wrap: wrap;
}

.address,
.balance {
  display: flex;
  padding: 10px 20px;
  margin-bottom: 15px;
  background-color: #d9d9d9;
  flex-direction: column;
}

.address {
  flex: 3;
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
  margin: auto 0;
}

.btn {
  display: flex;
  width: 150px;
  height: auto;
  padding: 5px 15px;
  color: #9c9c9c;
  cursor: pointer;
  background-color: #d9d9d9;
  border: 1px solid #7f7f7f;
  border-radius: 20px;
  align-items: center;
}

.btn:active,
.clicked {
  color: #fff;
  background-color: #000;
}

.btn:hover {
  color: white;
  background-color: #919191;
  opacity: 1;
}

.btn:active,
.clicked {
  color: #fff;
  background-color: #000;
}

.copyIcon {
  padding: 0;
  margin: 0 2px 0 0;
}

.address p {
  width: 100%;
  margin: 0.83em 0;
  font-size: 22px;
  color: #158fff;
  word-wrap: break-word;
}

.balance {
  flex: 2;
  border-radius: 8px;
}

h3 {
  padding: 0;
  font-size: 18px;
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
  font-size: 30px;
  color: #676767;
}

.balance h2 {
  width: 80%;
  padding-left: 5px;
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
  font-size: 20px;
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
  font-size: 14px;
  white-space: nowrap;
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
  max-width: 150px;
  overflow: hidden;
  color: #1688f2;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.clickable:hover {
  text-decoration: underline;
}

.td2 {
  text-align: center;
}

.td6 {
  color: #6afd36;
  text-align: center;
}

.td7 {
  color: #9c9c9c;
  text-align: center;
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
  cursor: pointer;
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

.fpage,
.lpage {
  cursor: pointer;
}

.bardesign {
  width: 10px;
  height: 100px;
  background-color: #1f51ff;
  border-radius: 10px;
}

.copymessagetitle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  font-size: 20px;
}

.tickicon {
  margin-right: 5px;
  color: #1f51ff;
}

.alertbox {
  position: absolute;
  right: 10px;
  z-index: 10000;
  display: flex;
  width: 450px;
  flex-direction: row;
}

.copymessage {
  display: flex;
  width: 100%;
  padding-left: 30px;
  margin-right: 10px;
  background-color: #363737;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

@media screen and (width <= 600px) {
  .info-cont {
    flex-direction: column;
    margin: 35px 0;
  }

  .address,
  .balance {
    width: 100%;
  }

  .btn {
    margin: 10px 0;
  }

  .transaction-cont {
    width: 100%;
    height: auto;
    overflow-x: auto;
  }

  .paginate {
    justify-content: center;
  }

  .alertbox {
    position: absolute;
    right: 10px;
    z-index: 10000;
    display: flex;
    width: 80%;
    flex-direction: row;
  }

  .copymessage {
    display: flex;
    width: 100%;
    padding-left: 25px;
    margin-right: 8px;
    background-color: #363737;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .copymessagetitle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    font-size: 15px;
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

@media screen and (width <= 1050px) {
  .visiblecopy {
    display: none;
  }
}

.bardesign {
  width: 10px;
  height: 100px;
  background-color: #1f51ff;
  border-radius: 10px;
}

.copymessagetitle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  font-size: 20px;
}

.tickicon {
  margin-right: 5px;
  color: #1f51ff;
}

.alertbox {
  position: absolute;
  right: 10px;
  z-index: 10000;
  display: flex;
  width: 450px;
  flex-direction: row;
}

.copymessage {
  display: flex;
  width: 100%;
  padding-left: 30px;
  margin-right: 10px;
  background-color: #363737;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
</style>
