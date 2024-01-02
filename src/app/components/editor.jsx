"use client"
import { useAuth } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Editor() {
    const router = useRouter();
    const {userAuth: { access_token }} = useAuth();
    useEffect(() => {
        access_token === null ? router.push('/signin') : ""
    }, [access_token, router])
    return (
    <div>editor</div>
  )
}

export default Editor;