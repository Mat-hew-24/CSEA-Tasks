import axios from 'axios'

function Time() {
  return performance.now()
}

export async function sendRequest({ url, method, headers, body, signal }) {
  const start = Time()

  try {
    // Use the proxy route to avoid CORS issues
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`

    const response = await axios({
      url: proxyUrl,
      method,
      headers,
      data: body ? JSON.stringify(body) : undefined,
      signal,
    })

    const time = Time() - start

    return {
      status: response.data.status || response.status,
      time: `${time.toFixed(2)} ms`,
      data: response.data.data || response.data,
    }
  } catch (error) {
    const time = Time() - start
    if (error.name === 'CanceledError') {
      return {
        status: 'CANCELLED',
        time: `${time.toFixed(2)} ms`,
        error: 'Request cancelled by user',
      }
    }
    return {
      status:
        error.response?.data?.status ||
        error.response?.status ||
        'NETWORK ERROR',
      time: `${time.toFixed(2)} ms`,
      error: error.response?.data?.error || error.message,
    }
  }
}
