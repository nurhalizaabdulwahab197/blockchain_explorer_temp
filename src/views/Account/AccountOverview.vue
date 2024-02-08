<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { ref, onMounted } from 'vue' // Import Vue composition API

const thisPage = ref(1)
const limit = 10
const list = ref<HTMLElement[]>([])

function loadItem() {
  const beginGet = limit * (thisPage.value - 1)
  const endGet = limit * thisPage.value - 1

  list.value.forEach((item, key) => {
    if (key >= beginGet && key <= endGet) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

onMounted(() => {
  // Populate the list array with elements from the NodeList
  list.value = Array.from(document.querySelectorAll('.row')) as HTMLElement[]
  loadItem()
})
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
              ><Icon icon="icon-park-twotone:copy" class="copyIcon" />&nbsp;CLICK TO COPY</button
            >
          </div>
          <div class="add-sub-cont">
            <p>2JLNXF725EKFJD6SG3KK3MVJZKFZMGVVWQZNWTM4YOUH6XVUUHEAWL4ZV4</p>
          </div>
        </div>
        <div class="balance">
          <div class="bal-sub-cont">
            <h3>ETH BALANCE</h3>
          </div>
          <div class="bal-sub-cont">
            <Icon icon="ri:eth-line" class="eth" /><h2>2,984,943,425,066</h2>
          </div>
        </div>
      </div>
      <div class="transaction-cont">
        <div class="trans-title"><h2>TRANSACTIONS</h2></div>
        <div class="trans-table">
          <div class="theader">
            <div class="th th1">Txn Hash</div>
            <div class="th th2">Block</div>
            <div class="th th3">Time</div>
            <div class="th th4">From</div>
            <div class="th th5">To</div>
            <div class="th th6">Amount</div>
            <div class="th th7">Age</div>
          </div>
          <div v-for="index in 20" :key="index" class="row">
            <div class="td td1">0x3916d1d5a3e98e5ae9....</div>
            <div class="td td2">18374438</div>
            <div class="td td3">2023-10-18 21:52:59</div>
            <div class="td td4">0x77a879bc1868c....</div>
            <div class="td td5">08se67182189024....</div>
            <div class="td td6">0.034 ETH</div>
            <div class="td td7">6 secs ago</div>
          </div>
          <div class="paginate">
            <div class="prev">First Page</div>
            <div class="page">1</div>
            <div class="next">Next Page</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  width: 100%;
  height: auto;
}

.main {
  width: 95%;
  height: 100vh;
  margin: auto;
}

.header {
  display: flex;
  margin-left: 20px;
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
  width: 80%;
  height: 20%;
  margin: 35px auto;
  justify-content: space-between;
}

.address,
.balance {
  height: 100%;
  padding: 0 18px;
  background-color: #d9d9d9;
}

.address {
  width: 60%;
  border-radius: 8px;
}

.add-sub-cont {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.balance {
  width: 31%;
  border-radius: 8px;
}

h3 {
  padding: 0;
  font-size: 20px;
  color: black;
}

.btn {
  width: 150px;
  height: 25px;
  padding: 0;
  margin: 0;
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
  font-size: 18px;
  color: #158fff;
  word-wrap: break-word;
}

.bal-sub-cont {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.eth {
  margin-right: 8px;
  font-size: 30px;
  color: #676767;
}

.balance h2 {
  width: 100%;
  color: #676767;
  word-wrap: break-word;
}

.transaction-cont {
  width: 80%;
  height: auto;
  margin: 20px auto;
}

.trans-title h2 {
  margin: 5px 0;
  font-size: 22px;
  font-weight: 400;
}

.trans-table {
  display: flex;
  width: 100%;
  margin-top: 20px;
  flex-direction: column;
}

.theader {
  display: flex;
  width: 100%;
  height: 35px;
  margin: 0;
  background-color: #d9d9d9;
  border-radius: 10px 10px 0 0;
}

.th {
  padding: 5px 10px;
  font-size: 18px;
  font-weight: 400;
  color: black;
}

.row {
  display: flex;
  width: 100%;
  background-color: #282b2e;
  border-bottom: 2px solid #4a4a4a;
  align-items: center;
}

.td {
  height: 25px;
  padding: 5px 10px;
}

.td1,
.td4,
.td5 {
  color: #1688f2;
}

.td6 {
  color: #6afd36;
}

.td7 {
  color: #9c9c9c;
}

.td1,
.th1 {
  width: 205px;
}

.th4,
.th5,
.td4,
.td5 {
  width: 170px;
}

.th2,
.td2 {
  width: 100px;
}

.th3,
.td3 {
  width: 160px;
}

.th6,
.td6 {
  width: 95px;
}

.th7,
.td7 {
  width: 90px;
}

.paginate {
  display: flex;
  width: 100%;
  height: 35px;
  background-color: #282b2e;
  border-radius: 0 0 10px 10px;
  justify-content: flex-end;
}

.prev,
.page,
.next {
  display: flex;
  height: 20px;
  padding: 2px 5px;
  margin: 5px;
  color: #000;
  background-color: #fff;
  border-radius: 5px;
  opacity: 0.6;
}
</style>
