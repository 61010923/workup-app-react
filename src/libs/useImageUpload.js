import axios from 'axios'
import _get from 'lodash/get'

const useImageUpload = () => async (e) => {
  let data = ''
  try {
    const { files } = e.target
    const formData = new FormData()
    formData.append('image', files[0])
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/uploads`,
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

export default useImageUpload
