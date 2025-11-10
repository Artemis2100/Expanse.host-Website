"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ColocationPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to coming soon page
        router.push('/coming-soon');
    }, [router]);

    // Return null or a loading state while redirecting
    return null;
}
