const { NextResponse } = require('next/server');
const jwt = require('jsonwebtoken');
export async function  middleware(request) {
    try {
        // return NextResponse.redirect(new URL('/', request.nextUrl));
          const path = request.nextUrl.pathname;
          const isPublicPath = path === '/sign';
          const token = request.cookies.get('accessToken')?.value || '';
          // console.log(token)
          if (!isPublicPath && !token  ) {
            return NextResponse.redirect(new URL('/sign', request.nextUrl));
          }
          let decodedToken;
          decodedToken = jwt.decode(token);
          const isAdmin=decodedToken.admin_access
          const isApplicant=decodedToken.app_access
          
          if(isPublicPath && token){
            const defaultPage=isAdmin?'/admin/dashboard':'/client/drives'
            return NextResponse.redirect(new URL(defaultPage, request.nextUrl));
          }
          //client cant access admin side
          if (isApplicant && path.startsWith('/admin')) {
            // alert("Admin side access is not allowed");
            return NextResponse.redirect(new URL('/signin', request.nextUrl));
          }
          if (isAdmin && path.startsWith('/client')) {
            // alert("Client side access is not allowed");
            return NextResponse.redirect(new URL('/signin', request.nextUrl));
          }

    } catch (error) {
        // console.log("Error", error);
    }
}

export const config = {
    matcher: [
      '/',
      '/signin',
      '/client/:path*',
      '/admin/:path*'
    ]
};