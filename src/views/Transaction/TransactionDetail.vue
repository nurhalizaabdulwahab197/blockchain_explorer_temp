<template>
  <div class="bodycontent">
    <div class="title-container">
      <span class="dashicons--money-alt"></span>
      <div class="title">TRANSACTION OVERVIEW</div>
      <div class="iconbackbutton"><span class="material-symbols--navigate-back"></span></div>
      <div class="iconnextbutton"><span class="material-symbols--navigate-next"></span></div>
    </div>
    <div class="firstrow-container">
      <div class="column-container">
        <div class="container-title">
          <div class="firstrowtitle">TRANSACTION ID</div>
          <button class="rowCopybutton">
            <span class="iconamoon--copy-bold"></span>
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
              <span class="dashicons--money-alt"></span>
              <div>TRANSACTION DETAILS</div>
            </div>
          </th>
        </tr>
        <tr>
          <td>
            <div class="tablesubtitle">
              <div class="center">
                <span class="dashicons--money-alt2"></span>
              </div>
              <div>SENDER : </div>
            </div>
          </td>
          <td class="tablerow">
            <a href="" class="tablecontent">0x3Css</a>
            <button class="tableCopybutton">
              <span class="iconamoon--copy-bold"></span>
              <div class="none">CLICK TO COPY</div>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div class="tablesubtitle">
              <div class="center">
                <span class="dashicons--money-alt2"></span>
              </div>
              <div>AMOUNT :</div>
            </div>
          </td>
          <td colspan="2" class="amount tablecontent">0.035 ETH</td>
        </tr>
        <tr>
          <td>
            <div class="tablesubtitle">
              <div class="center">
                <span class="dashicons--money-alt2"></span>
              </div>
              <div>RECERIVER :</div>
            </div>
          </td>
          <td class="tablerow">
            <a href="" class="tablecontent">0x3Css</a>
            <button class="tableCopybutton">
              <span class="iconamoon--copy-bold"></span>
              <div class="none">CLICK TO COPY</div>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <div class="tablesubtitle">
              <div class="center">
                <span class="dashicons--money-alt2"></span>
              </div>
              <div>VALUE :</div>
            </div>
          </td>
          <td>
            <div class="alligncenter">
              <span class="ri--eth-fill"></span>
              <div class="tablecontent">0 ETH($0.00) </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="tablesubtitle">
              <div class="center">
                <span class="dashicons--money-alt2"></span>
              </div>
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
              <div class="center">
                <span class="dashicons--money-alt2"></span>
              </div>
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
        <span class="dashicons--money-alt"></span>
        <div class="title">MORE DETAILS</div>
        <div></div>
      </div>
      <div class="moredetail-container">
        <div class="left-container">
          <div class="center">
            <span class="dashicons--money-alt2"></span>
          </div>
          <div>Gas Limit & Usage by Txn:</div>
        </div>
        <div class="right-container">65,00 | 43221 (98%)</div>
      </div>
      <div class="moredetail-container">
        <div class="left-container">
          <div class="center">
            <span class="dashicons--money-alt2"></span>
          </div>
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
  margin: 1.5rem 3.5rem;
}

.alligncenter {
  display: flex;
  align-items: center;
  gap: 0.2rem;
}

.ri--eth-fill {
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 0L4.63 12.22L12 16.574l7.37-4.354zm0 24L4.63 13.617L12 18l7.37-4.383z'/%3E%3C/svg%3E");

  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: currentcolor;
  mask-image: var(--svg);
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
}

.tablesubtitle {
  display: flex;
  padding-left: 1.5rem;
  margin: 0;
  gap: 0.2rem;
  justify-content: left;
  align-items: center;
}

.iconnextbutton {
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  background-color: rgb(217 217 217 / 30%);
  border-radius: 50%;
  justify-content: center;
  align-items: center;
}

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

.iconamoon--copy-bold {
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5'%3E%3Cpath d='M16 3H4v13'/%3E%3Cpath d='M8 7h12v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z'/%3E%3C/g%3E%3C/svg%3E");

  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: currentcolor;
  mask-image: var(--svg);
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
}

.material-symbols--navigate-back {
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z'/%3E%3C/svg%3E");

  display: inline-block;
  width: 1.8rem;
  height: 1.8rem;
  padding-right: 0.2rem;
  background-color: currentcolor;
  transform: rotate(180deg);
  mask-image: var(--svg);
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
}

.material-symbols--navigate-next {
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z'/%3E%3C/svg%3E");

  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: currentcolor;
  mask-image: var(--svg);
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
}

