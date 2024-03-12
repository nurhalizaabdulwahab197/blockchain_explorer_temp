import request from '@/axios'

// `https://intanexplorer.azurewebsites.net/api/nodes/${selectedNodeId.value}`
export const getNodeDetailApi = (params: { selectedNodeId: string }) => {
  return request.get({ url: `/api/nodes/${params.selectedNodeId}` })
}

// 'https://intanexplorer.azurewebsites.net/api/nodes'
export const getNodeListApi = () => {
  return request.get({ url: '/api/nodes' })
}
