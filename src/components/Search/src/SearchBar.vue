<script setup lang="tsx">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import router from '@/router'

const searchVal = ref('')
const isSuccess = ref(false)

const submitForm = () => {
  const searchValue = searchVal.value
  isSuccess.value = false
  console.log('Form submitted with input:', searchValue)

  axios
    .get(`http://localhost:8080/api/block/number/${searchValue}`)
    .catch((error) => {
      console.log(error)
      return null // Proceed to the next link
    })
    .then((response) => {
      if (response && response.data.output !== null) {
        isSuccess.value = true
        router.push(`/blockchain/blockList/blockdetail/${searchValue}`)
      } else {
        return axios.get(`http://localhost:8080/api/block/hash/${searchValue}`).catch((error) => {
          console.log(error)
          return null // Proceed to the next link
        })
      }
    })
    .then((response) => {
      if (isSuccess.value) {
        return null
      }
      if (response && response.data.output !== null) {
        isSuccess.value = true
        router.push(`/blockchain/blockList/blockdetail/${searchValue}`)
      } else {
        return axios.get(`http://localhost:8080/api/transaction/${searchValue}`).catch((error) => {
          console.log(error)
          return null // Proceed to the next link
        })
      }
    })
    .then((response) => {
      if (isSuccess.value) {
        return null
      }
      if (response && response.data.output !== null) {
        isSuccess.value = true
        router.push(`/blockchain/transactionList/transactionDetail/${searchValue}`)
      } else {
        return axios
          .get(`http://localhost:8080/api/account/accountOverview/${searchValue}`)
          .catch((error) => {
            console.log(error)
            return null // Proceed to the next link
          })
      }
    })
    .then((response) => {
      if (isSuccess.value) {
        return null
      }
      if (response && response.data.balance !== null) {
        isSuccess.value = true
        const account = response.data.data[0]
        console.log(account)
        if (account.senderAddress === searchValue) {
          router.push(`/account/accountOverview/${searchValue}`)
        } else if (account.receiverAddress !== 'null') {
          if (account.input === '0x') {
            router.push(`/account/accountOverview/${searchValue}`)
          } else {
            if (account.contractAddress === 'null') {
              router.push(`/contract/contractOverview/${searchValue}`)
            } else {
              router.push(`/account/accountOverview/${searchValue}`)
            }
          }
        } else {
          router.push(`/contract/contractOverview/${searchValue}`)
        }
      } else if (!isSuccess.value) {
        console.log('No data found for search value:', searchValue)
        router.push(`/error/searchNotFound`)
      }
    })
    .catch((error) => {
      console.error('Error:', error)
      console.log('No data found for search value:', searchValue)
      router.push(`/error/searchNotFound`)
    })
}
</script>

<template>
  <form class="searchBar" @submit.prevent="submitForm">
    <Icon icon="ion:search-outline" class="searchIcon" />
    <input
      type="search"
      class="searchBarInput"
      v-model="searchVal"
      placeholder="Search for Block number/Block hash/Transaction hash/Address"
    />
    <button type="submit" v-show="false"></button>
  </form>
</template>

<style scoped>
[type='search']::-webkit-search-cancel-button {
  width: 10px;
  height: 10px;
  cursor: pointer;
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjEyMy4wNXB4IiBoZWlnaHQ9IjEyMy4wNXB4IiB2aWV3Qm94PSIwIDAgMTIzLjA1IDEyMy4wNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIzLjA1IDEyMy4wNTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTEyMS4zMjUsMTAuOTI1bC04LjUtOC4zOTljLTIuMy0yLjMtNi4xLTIuMy04LjUsMGwtNDIuNCw0Mi4zOTlMMTguNzI2LDEuNzI2Yy0yLjMwMS0yLjMwMS02LjEwMS0yLjMwMS04LjUsMGwtOC41LDguNQ0KCQljLTIuMzAxLDIuMy0yLjMwMSw2LjEsMCw4LjVsNDMuMSw0My4xbC00Mi4zLDQyLjVjLTIuMywyLjMtMi4zLDYuMSwwLDguNWw4LjUsOC41YzIuMywyLjMsNi4xLDIuMyw4LjUsMGw0Mi4zOTktNDIuNGw0Mi40LDQyLjQNCgkJYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=');
  background-size: 10px 10px;
  appearance: none;
}

.searchBar {
  position: relative;
  display: flex;
  width: 90%;
}

.searchBarInput {
  width: 100%;
  padding: 8px 10px 8px 35px;
  color: black;
  background-color: #d9d9d9;
  border: none;
  border-radius: 20px;
}

.searchIcon {
  position: absolute;
  top: 7px;
  left: 8px;
  color: black;
}

input:focus {
  outline: none;
}

@media screen and (width < 768px) {
  .searchBar {
    width: fit-content;
    padding: 0;
    margin-right: 15px;
    color: white;
    background-color: transparent;
  }

  .searchIcon {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
  }

  .searchBarInput {
    z-index: 5;
    width: 16px;
    padding: 0;
    background-color: transparent;
  }

  .searchBarInput::placeholder {
    color: transparent;
  }

  .searchBarInput:focus {
    width: 250px;
    padding: 8px 10px;
    color: black;
    background-color: #d9d9d9;
    border: none;
    transition: all 0.3s ease;
  }

  .searchBarInput:focus::placeholder {
    color: gray;
  }
}
</style>
