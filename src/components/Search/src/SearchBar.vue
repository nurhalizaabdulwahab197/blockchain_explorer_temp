<script setup lang="tsx">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const searchVal = ref('')
// const searchBtnClick = ref(false)

// function toggleBtn() {
//   searchBtnClick.value = !searchBtnClick.value
//   console.log(searchBtnClick.value)
// }
</script>

<template>
  <form class="searchBar">
    <Icon icon="ion:search-outline" class="searchIcon" />
    <input
      type="search"
      class="searchBarInput"
      v-model="searchVal"
      placeholder="Search for transaction/Block/Txn Hash/Domain Name"
    />
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
  padding: 8px 10px 8px 25px;
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
