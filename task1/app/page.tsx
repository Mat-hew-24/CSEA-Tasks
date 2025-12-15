import Image from 'next/image'

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-900 text-white p-4'>
      <div className='max-w-4xl mx-auto space-y-6'>
        <h1 className='text-2xl font-bold text-center mb-8'>Text Processor</h1>

        <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-2'>
          <div className='space-y-4'>
            <label className='block text-sm font-medium text-gray-300'>
              Input
            </label>
            <textarea
              className='w-full h-64 p-4 bg-gray-800 border border-emerald-600 rounded-lg resize-none '
              placeholder='Enter your text here...'
            />
            <button className='w-full bg-blue-600 cursor-pointer hover:bg-blue-800 px-6 py-3 rounded-lg font-medium transition-transform duration-150 active:scale-105'>
              Submit
            </button>
          </div>

          <div className='space-y-4'>
            <label className='block text-sm font-medium text-gray-300'>
              Output
            </label>
            <textarea
              className='w-full h-64 p-4 bg-gray-800 border border-emerald-600 rounded-lg resize-none'
              placeholder='Output will appear here...'
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  )
}
