const { NextResponse } = require('next/server');
const jwt = require('jsonwebtoken');

export async function  middleware(request) {
    try {
        // return NextResponse.redirect(new URL('/', request.nextUrl));
          const path = request.nextUrl.pathname;
          const isPublicPath = path === '/signin';
          const token = request.cookies.get('accessToken')?.value || '';
          // console.log(token)
          // console.log("-------------")
          if (!isPublicPath && !token  ) {
            return NextResponse.redirect(new URL('/signin', request.nextUrl));
          }
          let decodedToken;
          decodedToken = jwt.decode(token);

        //   const isAdmin=decodedToken.admin_access
        //   const isApplicant=decodedToken.app_access
          const isAdmin = decodedToken.role === '558f7465-54e1-494b-928a-30079d7b6cca'?true:false;
          const isApplicant = decodedToken.role != '558f7465-54e1-494b-928a-30079d7b6cca'?true:false;
          // console.log("is admin -", isAdmin);
          // console.log("is applicant - ", isApplicant);
          // consolg.log("jwt token - ", token);
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
