import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (request: NextRequest) => {
    if (request.nextUrl.pathname.startsWith('/api')) {
        const authHeader = request.headers.get('Authorization')
        if (!authHeader) {
            return NextResponse.json(
                { success: false, message:  'Unauthorized: Missing or invalid Authorization header' },
                { status: 401 }
            )
        }
    }

    return NextResponse.next()
}   

export const config = {
    matcher: '/api/:path*',
}