'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router=useRouter();

  useEffect(() => {
    router.push('/sign');
  }, []);

  return (
    <>
    <h1>Welcome to TPO Portal @ MBM University</h1>
    </>
  );
}
