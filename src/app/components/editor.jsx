"use client"
import { useAuth } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BlogEditor from "./blogEditor";
import PublishForm from "./publishForm";

function Editor() {
    const [editorState, setEditorState] = useState("editor")

    const router = useRouter();
    const {userAuth: { access_token }} = useAuth();
    useEffect(() => {
        access_token === null ? router.push('/signin') : ""
    }, [access_token, router])
    return (
    editorState === 'editor' ? <BlogEditor /> : <PublishForm />
  )
}

export default Editor;