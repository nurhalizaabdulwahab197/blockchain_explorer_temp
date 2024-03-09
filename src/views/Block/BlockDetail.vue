<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import LoadingPage from './loadingPage.vue'
const route = useRoute()
const rectangleHeight = ref(0)
const blockHeight = ref('')
const hash = ref('')
const miner = ref('')
const size = ref('')
const timestamp = ref('')
const transactionNumber = ref(0)
const transactionFee = ref(0)
const blockReward = ref(0)
const internalTransaction = ref(0)
const showToast = ref(false)
const copyMessageTitle = ref('')
const copyMessage = ref('')
const loading = ref(true)

function copyToClipboard(value, messageTitle, message) {
  const el = document.createElement('input')
  el.value = value
  document.body.appendChild(el)
  el.select()
  el.setSelectionRange(0, 99999) // For mobile devices
  document.execCommand('copy')
  document.body.removeChild(el)
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 6000)
  copyMessageTitle.value = messageTitle
  copyMessage.value = message
}

function copyBlockHeight() {
  copyToClipboard(
    blockHeight.value,
    'Block Height copied',
    'The block height was copied to the clipboard'
  )
}

function copyHash() {
  copyToClipboard(hash.value, 'Hash copied', 'The hash was copied to the clipboard')
}

function copyMiner() {
  copyToClipboard(
    miner.value,
    'Miner Message copied',
    'The miner address was copied to the clipboard'
  )
}

function startsWith0x(str) {
  return str.startsWith('0x')
}
function isNumeric(str) {
  return !isNaN(Number(str))
}

onMounted(() => {
  fetchLastBlock()
  const block = route.params.block
  if (startsWith0x(block)) {
    hash.value = block
    fetchDataHash()
  } else if (isNumeric(block)) {
    blockHeight.value = block
    fetchDataNumber()
  } else {
    console.log('Error')
  }
})

const lastestBlock = ref(0)

const fetchLastBlock = async () => {
  fetch('https://intanexplorer.azurewebsites.net/api/block/getLastSyncBlock')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Fetching encountered some error')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      lastestBlock.value = data.output
    })
    .catch((error) => {
      console.error('There was a problem fetching the data:', error)
    })
}

