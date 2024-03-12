import request from '@/axios'

// `https://intanexplorer.azurewebsites.net/api/account/accountOverview/${addressFromUrl}`
export const getAccountOverview = (params: { accountAddress: string }) => {
  return request.get({ url: `/api/account/accountOverview/${params.accountAddress}` })
}
