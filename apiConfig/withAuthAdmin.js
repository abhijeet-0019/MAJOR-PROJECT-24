import React from 'react';
import { useRouter } from 'next/router';
import useAPIAuth from './useAPIAuth';

export default function withAuthAdmin(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const { loginStatus } = useAPIAuth();

    React.useEffect(() => {
      const userType = sessionStorage.getItem('userType');
      if (!loginStatus || userType === 'applicant') {
        alert('invalid access')
        router.push('/');
      }
    }, [loginStatus, router]);

    return loginStatus ? <Component {...props} /> : null;
  };
}
