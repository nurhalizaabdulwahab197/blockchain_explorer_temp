<template>
  <div class="nodePageContainer" v-if="nodeDetails">
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
          <div class="insidetext">{{ nodeDetails.status || 'N/A' }}</div>
          <div style="opacity: 0.2">
            <Icon icon="ic:outline-not-started" :size="200" color="black" />
          </div>
        </div>
      </div>
      <div class="box2">
        <div class="text">PEERS</div>
        <div class="icon-container">
          <div class="insidenum">{{ nodeDetails.peers || 'N/A' }}</div>
          <div style="opacity: 0.2">
            <Icon icon="heroicons:user-group-16-solid" :size="200" color="black" />
          </div>
        </div>
      </div>
      <div class="box3">
        <div class="text">BLOCKS</div>
        <div class="icon-container">
          <div class="insidenum">{{ nodeDetails.blocks || 'N/A' }}</div>
          <div style="opacity: 0.2">
            <Icon icon="clarity:block-line" :size="200" color="black" />
          </div>
        </div>
      </div>
      <div class="box4">
        <div class="text">QUEUED</div>
        <div class="icon-container">
          <div class="insidenum">{{ nodeDetails.queued || 0 }}</div>
          <div style="opacity: 0.2">
            <Icon icon="mdi:human-queue" :size="200" color="black" />
          </div>
        </div>
      </div>
    </div>

    <div class="container2" v-if="nodeDetails">
      <table class="table">
        <tbody>
          <tr>
            <td> CLIENT : </td>
            <td class="detail">{{ nodeDetails.client || 'N/A' }}</td>
          </tr>
          <tr>
            <td> NODE ID : </td>
            <td class="detail">{{ nodeDetails.node_id || 'N/A' }}</td>
          </tr>
          <tr>
            <td>NODE NAME :</td>
            <td class="detail">{{ nodeDetails.node_name || 'N/A' }}</td>
          </tr>
          <tr>
            <td>ENODE :</td>
            <td class="detail">{{ nodeDetails.enode || 'N/A' }}</td>
          </tr>
          <tr>
            <td>RPC :</td>
            <td class="detail">{{ nodeDetails.rpc_url || 'N/A' }}</td>
          </tr>
          <tr>
            <td>LOCAL HOST :</td>
            <td class="detail">{{ nodeDetails.local_host || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else> Loading node details... </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, Ref } from 'vue'

interface NodeDetails {
  status: string
  peers: Number
  blocks: number
  queued: Number
  client: string
  node_id: string
  node_name: string
  enode: string
  rpc_url: string
  local_host: string
}

const nodeDetails: Ref<NodeDetails | null> = ref(null)

// Fetch node details from the backend API
const fetchNodeDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/nodes/${id}`)
    console.log('API Response:', response.data)
    nodeDetails.value = response.data

    console.log('Fetched node details:', nodeDetails.value)
  } catch (error) {
    console.error('Error fetching node details:', error)
    // Handle error here
  }
}

// Fetch node details when component is mounted
onMounted(() => {
  console.log('Component is mounted')

  // Replace '12345' with the actual node ID you want to fetch
  fetchNodeDetails('12345')
})
</script>

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
