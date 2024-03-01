<template>
  <div class="bodycontent">
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
    <div class="title-container">
      <Icon icon="cib:ethereum" class="moneyicon" />
      <div class="title">Transaction Overview</div>
      <div class="iconbackbutton"
        ><Icon icon="ion:chevron-back" @click="retrievePreviousTransaction"
      /></div>
      <div class="iconnextbutton"
        ><Icon icon="ion:chevron-forward" @click="retrieveNextTransaction"
      /></div>
    </div>
    <div class="firstrow-container">
      <div class="column-container">
        <div class="container-title">
          <div class="firstrowtitle">TRANSACTION ID</div>
          <button class="rowCopybutton" @click="copyTransactionIdToClipboard">
            <Icon icon="iconamoon:copy-bold" />
            <div class="none">CLICK TO COPY</div>
          </button>
        </div>
        <div>{{ transactionId }}</div>
      </div>
      <div class="column-container">
        <div class="container-title firstrowtitle">TIMESTAMP</div>
        <div class="center">{{ formatTimestamp(timestamp) }}</div>
      </div>
    </div>
    <div class="block-container">
      <div class="container-title">BLOCK</div>
      <div class="center">
        <div class="block">{{ block }}</div>
      </div>
    </div>
    <div style="overflow-x: auto">
      <table>
        <tr class="tabletitle-container">
          <th colspan="2">
            <div class="tabletitle">
              <Icon icon="cib:ethereum" />
              <div>TRANSACTION DETAILS</div>
            </div>
          </th>
        </tr>
        <tr>
          <td>
            <div class="tablesubtitle">
              <Icon icon="cib:ethereum" />
              <div>SENDER : </div>
            </div>
          </td>
          <td class="tablerow">
            <span class="clickable tablecontent address" @click="goToDetail(senderAddress)">{{
              senderAddress
            }}</span>
            <button class="tableCopybutton" @click="copySenderToClipboard">
              <Icon icon="iconamoon:copy-bold" />
              <div class="none">CLICK TO COPY</div>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div class="tablesubtitle">
              <Icon icon="cib:ethereum" />
              <div>AMOUNT :</div>
            </div>
          </td>
          <td colspan="2" class="amount tablecontent">{{ amount }} ETH</td>
        </tr>
        <tr>
          <td>
            <div class="tablesubtitle">
              <Icon icon="cib:ethereum" />
              <div>RECERIVER :</div>
            </div>
          </td>
          <td class="tablerow">
            <span class="clickable tablecontent address" @click="goToDetail(receiverAddress)">{{
              receiverAddress
            }}</span>
            <button class="tableCopybutton" @click="copyReceiverToClipboard">
              <Icon icon="iconamoon:copy-bold" />
              <div class="none">CLICK TO COPY</div>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div class="tablesubtitle">
              <Icon icon="cib:ethereum" />
              <div>VALUE :</div>
            </div>
          </td>
          <td>
            <div class="alligncenter">
              <Icon icon="ri:eth-fill" />
              <div class="tablecontent">{{
                parseFloat(value) > 0 ? `${value} ETH` : '0 ETH ($0.00)'
              }}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="tablesubtitle">
              <Icon icon="cib:ethereum" />
              <div>GAS PRICE :</div>
            </div>
          </td>
          <td>
            <!--{# 1 ETH = 3,257.249999 USD #}-->
            <div class="tablecontent"
              >{{ gasPrice }} ETH ( ${{ (parseFloat(gasPrice) * 3257.249999).toFixed(2) }} )</div
            >
          </td>
        </tr>
        <tr>
          <td class="feetitle">
            <div class="tablesubtitle">
              <Icon icon="cib:ethereum" />
              <div>TRANSACTION FEE :</div>
            </div>
          </td>
          <td>
            <div class="transactionfee-content">
              <!--{#A gwei is one-billionth of one ETH.#}-->
              <div class="tablecontent"
                >{{ transactionFee }} ETH ( ${{
                  (parseFloat(transactionFee) * 3257.249999).toFixed(2)
                }}
                )</div
              >
              <div class="transactionfee-container">
                <div class="column2-container">
                  <div class="container-title">NOTE</div>
                  <div class="center">This sender has created a contract</div>
                </div>
                <div class="column2-container">
                  <div class="container-title">ONCOMPLETE</div>
                  <div class="center">Create</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <div class="subTitle">
        <Icon icon="cib:ethereum" />
        <div class="title">MORE DETAILS</div>
        <div></div>
      </div>
      <div class="moredetail-container">
        <div class="left-container">
          <Icon icon="cib:ethereum" />
          <div>Gas Limit & Usage by Txn:</div>
        </div>
        <div class="right-container">{{
          `${parseFloat(gasLimit)} | ${parseFloat(gasUsed)} (${((parseFloat(gasUsed) / parseFloat(gasLimit)) * 100).toFixed(2)}%)`
        }}</div>
      </div>
      <div class="moredetail-container">
        <div class="left-container">
          <Icon icon="cib:ethereum" />
          <div>Gas Fees:</div>
        </div>
        <div class="right-container"
          >Base: {{ baseFeePerGas }} Gwei | Max: {{ maxFeePerGas }} Gwei | Max Priority:
          {{ maxPriorityFeePerGas }} Gwei
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import router from '@/router'
import axios from 'axios'

const transactionId = ref('')
const block = ref('')
const senderAddress = ref('')
const amount = ref('')
const receiverAddress = ref('')
const value = ref('')
const gasPrice = ref('')
const transactionFee = ref('')
const gasLimit = ref('')
const gasUsed = ref('')
const gasFees = ref('')
const timestamp = ref('')
const maxFeePerGas = ref('')
const maxPriorityFeePerGas = ref('')
const baseFeePerGas = ref('')
const showToast = ref(false)
const copyMessageTitle = ref('')
const copyMessage = ref('')

const route = useRoute()

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

function copySenderToClipboard() {
  copyToClipboard(
    senderAddress.value,
    'Sender Address copied',
    'The sender address was copied to the clipboard'
  )
}

function copyReceiverToClipboard() {
  copyToClipboard(
    receiverAddress.value,
    'Receiver Adress copied',
    'The receiver address was copied to the clipboard'
  )
}

function copyTransactionIdToClipboard() {
  copyToClipboard(
    transactionId.value,
    'Transaction Id copied',
    'The transaction id was copied to the clipboard'
  )
}

const fetchData = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/transaction/${route.params.id}`)
    const transactionData = response.data.output

    // Assign data to variables
    transactionId.value = transactionData.hash
    block.value = transactionData.block
    senderAddress.value = transactionData.senderAddress
    amount.value = transactionData.amount
    receiverAddress.value = transactionData.receiverAddress
    value.value = transactionData.value
    gasPrice.value = transactionData.gasPrice
    transactionFee.value = transactionData.transactionFee
    gasLimit.value = transactionData.gasLimit
    gasUsed.value = transactionData.gasUsed
    gasFees.value = transactionData.gasFees
    timestamp.value = transactionData.timestamp
    maxFeePerGas.value = transactionData.maxFeePerGas
    maxPriorityFeePerGas.value = transactionData.maxPriorityFeePerGas
    baseFeePerGas.value = transactionData.baseFeePerGas
  } catch (error) {
    console.error('Error fetching transaction:', error)
  }
}

const formatTimestamp = (timestamp: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    timeZone: 'GMT'
  }

  return new Date(timestamp).toLocaleString('en-US', options)
}

const retrieveNextTransaction = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/transaction/next/${transactionId.value}`
    )
    const nextTransactionHash = response.data.output.hash
    router.push({ name: 'TransactionDetail', params: { id: nextTransactionHash } })
  } catch (error) {
    console.error('Error fetching next transaction:', error)
  }
}
const retrievePreviousTransaction = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/transaction/prev/${transactionId.value}`
    )
    const previousTransactionHash = response.data.output.hash
    router.push({ name: 'TransactionDetail', params: { id: previousTransactionHash } })
  } catch (error) {
    console.error('Error fetching previous transaction:', error)
  }
}

onMounted(() => {
  // Fetch data initially
  fetchData()

  // Fetch data every 10 seconds
  setInterval(fetchData, 10000)
})

watch(
  () => route.params.id,
  (newId) => {
    transactionId.value = newId as string
  }
)

const goToDetail = (account) => {
  router.push(`/account/accountOverview/${account}`)
}
</script>

<style scoped lang="css">
.bodycontent {
  width: 90%;
  margin: auto;
}

.alligncenter {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.tablesubtitle {
  display: flex;
  padding-left: 1.5rem;
  margin: 0;
  gap: 0.2rem;
  justify-content: left;
  align-items: center;
}

.moneyicon {
  font-size: 30px;
}

.iconnextbutton,
.iconbackbutton {
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  background-color: rgb(217 217 217 / 30%);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
}

a {
  color: rgb(44 44 255);
  text-decoration: none;
}

.rowCopybutton,
.tableCopybutton {
  display: flex;
  padding: 0.2rem 1.5rem;
  font-size: 0.7rem;
  background-color: transparent;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.rowCopybutton {
  color: rgb(163 163 163);
  border: 0.1rem solid rgb(163 163 163);
}

.rowCopybutton:hover {
  color: rgb(90 90 90);
  cursor: pointer;
  border: 0.1rem solid rgb(90 90 90);
}

.tableCopybutton {
  color: rgb(90 90 90);
  border: 0.1rem solid rgb(90 90 90);
}

.tableCopybutton:hover {
  color: rgb(200 200 200);
  cursor: pointer;
  border: 0.1rem solid rgb(200 200 200);
}

table {
  width: 100%;
  border-collapse: collapse;
}

table tr {
  border: 0.1rem solid rgb(163 163 163);
}

.tabletitle {
  display: flex;
  gap: 0.7rem;
  font-size: 1.3rem;
  align-items: center;
}

.tabletitle-container {
  color: black;
  background-color: rgb(200 200 200);
}

.address {
  color: #1688f2;
  cursor: pointer;
}

.address:hover {
  text-decoration: underline;
}

.tablerow {
  display: flex;
  justify-content: space-between;
}

th,
td {
  padding: 1rem;
}

td {
  align-items: center;
}

.transactionfee-container {
  display: flex;
  margin-right: 10rem;
  gap: 1rem;
}

.title {
  margin-right: 0.7rem;
  margin-left: 0.7rem;
  font-size: 1.3rem;
  color: white;
}

.center {
  display: flex;
  font-size: 0.8rem;
  justify-content: center;
}

.title-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.firstrow-container {
  display: flex;
  overflow-x: auto;
  justify-content: space-between;
  gap: 2rem;
}

.column2-container {
  display: grid;
  width: 9rem;
  padding: 0.5rem 1rem 0.7rem;
  color: black;
  background-color: rgb(200 200 200);
  border-radius: 0.3rem;
  row-gap: 0.5rem;
}

.column-container {
  display: grid;
  width: 100%;
  padding: 0.8rem 1rem;
  color: black;
  background-color: rgb(200 200 200);
  border-radius: 0.3rem;
  row-gap: 1rem;
}

.block-container {
  padding: 0.8rem 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: black;
  background-color: rgb(200 200 200);
  border-radius: 0.3rem;
}

.container-title {
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: space-between;
}

.block {
  padding: 0.3rem 4rem;
  color: black;
  text-decoration: underline;
  background-color: white;
  border: none;
  border-radius: 0.5rem;
}

.moredetail-container {
  display: flex;
  padding: 0.8rem 1rem;
  margin-top: 1rem;
  color: black;
  background-color: rgb(200 200 200);
  border-radius: 0.3rem;
}

.subTitle {
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
}

.left-container {
  display: flex;
  padding-left: 1.5rem;
  gap: 0.2rem;
  align-items: center;
  flex: 0 0 26.5%;
}

.right-container {
  flex: 1;
}

.transactionfee-content {
  display: grid;
  row-gap: 1rem;
}

.feetitle {
  display: grid;
  align-items: flex-start;
}

.amount {
  color: rgb(24 255 24);
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

.copymessagetitle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  font-size: 20px;
}

.bardesign {
  width: 10px;
  height: 100px;
  background-color: #1f51ff;
  border-radius: 10px;
}

.alertbox {
  position: absolute;
  right: 10px;
  z-index: 10000;
  display: flex;
  width: 450px;
  flex-direction: row;
}

@media screen and (width <= 828px) {
  .title {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    font-size: 1.1rem;
  }

  .rowCopybutton {
    padding: 0.2rem 0.8rem;
    margin-left: 1rem;
  }

  .tableCopybutton {
    padding: 0.2rem 0.8rem;
  }

  .none {
    display: none;
  }

  .iconnextbutton,
  .iconbackbutton {
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 0.3rem;
  }

  .tablesubtitle {
    display: flex;
    padding-left: 1.2rem;
    margin: 0;
    font-size: 0.8rem;
    gap: 0.2rem;
    align-items: center;
    justify-content: left;
  }

  .alertbox {
    position: absolute;
    right: 10px;
    z-index: 10000;
    display: flex;
    width: 80%;
    flex-direction: row;
  }

  .left-container {
    display: flex;
    align-items: center;
    padding-left: 0.3rem;
    gap: 0.5rem;
    flex: 0 0 45%;
  }

  .tabletitle {
    display: flex;
    gap: 0.7rem;
    font-size: 1.2rem;
    align-items: center;
  }

  .firstrow-container {
    display: flex;
    overflow-x: auto;
    justify-content: space-between;
    gap: 1rem;
  }

  .tablecontent {
    font-size: 1.1rem;
  }

  td:first-child {
    width: 11rem;
  }

  .bodycontent {
    margin: 0 1rem;
  }
}

@media screen and (width <= 700px) {
  .copymessage {
    display: flex;
    width: 100%;
    padding-left: 25px;
    margin-right: 8px;
    font-size: 12.8px;
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
</style>
