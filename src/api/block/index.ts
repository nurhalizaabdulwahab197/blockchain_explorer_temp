import request from '@/axios'

export const getLastSyncBlock = () => {
  return request.get({ url: '/api/block/getLastSyncBlock' })
}

export const getBlockDetailApi = (params: { blockNumber: number }) => {
  return request.get({ url: '/api/block/getBlockDetail', params })
}

// fetch(`https://intanexplorer.azurewebsites.net/api/block/blockListWithSkip/${skipCount.value}`)
export const getBlockListApiWithSkip = (params: { skipCount: number }) => {
  return request.get({ url: `/api/block/blockListWithSkip/${params.skipCount}` })
}

// fetch(`https://intanexplorer.azurewebsites.net/api/block/blockList/${pageNumber}`)
export const getBlockListApiWithPage = (params: { pageNumber: number }) => {
  return request.get({ url: `/api/block/blockList/${params.pageNumber}` })
}

export const getBlockByEndPoint = (params: { endPoint: string }) => {
  return request.get({ url: `/api${params.endPoint}` })
}

// 'https://intanexplorer.azurewebsites.net/api/block/latestBlockList'
export const getLatestBlockList = () => {
  return request.get({ url: '/api/block/latestBlockList' })
}
