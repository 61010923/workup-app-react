import axios from 'axios'
import _get from 'lodash/get'

const usePdfUpload = () => async (e) => {
  let data = ''
  // const myArr = e.map((x) => x)
  // console.log(myArr)
  const test = e[0]
  console.log(test)
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
      data = _get(response, 'data.image.src')
    }
  } catch (error) {
    console.log(error)
  }
  return data
}

export default usePdfUpload
