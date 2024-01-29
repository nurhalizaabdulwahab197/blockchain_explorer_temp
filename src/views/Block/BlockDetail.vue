<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="body">
    <div class="container">
      <div class="title">
        <Icon icon="dashicons:money-alt" class="bigMoneyIcon" /><h2>BLOCK 18374445</h2>
      </div>
      <div class="block">
        <Icon icon="bxs:left-arrow" class="blockarrow" />
        <div class="rectangle-container">
          <div class="rectangle"><div class="overlapping-rectangle"></div></div>
        </div>
        <Icon icon="bxs:right-arrow" class="blockarrow"
      /></div>
      <div class="blockinfo">
        <div class="totaltransaction">
          <h3>TOTAL TRANSACTION</h3>
          <p>20</p></div
        >
        <div class="blockheight">
          <h3>BLOCK HEIGHT</h3>
          <p>#18374444</p>
        </div>
        <div class="timestamp">
          <h3>TIMESTAMP</h3>
          <p>tdu, 19-10-2023 8:34:45 GMT</p>
        </div>
      </div>
      <div class="blockdetailtitle">
        <Icon icon="dashicons:money-alt" class="bigMoneyIcon" /><h2>BLOCK DETAILS</h2>
      </div>
      <div>
        <table>
          <tr>
            <td class="c1"> MINER /VALIDATOR: </td>
            <td class="c2"> 0x0d4dde84447bdd54861a88261f0a17e761be717d9faabfef1e01775df3e61d5d </td>
          </tr>
          <tr>
            <td class="c1"> TRANSACTIONS </td>
            <td class="c2"> 20 transactions and 15 contract internal transactions </td>
          </tr>
          <tr>
            <td class="c1"> SIZE: </td>
            <td class="c2"> 41,246 bytes </td>
          </tr>
          <tr>
            <td class="c1"> BLOCK REWARDS : </td>
            <td class="c2"> 0.3452678 Etd </td>
          </tr>
          <tr>
            <td class="c1"> TRANSACTION FEE : </td>
            <td class="c2"> 0.1243524 Etd </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blockinfo h3 {
  margin: 10px 0 0 15px;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: left;
}

.blockinfo p {
  font-family: Inter, sans-serif;
  font-size: 12px;
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
  height: 80px;
  margin: 0 20px;
  color: black;
  background: #d9d9d9;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%);
  flex: 1;
}

.bigMoneyIcon {
  font-size: 30px;
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
  width: 90%;
  height: 100vh;
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
  width: 100px;
  height: 100px;
  margin: 30px 20px;
  background-color: #d3d3d3;
  border-radius: 30px;
}

.overlapping-rectangle {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 40px;
  background: #158fff; /* Red color, you can change it */
  border-radius: 0 0 30px 30px;
}

.block {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  width: 30%;
  font-family: Inter, sans-serif;
}

.c2 {
  width: 70%;
  font-family: Inter, sans-serif;
}

table td {
  border-bottom: 1px solid #4a4a4a;
}

tr:last-child td {
  border-bottom: none !important;
}
</style>
