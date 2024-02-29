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
    .then((response) => {
      if (response.data.output !== null) {
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
        router.push(`/account/accountOverview/${searchValue}`)
      } else if (!isSuccess.value) {
        // Handle case where all requests fail
        console.log('No data found for search value:', searchValue)
        router.push(`/error/searchNotFound`)
      }
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error)
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
