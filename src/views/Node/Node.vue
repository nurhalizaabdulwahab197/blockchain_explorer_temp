<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
</script>

<template>
  <ContentWrap>
    <div class="title">
      Node
      <select>
        <option value="option1">Node 1</option>
        <option value="option2">Node 2</option>
        <option value="option3">Node 3</option>
      </select>
    </div>
    <div class="container1">
      <div class="box1">
        <div class="text">STATUS</div>
      </div>
      <div class="box2">
        <div class="text">PEERS</div>
      </div>
      <div class="box3">
        <div class="text">BLOCKS</div>
      </div>
      <div class="box4">
        <div class="text">QUEUED</div>
      </div>
    </div>

    <div class="container1">
      <table class="table">
        <tbody>
          <tr>
            <td class="text1">CLIENT :</td>
          </tr>
          <tr>
            <td class="text1">NODE ID :</td>
          </tr>
          <tr>
            <td class="text1">NODE NAME :</td>
          </tr>
          <tr>
            <td class="text1">ENODE :</td>
          </tr>
          <tr>
            <td class="text1">RPC URL :</td>
          </tr>
          <tr>
            <td class="text1">LOCAL HOST :</td>
          </tr>
        </tbody>
      </table>
    </div>
  </ContentWrap>
</template>

<style scoped>
.title {
  display: flex;
  margin: 0 10px 30px;
  font-size: 30px;
  justify-content: space-between;
}

.container1 {
  display: flex;
}

.box1 {
  padding-bottom: 150px;
  margin: 10px;
  background-color: #d9d9d9;
  border: 1px solid #ccc;
  border-radius: 10px;
  flex: 1;
}

.box2 {
  padding-bottom: 150px;
  margin: 10px 10px 10px 100px;
  background-color: #d9d9d9;
  border: 1px solid #ccc;
  border-radius: 10px;
  flex: 1;
}

.box3 {
  padding-bottom: 150px;
  margin: 10px 10px 10px 100px;
  background-color: #d9d9d9;
  border: 1px solid #ccc;
  border-radius: 10px;
  flex: 1;
}

.box4 {
  padding-bottom: 150px;
  margin: 10px 10px 10px 100px;
  background-color: #d9d9d9;
  border: 1px solid #ccc;
  border-radius: 10px;
  flex: 1;
}

.text {
  padding-top: 10px;
  color: black;
  text-align: center;
}

.table {
  width: 100%;
  margin: 20px 10px 10px;
  background-color: #282b2e;
  border-collapse: collapse;
}

td {
  padding: 8px;
  text-align: left;
  border: 1px solid #4a4a4a;
}

.text1 {
  padding-left: 20px;
}
</style>
