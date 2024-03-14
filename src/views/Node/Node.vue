<template>
  <div class="nodePageContainer" v-if="nodeDetails">
    <div class="title"> Node </div>
    <div class="container1">
      <div class="box1">
        <div class="text">STATUS</div>
        <div class="icon-container">
          <div class="insidetext">{{ getNodeProperty('status') || 'N/A' }}</div>
          <div style="opacity: 0.2">
            <Icon icon="ic:outline-not-started" :size="200" color="black" />
          </div>
        </div>
      </div>
      <div class="box2">
        <div class="text">PEERS</div>
        <div class="icon-container">
          <div class="insidenum">{{ getNodeProperty('peers') || 'N/A' }}</div>
          <div style="opacity: 0.2">
            <Icon icon="heroicons:user-group-16-solid" :size="200" color="black" />
          </div>
        </div>
      </div>
      <div class="box3">
        <div class="text">BLOCKS</div>
        <div class="icon-container">
          <div class="insidenum">{{ getNodeProperty('blocks') || 'N/A' }}</div>
          <div style="opacity: 0.2">
            <Icon icon="clarity:block-line" :size="200" color="black" />
          </div>
        </div>
      </div>
      <div class="box4">
        <div class="text">QUEUED</div>
        <div class="icon-container">
          <div class="insidenum">{{ getNodeProperty('queued') || 0 }}</div>
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
            <td class="detail">{{ getNodeProperty('client') || 'N/A' }}</td>
          </tr>
          <tr>
            <td> NODE ID : </td>
            <td class="detail">{{ getNodeProperty('node_id') || 'N/A' }}</td>
          </tr>
          <tr>
            <td>NODE NAME :</td>
            <td class="detail">{{ getNodeProperty('node_name') || 'N/A' }}</td>
          </tr>
          <tr>
            <td>ENODE :</td>
            <td class="detail">{{ getNodeProperty('enode') || 'N/A' }}</td>
          </tr>
          <tr>
            <td>RPC :</td>
            <td class="detail">{{ getNodeProperty('rpc_url') || 'N/A' }}</td>
          </tr>
          <tr>
            <td>LOCAL HOST :</td>
            <td class="detail">{{ getNodeProperty('local_host') || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else> Loading node details... </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref, onUnmounted } from 'vue'
import { getNodeListApi } from '@/api/node'

interface NodeDetails {
  message: string
  output: {
    status: string
    peers: number
    blocks: number
    queued: number
    client: string
    node_id: string
    node_name: string
    enode: string
    rpc_url: string
    local_host: string
  }[]
}

//const nodeDetails: Ref<NodeDetails | null> = ref(null)

// Fetch node details from the backend API
// const fetchNodeDetails = async (node_id) => {
//   try {
//     const response = await axios.get(`https://intanexplorer.azurewebsites.net/api/nodes/${node_id}`)
//     console.log('API Response:', response.data)
//     nodeDetails.value = response.data.output

//     console.log('Fetched node details:', nodeDetails.value)
//   } catch (error) {
//     console.error('Error fetching node details:', error)
//     // Handle error here
//   }
// }

// // Fetch node details when component is mounted
// onMounted(() => {
//   console.log('Component is mounted')

//   // Replace '12345' with the actual node ID you want to fetch
//   fetchNodeDetails('5434e8b0e535a556cefc02499d1f2948adddeb7567c1cdd21319dda845f0c126')
// })

// Fetch list of nodes from the backend API
const nodeDetails: Ref<NodeDetails | null> = ref(null)
const selectedNodeId: Ref<string | null> = ref(null)
const selectedIndex: Ref<number | null> = ref(0)
let intervalId

// const fetchNodeDetails = async () => {
//   console.log('Fetching details for node:', selectedNodeId.value)
//   if (!selectedNodeId.value || selectedIndex.value === null) {
//     console.warn('Selected node ID or index is null')
//     return
//   }

//   try {
//     const data = await getNodeDetailApi({ selectedNodeId: selectedNodeId.value })
//     console.log('Node details response:', data)
//     nodeDetails.value = { message: data.message, output: data.output }
//     console.log('Updated node details:', nodeDetails.value)
//   } catch (error) {
//     console.error('Error fetching node details:', error)
//     // Handle error here
//   }
// }

const fetchNodeIds = async () => {
  try {
    const data = await getNodeListApi()

    // Handle different response structures
    if (data.output && Array.isArray(data.output)) {
      nodeDetails.value = data
      selectedNodeId.value = null // Set selectedNodeId to null initially
    } else {
      console.error('Unexpected response structure:', data)
    }
  } catch (error) {
    console.error('Error fetching node IDs:', error)
    // Handle error here
  }
}
const getNodeProperty = (property: string) => {
  if (!nodeDetails.value || selectedIndex.value === null) {
    return null
  }
  const selectedNode = nodeDetails.value.output[selectedIndex.value]
  return selectedNode ? selectedNode[property] : null
}

onMounted(() => {
  const fetchDataInterval = 5000

  fetchNodeIds()

  intervalId = setInterval(() => {
    fetchNodeIds() // Fetch data every 10 seconds
  }, fetchDataInterval)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
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
