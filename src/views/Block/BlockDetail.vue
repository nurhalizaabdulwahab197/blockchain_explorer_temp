<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const rectangleHeight = ref(50)
const blockHeight = ref('#18374444')
const hash = ref('0000eaa199dd8ac0f65d203aec421c7734a7771399159d1f8b404d2084e98238bf')
const miner = ref('0x0d4dde84447bdd54861a88261f0a17e761be717d9faabfef1e01775df3e61d5d')
const showToast = ref(false)
const copyMessageTitle = ref('')
const copyMessage = ref('')

function copyBlockHeight() {
  const heightValue = document.createElement('input')
  heightValue.value = blockHeight.value
  document.body.appendChild(heightValue)
  heightValue.select()
  heightValue.setSelectionRange(0, 99999) // For mobile devices
  document.execCommand('copy')
  document.body.removeChild(heightValue)
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 6000)
  copyMessageTitle.value = 'Block Height copied'
  copyMessage.value = 'The block height was copied to the clipboard'
}

function copyHash() {
  const hashinput = document.createElement('input')
  hashinput.value = hash.value
  document.body.appendChild(hashinput)
  hashinput.select()
  hashinput.setSelectionRange(0, 99999) // For mobile devices
  document.execCommand('copy')
  document.body.removeChild(hashinput)
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 6000)
  copyMessageTitle.value = 'Hash copied'
  copyMessage.value = 'The address was copied to the clipboard'
}

function copyMiner() {
  const minerInput = document.createElement('input')
  minerInput.value = miner.value
  document.body.appendChild(minerInput)
  minerInput.select()
  minerInput.setSelectionRange(0, 99999) // For mobile devices
  document.execCommand('copy')
  document.body.removeChild(minerInput)
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 6000)
  copyMessageTitle.value = 'Miner Message copied'
  copyMessage.value = 'The address was copied to the clipboard'
}
</script>

<template>
  <div class="body">
    <div class="blockDetailContainer">
      <div v-if="showToast" class="alertbox">
        <div class="bardesign"></div
        ><div class="copymessage"
          ><div class="copymessagetitle"
            ><Icon
              icon="charm:tick-double"
              style=" margin-right: 5px;font-size: 1.5rem; color: blue"
            />
            {{ copyMessageTitle }} </div
          >{{ copyMessage }}</div
        >
      </div>
      <div class="title">
        <Icon icon="dashicons:money-alt" class="bigMoneyIcon" />
        <h2>Block 18374445</h2>
      </div>
      <div class="block">
        <Icon icon="bxs:left-arrow" class="blockarrow" />
        <div class="rectangle-container">
          <div class="rectangle"
            ><div :style="{ height: rectangleHeight + '%' }" class="overlapping-rectangle"></div
          ></div>
        </div>
        <Icon icon="bxs:right-arrow" class="blockarrow" />
      </div>
      <div class="blockinfo">
        <div class="totaltransaction">
          <h3>Total Transaction</h3>
          <p>20</p></div
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
          <p>tdu, 19-10-2023 8:34:45 GMT</p>
        </div>
      </div>
      <div class="blockdetailtitle">
        <Icon icon="dashicons:money-alt" class="bigMoneyIcon" />
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
            <td class="c2"> 20 transactions and 15 contract internal transactions </td>
            <td class="c3"></td>
          </tr>
          <tr>
            <td class="c1"> Size : </td>
            <td class="c2"> 41,246 bytes </td>
            <td class="c3"></td>
          </tr>
          <tr>
            <td class="c1"> Block Reward : </td>
            <td class="c2"> 0.3452678 ETH </td>
            <td class="c3"></td>
          </tr>
          <tr>
            <td class="c1"> Transaction Fee : </td>
            <td class="c2"> 0.1243524 ETH </td>
            <td class="c3"></td>
          </tr>
          <tr>
            <td class="c1"> Hash : </td>
            <td class="c2"> {{ hash }} </td>
            <td class="c3"
              ><button class="copy"
                ><Icon icon="ion:copy" @click="copyHash" class="copyicon" /><div
                  class="visiblecopy"
                >
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
  cursor: pointer;
  background-color: rgb(10 10 10);
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
  font-size: 38px !important;
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
