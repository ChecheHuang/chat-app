import { updateStart, updateSuccess, updateError } from './userSlice'
import axios from 'axios'
export const updateUser = async (url, data, dispatch) => {
  dispatch(updateStart())
  try {
    // const res = await axios.default.post(url, data)
    dispatch(updateSuccess(data))
  } catch (err) {
    dispatch(updateError())
  }
}
