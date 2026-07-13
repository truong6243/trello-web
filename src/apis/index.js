import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
// Board API
// export const fecthBoardDetailsAPI = async (boardId) => {
//   const res = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return res.data
// }

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const res = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return res.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const res = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updateData
  )
  return res.data
}

// Column API
export const createNewColumnAPI = async (columnData) => {
  const res = await authorizeAxiosInstance.post(`${API_ROOT}/v1/columns`, columnData)
  return res.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const res = await authorizeAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return res.data
}

export const deleteColumnDetailsAPI = async (columnId) => {
  const res = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return res.data
}

// Card API
export const createNewCardAPI = async (cardData) => {
  const res = await authorizeAxiosInstance.post(`${API_ROOT}/v1/cards`, cardData)
  return res.data
}
