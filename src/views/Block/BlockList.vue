<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const temp = ref([
  { id: 1, a: 'a' },
  { id: 2, a: 'a' },
  { id: 3, a: 'a' },
  { id: 4, a: 'a' },
  { id: 5, a: 'a' },
  { id: 6, a: 'a' },
  { id: 7, a: 'a' },
  { id: 8, a: 'a' },
  { id: 9, a: 'a' },
  { id: 10, a: 'a' }
])
</script>

<template>
  <div class="body">
    <div class="container">
      <div class="title">
        <Icon icon="dashicons:money-alt" class="bigMoneyIcon" /><h2>Block Overview</h2>
      </div>

      <div class="scrollable-container">
        <div class="blockContainer">
          <Icon icon="bxs:left-arrow" class="blockarrow left-arrow" />
          <div class="block-scroll">
            <div class="block">
              <div class="rectangle-container">
                <div class="rectangle"
                  ><div style="height: 40px" class="overlapping-rectangle"></div
                ></div>
                <div class="blockno">
                  <p>#18374445</p>
                </div>
              </div>
              <Icon icon="bi:link" class="link" />
              <div class="rectangle-container">
                <div class="drectangle"
                  ><div style="height: 63px" class="overlapping-rectangle"></div
                ></div>
                <div class="blockno">
                  <p>#18374444</p>
                </div>
              </div>

              <Icon icon="bi:link" class="link" />
              <div class="rectangle-container">
                <div class="drectangle"
                  ><div style="height: 60px" class="overlapping-rectangle"></div
                ></div>
                <div class="blockno">
                  <p>#18374443</p>
                </div>
              </div>

              <Icon icon="bi:link" class="link" />
              <div class="rectangle-container">
                <div class="drectangle"
                  ><div style="height: 55px" class="overlapping-rectangle"></div
                ></div>
                <div class="blockno">
                  <p>#18374442</p>
                </div>
              </div>

              <Icon icon="bi:link" class="link" />
              <div class="rectangle-container">
                <div class="drectangle"
                  ><div style="height: 40px" class="overlapping-rectangle"></div
                ></div>
                <div class="blockno">
                  <p>#18374441</p>
                </div>
              </div>

              <Icon icon="bi:link" class="link" />
              <div class="rectangle-container">
                <div class="drectangle"
                  ><div style="height: 38px" class="overlapping-rectangle"></div
                ></div>
                <div class="blockno">
                  <p>#18374440</p>
                </div>
              </div>

              <Icon icon="bi:link" class="link" />
              <div class="rectangle-container">
                <div class="drectangle"
                  ><div style="height: 45px" class="overlapping-rectangle"></div
                ></div>
                <div class="blockno">
                  <p>#18374439</p>
                </div>
              </div>

              <Icon icon="bi:link" class="link" />
              <div class="rectangle-container">
                <div class="drectangle"
                  ><div style="height: 38px" class="overlapping-rectangle"></div
                ></div>
                <div class="blockno">
                  <p>#18374438</p>
                </div>
              </div>

              <Icon icon="bi:link" class="link" />
              <div class="rectangle-container">
                <div class="drectangle"
                  ><div style="height: 33px" class="overlapping-rectangle"></div
                ></div>
                <div class="blockno">
                  <p>#18374437</p>
                </div>
              </div>
            </div>
          </div>

          <Icon icon="bxs:right-arrow" class="blockarrow right-arrow" />
        </div>
      </div>

      <div class="scrollable-table">
        <div class="Seccontainer">
          <div class="tableContainer">
            <div class="header">
              <div class="headerTitle">Block</div>
              <div class="headerTitle1">Hash</div>
              <div class="headerTitle2">Time</div>
              <div class="headerTitle3">Txs</div>
              <div class="headerTitle4">Txs Summary</div>
              <div class="headerTitle5">Age</div>
            </div>

            <div class="list">
              <div class="item" v-for="v in temp" :key="v.id">
                <div style="display: flex; align-items: center">
                  <p>18374438</p>
                </div>
                <div>
                  <span>0x0d4dde84447bdd54....</span>
                </div>
                <div>
                  <p>2023-10-18 21:52:59</p>
                </div>
                <div>
                  <p>35</p>
                </div>
                <div class="txs">
                  <div class="txs-item">Transfers 26</div>
                  <div class="txs-item"> App calls 6</div>
                  <div class="txs-item">set config 4</div>
                </div>

                <div class="time"> 11 secs ago </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination-container">
        <div class="pagination">
          <button class="pagination-item">First Page</button>
          <Icon icon="iconamoon:arrow-left-2" class="arrow" />
          <p class="number">1</p>
          <Icon icon="iconamoon:arrow-right-2-bold" class="arrow" />
          <button class="pagination-item">Last Page</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 90%;
  height: auto;
  overflow-x: auto; /* Add this property */
}

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

