import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Log the received data
    console.log('Received data:', body)

    // You can process the data here
    // For now, just echo it back with a success message
    return NextResponse.json({
      success: true,
      message: 'Data received successfully',
      data: body,
    })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing data',
      },
      { status: 500 }
    )
  }
}
