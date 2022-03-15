import axios from 'axios'
import _get from 'lodash/get'

const usePdfUpload = () => async (e) => {
  let data = ''
  const test = e[0]
  try {
    const formData = new FormData()
    formData.append('file', test)
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/uploads/pdf`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    if (response.status === 200) {
      data = _get(response, 'data.file.src')
    }
  } catch (error) {
    console.log(error)
  }
  return data
}

export default usePdfUpload
