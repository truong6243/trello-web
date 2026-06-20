import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
// Board API
export const fecthBoardDetailsAPI = async (boardId) => {
  const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return res.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const res = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return res.data
}

// Column API
export const createNewColumnAPI = async (columnData) => {
  const res = await axios.post(`${API_ROOT}/v1/columns`, columnData)
  return res.data
}

// Card API
export const createNewCardAPI = async (cardData) => {
  const res = await axios.post(`${API_ROOT}/v1/cards`, cardData)
  return res.data
}

