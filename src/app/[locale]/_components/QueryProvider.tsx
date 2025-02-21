"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        router.push('/ru/sigin'); 
    } 
}, []);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
