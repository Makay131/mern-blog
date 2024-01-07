"use client"
import { useAuth } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BlogEditor from "./blogEditor";
import PublishForm from "./publishForm";
import { EditorProvider, useEditor } from "@/contexts/EditorContext";

function Editor() {
    const router = useRouter();
    const {userAuth: { access_token }} = useAuth();
    const [editorState, setEditorState] = useState("editor");
    
    useEffect(() => {
        access_token === null ? router.push('/signin') : ""
    }, [access_token, router])
    
    return (
      <EditorProvider>
          {editorState === 'editor' ? <BlogEditor /> : <PublishForm />}
      </EditorProvider>
  )
}

export default Editor;