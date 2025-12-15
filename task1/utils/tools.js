import axios from 'axios'

class Utils {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
    })
  }
  postData(endpoint, payload) {
    return this.client.post(endpoint, payload)
  }
  fetchData(endpoint) {
    return this.client.get(endpoint)
  }
  putData(endpoint, payload) {
    return this.client.put(endpoint, payload)
  }
  deleteData(endpoint) {
    return this.client.delete(endpoint)
  }
}

export default Utils