const fetchData = (endpoint) => {
  fetch(`https://intanexplorer.azurewebsites.net/api${endpoint}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Fetching encountered some error')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      const fetchedBlock = data.output

      if (fetchedBlock) {
        blockHeight.value = fetchedBlock.number
        hash.value = fetchedBlock.hash
        miner.value = fetchedBlock.miner
        size.value = fetchedBlock.size
        timestamp.value = fetchedBlock.timestamp
        transactionNumber.value = fetchedBlock.transactions.length
        blockReward.value = fetchedBlock.blockReward
        transactionFee.value = fetchedBlock.transactionNumber
        rectangleHeight.value = (fetchedBlock.gasUsed / fetchedBlock.gasLimit) * 100
        internalTransaction.value = fetchedBlock.internalTransaction
      } else {
        console.error('Fetched block is null')
      }
    })
    .finally(() => {
      loading.value = false
    })
    .catch((error) => {
      console.error('There was a problem fetching the data:', error)
    })
}

const fetchDataHash = () => {
  fetchData(`/block/hash/${hash.value}`)
}

const fetchDataNumber = () => {
  fetchData(`/block/number/${blockHeight.value}`)
}

const goToBlock = (block) => {
  blockHeight.value = block
  console.log(lastestBlock.value)
  router.push(`/blockchain/blockList/blockdetail/${block}`)
}
</script>

<template>
  <div v-if="loading" class="loading-container"> <loadingPage /> </div>
  <div v-else class="body">
    <div class="blockDetailContainer">
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
      <div class="title">
        <Icon icon="cib:ethereum" class="bigMoneyIcon" />
        <h2>Block {{ blockHeight }}</h2>
      </div>
      <div class="block">
        <Icon icon="bxs:left-arrow" class="blockarrow" @click="goToBlock(blockHeight - 1)" />
        <div class="rectangle-container">
          <div class="rectangle"
            ><div :style="{ height: rectangleHeight + 'px' }" class="overlapping-rectangle"></div
          ></div>
        </div>
        <Icon
          icon="bxs:right-arrow"
          class="blockarrow"
          @click="goToBlock(blockHeight + 1)"
          v-if="blockHeight < lastestBlock"
        />
      </div>
      <div class="blockinfo">
        <div class="totaltransaction">
          <h3>Total Transaction</h3>
          <p>{{ transactionNumber }}</p></div
        >
        <div class="blockheight">
          <div class="blockheightcopy"
            ><h3>Block Height</h3
            ><button class="copy" style="margin-top: 3px" @click="copyBlockHeight"
              ><Icon icon="ion:copy" class="copyicon" /><div class="visiblecopy">CLICK TO COPY</div>
            </button></div
          >

          <p>{{ blockHeight }}</p>
        </div>
        <div class="timestamp">
          <h3>Timestamp</h3>
          <p>{{ timestamp }}</p>
        </div>
      </div>
      <div class="blockdetailtitle">
        <Icon icon="cib:ethereum" class="bigMoneyIcon" />
        <h2>Block Details</h2>
      </div>
      <div style="overflow-x: auto">
        <table>
          <tr>
            <td class="c1"> Miner /Validator : </td>
            <td class="c2"> {{ miner }} </td>
            <td class="c3">
              <button @click="copyMiner" class="copy"
                ><Icon icon="ion:copy" class="copyicon" /><div class="visiblecopy">
                  CLICK TO COPY</div
                ></button
              >
            </td>
          </tr>
          <tr>
            <td class="c1"> Transactions : </td>
            <td class="c2">
              {{ transactionNumber }} transactions and {{ internalTransaction }} contract internal
              transactions
            </td>
            <td class="c3"></td>
          </tr>
          <tr>
            <td class="c1"> Size : </td>
            <td class="c2"> {{ size }} bytes </td>
            <td class="c3"></td>
          </tr>
          <tr>
            <td class="c1"> Block Reward : </td>
            <td class="c2"> {{ blockReward }} ETH</td>
            <td class="c3"></td>
          </tr>
          <tr>
            <td class="c1"> Transaction Fee : </td>
            <td class="c2"> {{ transactionFee }} ETH</td>
            <td class="c3"></td>
          </tr>
          <tr>
            <td class="c1"> Hash : </td>
            <td class="c2"> {{ hash }} </td>
            <td class="c3"
              ><button class="copy" @click="copyHash"
                ><Icon icon="ion:copy" class="copyicon" /><div class="visiblecopy">
                  CLICK TO COPY</div
                ></button
              ></td
            >
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blockheightcopy {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2px 5px 0 0;
}

.copyicon {
  margin-right: 3px;
  font-size: 9px;
}

.copy {
  display: flex;
  padding: 5px 15px;
  font-size: 9px;
  color: #9c9c9c;
  background-color: transparent;
  border: 1px groove #7f7f7f;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
}

.copy:hover {
  color: white;
  cursor: pointer;
  background-color: #919191;
}

.visiblecopy {
  padding: 0;
  margin: 0;
  font-size: 9px;
}

.blockinfo h3 {
  margin: 10px 15px 0;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
}

.blockinfo p {
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
}

.blockinfo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
}

.totaltransaction,
.blockheight,
.timestamp {
  height: 80px;
  flex: 1;
  color: black;
  background: #d9d9d9;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%);
}

.bigMoneyIcon {
  font-size: 30px !important;
  color: #fff;
}

.title h2,
.blockdetailtitle h2 {
  margin: 0 0 0 10px;

  /* font-family: Nunito, sans-serif; */
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #fff;
}

.blockDetailContainer {
  display: relative;
  width: 90%;
  margin: auto;
}

.title {
  display: flex;
  align-items: center;
}

.blockdetailtitle {
  display: flex;
  margin-top: 30px;
  margin-bottom: 20px;
  align-items: center;
}

.rectangle {
  position: relative;
  display: flex;
  width: 100px;
  height: 100px;
  margin: 30px 20px;
  overflow: hidden;
  background-color: #d3d3d3;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
}

.overlapping-rectangle {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100px;
  background: #158fff;
  border-radius: 0 0 30px 30px;
  transform: translateX(-50%);
}

.block {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

.blockarrow {
  font-size: 20px;
  cursor: pointer;
}

td {
  padding: 20px;
  text-align: left;
}

table {
  width: 100%;
  background: #282b2e;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 5px;
}

.c1 {
  width: 20%;
}

.c2 {
  width: 65%;
}

.c3 {
  width: 15%;
}

table td {
  border-bottom: 1px solid #4a4a4a;
}

tr:last-child td {
  border-bottom: none !important;
}

@media screen and (width <= 1050px) {
  .visiblecopy {
    display: none;
  }
}

@media screen and (width <= 700px) {
  body {
    font-size: 70%;
  }

  .blockinfo h3 {
    font-size: 12.8px;
  }

  .blockinfo p {
    font-size: 11.2px;
  }

  .totaltransaction h3,
  .blockheight h3,
  .timestamp h3,
  .copymessage {
    font-size: 12.8px;
  }

  .totaltransaction p,
  .blockheight p,
  .timestamp p {
    font-size: 11.2px;
  }

  .copy {
    font-size: 9.6px;
  }

  .blockarrow {
    font-size: 16px;
  }

  .blockdetailtitle h2,
  .title h2 {
    font-size: 20px;
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

  .visiblecopy {
    display: none;
  }

  td {
    font-size: 12px;
  }

  .copy {
    display: flex;
    padding: 5px 10px;
    font-size: 4px;
    color: #9c9c9c;
    background-color: transparent;
    border: 1px groove #7f7f7f;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
  }
}
</style>
