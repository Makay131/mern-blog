"use client";
import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

const initialBlogStructure = {
    title: '',
    banner: '',
    des: '',
    content: [],
    tags: [],
    author: { 
        personal_info: {}
    }
}

function EditorProvider({children}) {
    const [blog, setBlog] = useState(initialBlogStructure);

    return (<EditorContext.Provider value={{blog, setBlog }}>
        {children}
    </EditorContext.Provider>)
}

function useEditor() {
    const context = useContext(EditorContext);
    if(context === undefined) throw new Error("EditorContext was used outside of EditorProvider");
    return context;
}

export { EditorProvider, useEditor };