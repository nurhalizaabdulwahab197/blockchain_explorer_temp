<script>
import { Icon } from '@iconify/vue'
export default {
  data() {
    return {
      rectangleHeight: 50,
      blockHeight: '#18374444',
      hash: '0000eaa199dd8ac0f65d203aec421c7734a7771399159d1f8b404d2084e98238bf',
      miner: '0x0d4dde84447bdd54861a88261f0a17e761be717d9faabfef1e01775df3e61d5d',
      showToast: false
    }
  },
  methods: {
    copyBlockHeight() {
      const heightValue = document.createElement('input')
      heightValue.value = this.blockHeight
      document.body.appendChild(heightValue)
      heightValue.select()
      heightValue.setSelectionRange(0, 99999) // For mobile devices
      document.execCommand('copy')
      document.body.removeChild(heightValue)
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 6000)
      this.copyMessageTitle = 'Block Height copied'
      this.copyMessage = 'The block height was copied to the clipboard'
    },
    copyHash() {
      const hashinput = document.createElement('input')
      hashinput.value = this.hash
      document.body.appendChild(hashinput)
      hashinput.select()
      hashinput.setSelectionRange(0, 99999) // For mobile devices
      document.execCommand('copy')
      document.body.removeChild(hashinput)
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 6000)
      this.copyMessageTitle = 'Hash copied'
      this.copyMessage = 'The address was copied to the clipboard'
    },
    copyMiner() {
      const miner = document.createElement('input')
      miner.value = this.miner
      document.body.appendChild(miner)
      miner.select()
      miner.setSelectionRange(0, 99999) // For mobile devices
      document.execCommand('copy')
      document.body.removeChild(miner)
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 6000)
      this.copyMessageTitle = 'Miner Message copied'
      this.copyMessage = 'The address was copied to the clipboard'
    }
  }
}
</script>

<template>
  <div class="body">
    <div class="container">
      <div v-if="showToast" class="alertbox">
        <div class="bardesign"></div
        ><div class="copymessage"
          ><div class="copymessagetitle"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
              style="margin-right: 6px"
            >
              <path
                fill="#1f51ff"
                d="M.41 13.41L6 19l1.41-1.42L1.83 12m20.41-6.42L11.66 16.17L7.5 12l-1.43 1.41L11.66 19l12-12M18 7l-1.41-1.42l-6.35 6.35l1.42 1.41z"
              /></svg
            >{{ copyMessageTitle }} </div
          >{{ copyMessage }}</div
        >
      </div>
      <div class="title">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 56 56">
          <path
            fill="currentColor"
            d="M28 4c13.255 0 24 10.745 24 24S41.255 52 28 52S4 41.255 4 28S14.745 4 28 4m0 4C16.954 8 8 16.954 8 28s8.954 20 20 20s20-8.954 20-20S39.046 8 28 8m.573 6.286v2.687c3.976.319 6.855 2.704 6.982 6.314h-3.308c-.207-2.004-1.638-3.165-3.674-3.419V26.5l.764.19c4.183.971 6.473 2.689 6.473 6.076c0 3.897-3.181 6.107-7.237 6.394v2.671h-1.797V39.16c-4.04-.303-7.236-2.577-7.347-6.394h3.292c.286 1.861 1.495 3.229 4.055 3.5V29.33l-.652-.16c-4.04-.937-6.218-2.75-6.218-5.979c0-3.563 2.862-5.916 6.87-6.219v-2.687zm0 15.458v6.537c2.72-.207 3.865-1.495 3.865-3.197c0-1.638-.89-2.608-3.865-3.34m-1.797-9.876c-2.29.286-3.499 1.606-3.499 3.054c0 1.447.955 2.512 3.5 3.149z"
          /></svg
        ><h2>Block 18374445</h2>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 56 56">
          <path
            fill="currentColor"
            d="M28 4c13.255 0 24 10.745 24 24S41.255 52 28 52S4 41.255 4 28S14.745 4 28 4m0 4C16.954 8 8 16.954 8 28s8.954 20 20 20s20-8.954 20-20S39.046 8 28 8m.573 6.286v2.687c3.976.319 6.855 2.704 6.982 6.314h-3.308c-.207-2.004-1.638-3.165-3.674-3.419V26.5l.764.19c4.183.971 6.473 2.689 6.473 6.076c0 3.897-3.181 6.107-7.237 6.394v2.671h-1.797V39.16c-4.04-.303-7.236-2.577-7.347-6.394h3.292c.286 1.861 1.495 3.229 4.055 3.5V29.33l-.652-.16c-4.04-.937-6.218-2.75-6.218-5.979c0-3.563 2.862-5.916 6.87-6.219v-2.687zm0 15.458v6.537c2.72-.207 3.865-1.495 3.865-3.197c0-1.638-.89-2.608-3.865-3.34m-1.797-9.876c-2.29.286-3.499 1.606-3.499 3.054c0 1.447.955 2.512 3.5 3.149z"
          /></svg
        ><h2>Block Details</h2>
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
  font-family: Inter, sans-serif;
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
  margin: 10px 0 0 15px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
}

.blockinfo p {
  font-family: Inter, sans-serif;
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
}

.totaltransaction,
.blockheight,
.timestamp {
  width: 30%;
  height: 80px;
  margin: 0 20px;
  color: black;
  background: #d9d9d9;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%);
}

.bigMoneyIcon {
  font-size: 30px !important;
  color: #fff;
}

.title h2 {
  margin: 0 0 0 25px;
  font-family: Nunito, sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #fff;
}

.blockdetailtitle h2 {
  margin: 0 0 0 25px;
  font-family: Nunito, sans-serif;
  font-size: 25px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #fff;
}

.body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: relative;
  width: 90%;
}

.title {
  display: flex;
  flex-direction: row;
}

.blockdetailtitle {
  display: flex;
  margin-top: 30px;
  margin-bottom: 20px;
  flex-direction: row;
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
  font-family: Inter, sans-serif;
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
  font-family: Inter, sans-serif;
}

.c2 {
  width: 65%;
  font-family: Inter, sans-serif;
}

.c3 {
  width: 15%;
  font-family: Inter, sans-serif;
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
    font-family: Inter, sans-serif;
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
    font-family: Inter, sans-serif;
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
