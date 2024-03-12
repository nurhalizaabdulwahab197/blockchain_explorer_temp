import request from '@/axios'

// `https://intanexplorer.azurewebsites.net/api/search/{params}`
export const getSearchResultApi = (params: { searchValue: string }) => {
  return request.get({ url: `/api/search/${params.searchValue}` })
}
