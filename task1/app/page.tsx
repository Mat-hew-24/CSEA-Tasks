'use client'

import Utils from '../utils/tools.js'
import { useState } from 'react'

const requests = new Utils('http://localhost:5000') // Backend server port

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  const handleSubmit = async () => {
    try {
      const schema = JSON.parse(inputText) //this is actually a JS object (input text is JSON)
      const response = await requests.postData('/api/data', schema)
      console.log(response.data.receivedData)
      setOutputText(JSON.stringify(response.data.receivedData, null, 2))
    } catch (error) {
      console.error('Error:', error)
      setOutputText(
        'Error occurred while submitting data. Make sure your input is valid JSON.'
      )
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white p-4'>
      <div className='max-w-4xl mx-auto space-y-6'>
        <h1 className='text-2xl font-bold text-center mb-8'>
          Fake Data Generator
        </h1>

        <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-2'>
          <div className='space-y-4'>
            <label className='block text-sm font-medium text-gray-300'>
              Input (JSON schema)
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className='w-full h-64 p-4 bg-gray-800 border border-white/20 rounded-lg resize-none'
              placeholder={`Example JSON:\n{\n  "id": "uuid",\n  "name": "name",\n  "email": "email"\n}`}
            />
            <button
              className='w-full bg-blue-600 cursor-pointer hover:bg-blue-800 px-6 py-3 rounded-lg font-medium transition-transform duration-150 active:scale-105'
              onClick={handleSubmit}
            >
              Generate
            </button>
          </div>

          <div className='space-y-4'>
            <label className='block text-sm font-medium text-gray-300'>
              Output
            </label>
            <textarea
              value={outputText}
              className='w-full h-64 p-4 bg-gray-800 border border-white/20 rounded-lg resize-none'
              placeholder='Generated data will appear here...'
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  )
}