.dashicons--money-alt {
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23000' d='M10.6 9c-.4-.1-.8-.3-1.1-.6c-.3-.1-.4-.4-.4-.6c0-.2.1-.5.3-.6c.3-.2.6-.4.9-.3c.6 0 1.1.3 1.4.7l.9-1.2c-.3-.3-.6-.5-.9-.7c-.3-.2-.7-.3-1.1-.3V4H9.4v1.4c-.5.1-1 .4-1.4.8c-.4.5-.7 1.1-.6 1.7c0 .6.2 1.2.6 1.6c.5.5 1.2.8 1.8 1.1c.3.1.7.3 1 .5c.2.2.3.5.3.8c0 .3-.1.6-.3.9c-.3.3-.7.4-1 .4c-.4 0-.9-.1-1.2-.4c-.3-.2-.6-.5-.8-.8l-1 1.1c.3.4.6.7 1 1c.5.3 1.1.6 1.7.6V16h1.1v-1.5c.6-.1 1.1-.4 1.5-.8c.5-.5.8-1.3.8-2c0-.6-.2-1.3-.7-1.7c-.5-.5-1-.8-1.6-1M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8m0 14.9c-3.8 0-6.9-3.1-6.9-6.9S6.2 3.1 10 3.1s6.9 3.1 6.9 6.9s-3.1 6.9-6.9 6.9'/%3E%3C/svg%3E");

  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: currentcolor;
  mask-image: var(--svg);
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
}

.dashicons--money-alt2 {
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23000' d='M10.6 9c-.4-.1-.8-.3-1.1-.6c-.3-.1-.4-.4-.4-.6c0-.2.1-.5.3-.6c.3-.2.6-.4.9-.3c.6 0 1.1.3 1.4.7l.9-1.2c-.3-.3-.6-.5-.9-.7c-.3-.2-.7-.3-1.1-.3V4H9.4v1.4c-.5.1-1 .4-1.4.8c-.4.5-.7 1.1-.6 1.7c0 .6.2 1.2.6 1.6c.5.5 1.2.8 1.8 1.1c.3.1.7.3 1 .5c.2.2.3.5.3.8c0 .3-.1.6-.3.9c-.3.3-.7.4-1 .4c-.4 0-.9-.1-1.2-.4c-.3-.2-.6-.5-.8-.8l-1 1.1c.3.4.6.7 1 1c.5.3 1.1.6 1.7.6V16h1.1v-1.5c.6-.1 1.1-.4 1.5-.8c.5-.5.8-1.3.8-2c0-.6-.2-1.3-.7-1.7c-.5-.5-1-.8-1.6-1M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8m0 14.9c-3.8 0-6.9-3.1-6.9-6.9S6.2 3.1 10 3.1s6.9 3.1 6.9 6.9s-3.1 6.9-6.9 6.9'/%3E%3C/svg%3E");

  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-color: currentcolor;
  mask-image: var(--svg);
  mask-repeat: no-repeat;
  mask-size: 100% 100%;
}

a {
  color: rgb(44 44 255);
  text-decoration: none;
}

.rowCopybutton {
  display: flex;
  padding: 0.2rem 1.5rem;
  font-size: 0.7rem;
  color: rgb(163 163 163);
  background-color: transparent;
  border: 0.1rem solid rgb(163 163 163);
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.rowCopybutton:hover {
  color: rgb(90 90 90);
  cursor: pointer;
  border: 0.1rem solid rgb(90 90 90);
}

.tableCopybutton {
  display: flex;
  padding: 0.2rem 1.5rem;
  font-size: 0.7rem;
  color: rgb(90 90 90);
  background-color: transparent;
  border: 0.1rem solid rgb(90 90 90);
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
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

  .dashicons--money-alt {
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23000' d='M10.6 9c-.4-.1-.8-.3-1.1-.6c-.3-.1-.4-.4-.4-.6c0-.2.1-.5.3-.6c.3-.2.6-.4.9-.3c.6 0 1.1.3 1.4.7l.9-1.2c-.3-.3-.6-.5-.9-.7c-.3-.2-.7-.3-1.1-.3V4H9.4v1.4c-.5.1-1 .4-1.4.8c-.4.5-.7 1.1-.6 1.7c0 .6.2 1.2.6 1.6c.5.5 1.2.8 1.8 1.1c.3.1.7.3 1 .5c.2.2.3.5.3.8c0 .3-.1.6-.3.9c-.3.3-.7.4-1 .4c-.4 0-.9-.1-1.2-.4c-.3-.2-.6-.5-.8-.8l-1 1.1c.3.4.6.7 1 1c.5.3 1.1.6 1.7.6V16h1.1v-1.5c.6-.1 1.1-.4 1.5-.8c.5-.5.8-1.3.8-2c0-.6-.2-1.3-.7-1.7c-.5-.5-1-.8-1.6-1M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8m0 14.9c-3.8 0-6.9-3.1-6.9-6.9S6.2 3.1 10 3.1s6.9 3.1 6.9 6.9s-3.1 6.9-6.9 6.9'/%3E%3C/svg%3E");

    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    background-color: currentcolor;
    mask-image: var(--svg);
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
  }

  .iconnextbutton {
    display: flex;
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 0.3rem;
    background-color: rgb(217 217 217 / 30%);
    border-radius: 50%;
    justify-content: center;
    align-items: center;
  }

  .iconbackbutton {
    display: flex;
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 0.3rem;
    background-color: rgb(217 217 217 / 30%);
    border-radius: 50%;
    justify-content: center;
    align-items: center;
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

  .column-container {
    display: grid;
    width: 100%;
    padding: 0.8rem 1rem;
    color: black;
    background-color: rgb(200 200 200);
    border-radius: 0.3rem;
    row-gap: 1rem;
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
