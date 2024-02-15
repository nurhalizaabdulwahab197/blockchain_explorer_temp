<!-- <script setup lang="ts">

</script> -->

<template>
  <div class="nodePageContainer">
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
        <div class="icon-container">
          <div class="insidetext">RUNNING</div>
          <div style="opacity: 0.2">
            <Icon icon="ic:outline-not-started" :size="200" color="black" />
          </div>
        </div>
      </div>
      <div class="box2">
        <div class="text">PEERS</div>
        <div class="icon-container">
          <div class="insidenum">3</div>
          <div style="opacity: 0.2">
            <Icon icon="heroicons:user-group-16-solid" :size="200" color="black" />
          </div>
        </div>
      </div>
      <div class="box3">
        <div class="text">BLOCKS</div>
        <div class="icon-container">
          <div class="insidenum">9</div>
          <div style="opacity: 0.2">
            <Icon icon="clarity:block-line" :size="200" color="black" />
          </div>
        </div>
      </div>
      <div class="box4">
        <div class="text">QUEUED</div>
        <div class="icon-container">
          <div class="insidenum">0</div>
          <div style="opacity: 0.2">
            <Icon icon="mdi:human-queue" :size="200" color="black" />
          </div>
        </div>
      </div>
    </div>

    <div class="container2">
      <table class="table">
        <tbody>
          <tr>
            <td> CLIENT : </td>
            <td class="detail"> GETH </td>
          </tr>
          <tr>
            <td> NODE ID : </td>
            <td class="detail"> 0x2a7eb7a22d8d0a53f08e1828b5a299dd8132b996 </td>
          </tr>
          <tr>
            <td>NODE NAME :</td>
            <td class="detail"> GETHv21.5.1-RC1/window-x64_32openjdk-java-11 </td>
          </tr>
          <tr>
            <td>ENODE :</td>
            <td class="detail">
              4e48b2d3487b0673b3aae3c3f7e480b5744ac66a24c48aa41e17cf20e86c31c6f3d5a4899dfdbb394e312be4513ae4aa81c55a22969945cf9bd544a775647b25
            </td>
          </tr>
          <tr>
            <td>RPC :</td>
            <td class="detail"> https://geth-node-1-0-geth-node-1.cluster.local:2456 </td>
          </tr>
          <tr>
            <td>LOCAL HOST :</td>
            <td class="detail"> 192.168.1.242 </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>


/* Media query for mobile styles */
@media (width <=768px) {
  .text1 {
    font-size: 12px;
  }

  .insidetext {
    font-size: 30px;
  }

  .insidenum {
    font-size: 45px;
  }
}

.nodePageContainer {
  width: 90%;
  margin: auto;
}

.title {
  display: flex;
  margin: 0 10px 10px;
  font-size: 25px;
  justify-content: space-between;
}

.container1 {
  display: flex;
  flex-flow: row wrap;
}

.container2 {
  display: flex;
  overflow-x: auto;
}

.box1,
.box2,
.box3,
.box4 {
  display: flex;
  padding-bottom: 10px;
  margin: 10px;
  background-color: #d9d9d9;
  border: 1px solid #ccc;
  border-radius: 10px;
  flex: 1;
  flex-direction: column;
  align-items: center;
}

.text {
  padding-top: 10px;
  color: black;
  text-align: center;
}

.table {
  width: 100%;
  margin: 20px 10px 10px;
  border-collapse: collapse;
}

td {
  padding: 8px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid #4a4a4a;
}

.icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.insidetext {
  position: absolute;
  font-size: 40px;
  color: black;
}

.insidenum {
  position: absolute;
  font-size: 60px;
  color: black;
}
</style>
