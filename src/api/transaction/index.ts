import request from '@/axios'

//'https://intanexplorer.azurewebsites.net/api/transaction/latest'
export const getLatestTransactions = () => {
  return request.get({ url: '/api/transaction/latest' })
}

//`https://intanexplorer.azurewebsites.net/api/transaction/transactionlist/${pageNumber}`
export const getTransactionListApiWithPage = (params: { pageNumber: number }) => {
  return request.get({ url: `/api/transaction/transactionlist/${params.pageNumber}` })
}

// `https://intanexplorer.azurewebsites.net/api/transaction/${route.params.id}`
export const getTransactionDetailApi = (params: { id: string }) => {
  console.log('params', params)
  return request.get({ url: `/api/transaction/${params.id}` })
}

// '`https://intanexplorer.azurewebsites.net/api/transaction/next/${transactionId.value}`
export const getNextTransaction = (params: { transactionId: string }) => {
  return request.get({ url: `/api/transaction/next/${params.transactionId}` })
}

// `https://intanexplorer.azurewebsites.net/api/transaction/prev/${transactionId.value}`
export const getPrevTransaction = (params: { transactionId: string }) => {
  return request.get({ url: `/api/transaction/prev/${params.transactionId}` })
}

//'https://intanexplorer.azurewebsites.net/api/transaction/fetch/latestTransactionList'
export const getLatestTransactionList = () => {
  return request.get({ url: '/api/transaction/fetch/latestTransactionList' })
}

// 'https://intanexplorer.azurewebsites.net/api/transaction/latestThirtyDay/transactionNumber'
export const getLatestThirtyDayTransactionNumber = () => {
  return request.get({ url: '/api/transaction/latestThirtyDay/transactionNumber' })
}

// 'https://intanexplorer.azurewebsites.net/api/transaction'
export const getTransactionList = () => {
  return request.get({ url: '/api/transaction' })
}
