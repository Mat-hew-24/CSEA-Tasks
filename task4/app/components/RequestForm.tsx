'use client'

import { useRef, useState } from 'react'
import { sendRequest } from '../../utils/client.js'

export default function RequestForm() {
  const controllerRef = useRef<AbortController | null>(null)

  const [url, setUrl] = useState('')
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET')
  const [body, setBody] = useState('')
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    setLoading(true)
    controllerRef.current = new AbortController()

    let parsedBody = null
    if (body.trim()) {
      try {
        parsedBody = JSON.parse(body)
      } catch (err) {
        alert('Invalid JSON body')
        setLoading(false)
        return
      }
    }

    const result = await sendRequest({
      url,
      method,
      headers: { 'Content-Type': 'application/json' },
      body: parsedBody,
      signal: controllerRef.current.signal,
    })

    setResponse(result)
    setLoading(false)
  }

  const handleCancel = () => {
    controllerRef.current?.abort()
    setLoading(false)
  }

  return (
    <div className='space-y-4 p-4'>
      <input
        className='border p-2 w-full'
        placeholder='https://api.example.com/users'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <select
        className='border p-2'
        value={method}
        onChange={(e) => setMethod(e.target.value as any)}
      >
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>

      {method !== 'GET' && (
        <textarea
          className='border p-2 w-full h-32'
          placeholder='JSON body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      )}

      <div className='flex gap-2'>
        <button
          className='bg-blue-500 text-white px-4 py-2'
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>

        <button
          className='bg-red-500 text-white px-4 py-2'
          onClick={handleCancel}
          disabled={!loading}
        >
          Cancel
        </button>
      </div>

      {response && (
        <div className='mt-4 border p-2 bg-gray-50'>
          <p>
            <strong>Status:</strong> {response.status}
          </p>
          <p>
            <strong>Time:</strong> {response.time}
          </p>
          <pre className='overflow-auto'>
            {JSON.stringify(response.data || response.error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
