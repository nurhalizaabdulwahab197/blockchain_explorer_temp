<template>
  <div class="bodycontent">
    <div class="title-container">
      <Icon icon="cib:ethereum" class="moneyicon" />
      <div class="title">Transaction Overview</div>
      <div class="iconbackbutton"><Icon icon="ion:chevron-back" /></div>
      <div class="iconnextbutton"><Icon icon="ion:chevron-forward" /></div>
    </div>
    <div class="firstrow-container">
      <div class="column-container">
        <div class="container-title">
          <div class="firstrowtitle">TRANSACTION ID</div>
          <button class="rowCopybutton">
            <Icon icon="iconamoon:copy-bold" />
            <div class="none">CLICK TO COPY</div>
          </button>
        </div>
        <div>{{ transactionId }}</div>
      </div>
      <div class="column-container">
        <div class="container-title firstrowtitle">TIMESTAMP</div>
        <div class="center">{{ timestamp }}</div>
      </div>
    </div>
    <div class="block-container">
      <div class="container-title">BLOCK</div>
      <div class="center">
        <div class="block">1837445</div>
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
            <a href="#/account/accountOverview/0x3Css" class="tablecontent">0x3Css</a>
            <button class="tableCopybutton">
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
          <td colspan="2" class="amount tablecontent">0.035 ETH</td>
        </tr>
        <tr>
          <td>
            <div class="tablesubtitle">
              <Icon icon="cib:ethereum" />
              <div>RECERIVER :</div>
            </div>
          </td>
          <td class="tablerow">
            <a href="#/account/accountOverview/0x3Css" class="tablecontent">0x3Css</a>
            <button class="tableCopybutton">
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
              <div class="tablecontent">0 ETH($0.00) </div>
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
            <div class="tablecontent"> 0.023123123 ETH ($0.63) </div>
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
              <div class="tablecontent">6.023123123 Gwei (0.000012321 ETH)</div>
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
        <div class="right-container">65,00 | 43221 (98%)</div>
      </div>
      <div class="moredetail-container">
        <div class="left-container">
          <Icon icon="cib:ethereum" />
          <div>Gas Fees:</div>
        </div>
        <div class="right-container">65,00 | 43221 (98%)</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const transactionId = ref('')
const route = useRoute()
const getCurrentTimestamp = () => {
  const date = new Date()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const formattedDate = `${days[date.getUTCDay()]}, ${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`
  const formattedTime = `${('0' + date.getUTCHours()).slice(-2)}:${('0' + date.getUTCMinutes()).slice(-2)}:${('0' + date.getUTCSeconds()).slice(-2)} GMT`

  return `${formattedDate} ${formattedTime}`
}
const timestamp = getCurrentTimestamp()

onMounted(() => {
  transactionId.value = route.params.id as string
})

watch(
  () => route.params.id,
  (newId) => {
    transactionId.value = newId as string
  }
)
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
</style>