.block {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: fit-content;
}

.left-arrow {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1000;
  transform: translateY(-50%);
}

.right-arrow {
  position: absolute;
  top: 50%;
  right: 0;
  z-index: 1000;
  transform: translateY(-50%);
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

.bigMoneyIcon {
  font-size: 38px;
  color: #fff;
}

.link {
  margin-top: 30px;
}

.blockarrow {
  margin: 25px 15px 0;
  font-size: 25px;
}

.blockno p {
  margin: 0 14px;
  text-align: center; /* Center text */
}

.header {
  display: flex;
  padding: 10px 15px;
  background-color: #d9d9d9;
  border-radius: 10px 10px 0 0;
  justify-content: space-between;
  align-items: flex-end;
}

.headerTitle {
  padding-left: 2px;
  font-weight: 600;
  color: black;
  flex-basis: 50px;
}

.headerTitle1 {
  font-weight: 600;
  color: black;
  flex-basis: 140px;
}

.headerTitle2 {
  font-weight: 600;
  color: black;
  flex-basis: 110px;
}

.headerTitle3 {
  font-weight: 600;
  color: black;
  flex-basis: 50px;
}

.headerTitle4 {
  font-weight: 600;
  color: black;
  flex-basis: 190px;
}

.headerTitle5 {
  padding-right: 58px;
  font-weight: 600;
  color: black;
}

.Seccontainer {
  display: flex;
  gap: 20px;
  min-width: 880px;
}

.scrollable-container {
  max-width: 100%;
  overflow-x: auto;
  justify-content: center;
}

.blockContainer {
  position: relative;
  display: flex;
  min-width: 100%; /* Ensure the container takes up the full width */
  padding-right: 5%; /* Adjust padding for smaller screens */
  padding-left: 5%; /* Adjust padding for smaller screens */
  overflow-x: auto;
  box-sizing: border-box;
  align-items: center;
}

.block-scroll {
  flex: 1;
  overflow-x: auto;
}

.tableContainer {
  margin-top: 40px;
  overflow: auto;
  background-color: #282b2e;
  border-radius: 10px;
  flex: 1;
}

.scrollable-table {
  max-width: 100%;
  overflow-x: auto;
}

.list {
  min-width: 800px; /* Set a minimum width for the table content */
  padding-right: 20px;
}

.item {
  display: flex;
  padding: 2px 20px;
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

.txs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.txs-item {
  margin-right: 10px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 45px;
}

.pagination-item {
  width: 90px;
  height: 26px;
  margin: 0 5px;
  font-size: 13px;
  color: rgb(0 0 0);
  background-color: rgb(255 255 255 / 60%);
  border: 0;
  border-radius: 7px;
}

.arrow {
  width: 20px;
  height: 30px;
  margin: 0 10px;
  font-size: 0;
}

.number {
  width: 40px;
  height: 26px;
  margin: 0 5px;
  line-height: 25px;
  color: rgb(0 0 0);
  text-align: center;
  background-color: rgb(255 255 255 / 60%);
  border-radius: 5px;
}
</style>
