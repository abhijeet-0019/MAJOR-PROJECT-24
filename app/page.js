'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router=useRouter();

  useEffect(() => {
    const storedUserType = sessionStorage.getItem("userType");
    if(storedUserType === "admin"){
      router.push('/admin/dashboard');
    }else if(storedUserType === "applicant"){
      router.push('/client/drives');
    }else{
      router.push('/signin');
    }
  }, []);

  return (
    <>
    <h1>Welcome to TPO Portal @ MBM University</h1>
    </>
  );
}
