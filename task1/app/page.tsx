'use client'

import Utils from '../utils/tools.js'
import { useState } from 'react'

const requests = new Utils('http://localhost:5000') // Backend server port

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  const clearAll = () => {
    setInputText('')
    setOutputText('')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
  }

  const loadExample = () => {
    const exampleSchema = {
      id: 'uuid',
      name: 'name',
      email: 'email',
      age: 'number',
      salary: 'float',
      isActive: 'boolean',
      phone: 'phone',
      avatar: 'image_url',
      website: 'file_url',
      joinDate: 'date',
      address: {
        type: 'object',
        schema: {
          street: 'string',
          city: 'string',
          zipCode: 'string',
        },
      },
      skills: {
        type: 'array',
        length: 3,
        items: 'string',
      },
      projects: {
        type: 'array',
        length: 2,
        items: {
          type: 'object',
          schema: {
            title: 'string',
            status: 'boolean',
            deadline: 'date',
          },
        },
      },
    }
    setInputText(JSON.stringify(exampleSchema, null, 2))
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-20'></div>

      <div className='relative z-10 px-4 py-8 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-12'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
            </div>
            <h1 className='text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4'>
              Fake Data Generator
            </h1>
            <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
              Generate realistic fake data from JSON schemas instantly. Perfect
              for testing, prototyping, and development.
            </p>
          </div>

          {/* Main Content */}
          <div className='grid gap-8 lg:grid-cols-2'>
            {/* Input Section */}
            <div className='space-y-6'>
              <div className='bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl'>
                <div className='flex items-center justify-between mb-6'>
                  <div>
                    <h2 className='text-2xl font-semibold text-white mb-2'>
                      JSON Schema Input
                    </h2>
                    <p className='text-slate-400'>
                      Define your data structure using our schema format
                    </p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30'>
                      <div className='w-2 h-2 bg-green-400 rounded-full mr-2 '></div>
                      Ready
                    </span>
                  </div>
                </div>

                <div className='space-y-4'>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className='w-full h-80 p-6 bg-slate-900/80 border border-slate-600/50 rounded-xl resize-none font-mono text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200'
                    placeholder={`Example JSON Schema:
{
  "id": "uuid",
  "name": "name",
  "email": "email",
  "age": "number",
  "salary": "float",
  "isActive": "boolean",
  "phone": "phone",
  "avatar": "image_url",
  "joinDate": "date",
  "address": {
    "type": "object",
    "schema": {
      "street": "string",
      "city": "string"
    }
  },
  "skills": {
    "type": "array",
    "length": 3,
    "items": "string"
  }
}`}
                  />

                  <div className='flex gap-3'>
                    <button
                      className='px-6 py-4 bg-emerald-600/80 hover:bg-emerald-600 text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 font-medium'
                      onClick={loadExample}
                      title='Load Example Schema'
                    >
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                        />
                      </svg>
                    </button>

                    <button
                      className={`flex-1 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                        isLoading
                          ? 'bg-slate-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                      }`}
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className='flex items-center justify-center'>
                          <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2'></div>
                          Generating...
                        </div>
                      ) : (
                        <div className='flex items-center justify-center'>
                          <svg
                            className='w-5 h-5 mr-2'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M13 10V3L4 14h7v7l9-11h-7z'
                            />
                          </svg>
                          Generate Data
                        </div>
                      )}
                    </button>

                    <button
                      className='px-6 py-4 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95'
                      onClick={clearAll}
                      title='Clear All'
                    >
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Schema Help */}
              <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 p-6'>
                <div className='flex items-center justify-between mb-3'>
                  <h3 className='text-lg font-semibold text-white'>
                    Available Schema Types
                  </h3>
                  <button
                    onClick={loadExample}
                    className='text-sm text-emerald-400 hover:text-emerald-300 transition-colors'
                  >
                    Load Example →
                  </button>
                </div>
                <div className='grid grid-cols-2 gap-3 text-sm'>
                  <div className='space-y-2'>
                    <div className='flex items-center text-slate-300'>
                      <span className='inline-block w-2 h-2 bg-blue-400 rounded-full mr-2'></span>
                      <code className='text-blue-300'>&quot;uuid&quot;</code> -
                      Unique ID
                    </div>
                    <div className='flex items-center text-slate-300'>
                      <span className='inline-block w-2 h-2 bg-green-400 rounded-full mr-2'></span>
                      <code className='text-green-300'>&quot;name&quot;</code> -
                      Full name
                    </div>
                    <div className='flex items-center text-slate-300'>
                      <span className='inline-block w-2 h-2 bg-purple-400 rounded-full mr-2'></span>
                      <code className='text-purple-300'>&quot;email&quot;</code>{' '}
                      - Email address
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex items-center text-slate-300'>
                      <span className='inline-block w-2 h-2 bg-yellow-400 rounded-full mr-2'></span>
                      <code className='text-yellow-300'>
                        &quot;number&quot;
                      </code>{' '}
                      - Random number
                    </div>
                    <div className='flex items-center text-slate-300'>
                      <span className='inline-block w-2 h-2 bg-pink-400 rounded-full mr-2'></span>
                      <code className='text-pink-300'>&quot;address&quot;</code>{' '}
                      - Street address
                    </div>
                    <div className='flex items-center text-slate-300'>
                      <span className='inline-block w-2 h-2 bg-cyan-400 rounded-full mr-2'></span>
                      <code className='text-cyan-300'>&quot;city&quot;</code> -
                      City name
                    </div>
                  </div>
                </div>

                <div className='mt-4 pt-4 border-t border-slate-600/30'>
                  <h4 className='text-sm font-semibold text-slate-300 mb-2'>
                    Complex Types
                  </h4>
                  <div className='space-y-1 text-xs text-slate-400'>
                    <div>
                      <code className='text-slate-300'>
                        &quot;type&quot;: &quot;object&quot;
                      </code>{' '}
                      - Nested object with schema
                    </div>
                    <div>
                      <code className='text-slate-300'>
                        &quot;type&quot;: &quot;array&quot;
                      </code>{' '}
                      - Array of items with length
                    </div>
                    <div>
                      <code className='text-slate-300'>
                        &quot;length&quot;: 3
                      </code>{' '}
                      - Array length (optional, default random 1-5)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className='space-y-6'>
              <div className='bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl'>
                <div className='flex items-center justify-between mb-6'>
                  <div>
                    <h2 className='text-2xl font-semibold text-white mb-2'>
                      Generated Output
                    </h2>
                    <p className='text-slate-400'>
                      Your generated fake data will appear here
                    </p>
                  </div>
                  <div className='flex items-center space-x-2'>
                    {outputText && (
                      <button
                        className='px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-sm'
                        onClick={copyToClipboard}
                        title='Copy to Clipboard'
                      >
                        <svg
                          className='w-4 h-4'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <div className='relative'>
                  <textarea
                    value={outputText}
                    className='w-full h-80 p-6 bg-slate-900/80 border border-slate-600/50 rounded-xl resize-none font-mono text-sm text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200'
                    placeholder='🎯 Generated data will appear here...&#10;&#10;💡 Pro tip: Use nested objects to create complex data structures!'
                    readOnly
                  />

                  {!outputText && (
                    <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                      <div className='text-center text-slate-500'>
                        <svg
                          className='w-12 h-12 mx-auto mb-3 opacity-30'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={1}
                            d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                          />
                        </svg>
                        <p className='text-sm'>
                          Waiting for data generation...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              {outputText && (
                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 p-4'>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-blue-400'>
                        <pre>{JSON.stringify(outputText).length}</pre>
                      </div>
                      <div className='text-sm text-slate-400'>Characters</div>
                    </div>
                  </div>
                  <div className='bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 p-4'>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-purple-400'>
                        {outputText.split('\n').length}
                      </div>
                      <div className='text-sm text-slate-400'>Lines</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
