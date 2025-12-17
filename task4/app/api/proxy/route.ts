import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return handleRequest(request, 'GET')
}

export async function POST(request: NextRequest) {
  return handleRequest(request, 'POST')
}

export async function PUT(request: NextRequest) {
  return handleRequest(request, 'PUT')
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, 'DELETE')
}

async function handleRequest(request: NextRequest, method: string) {
  try {
    const { searchParams } = new URL(request.url)
    const targetUrl = searchParams.get('url')

    if (!targetUrl) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      )
    }

    const body = method !== 'GET' ? await request.text() : undefined

    // Get headers from the request
    const headers: Record<string, string> = {}
    request.headers.forEach((value, key) => {
      if (
        !key.startsWith('host') &&
        !key.startsWith('x-') &&
        key !== 'content-length'
      ) {
        headers[key] = value
      }
    })

    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
    })

    const responseText = await response.text()
    let responseData

    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = responseText
    }

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      data: responseData,
      headers: Object.fromEntries(response.headers.entries()),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
