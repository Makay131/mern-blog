"use client";
import Image from "next/image"
import AnimationWrapper from "./animationWrapper"
import { uploadImage } from "@/service";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useEditor } from "@/contexts/EditorContext";
import EditorJS from "@editorjs/editorjs";
import { tools } from "@/utils/editorTools";

function BlogEditor() {
  const {blog, blog: { title, banner, content, tags, des }, setBlog} = useEditor();

  useEffect(() => {
    let editor = new EditorJS({
      holder: "textEditor",
      data: '',
      tools: tools,
      placeholder: "Start to write a blog here..."
    })
  }, [])

  const handleBannerUpload = async (e) => {
    let img = e.target.files[0];
    if(img) {
      let loadingToast = toast.loading("Uploading...");
      try {
        const data = await uploadImage(img);
        if(data?.imageURL) {
          toast.dismiss(loadingToast);
          toast.success("Image successfully uploaded!");
          setBlog({...blog, banner: data.imageURL})
        }
      } catch(err) {
        toast.dismiss(loadingToast);
        return toast.error(err)
      }

    }
  }

  const handleTitleKeydown = (e) => {
    //enter key
    if(e.keyCode === 13) e.preventDefault();
  }

  const handleTitleChange = (e) => {
    let input = e.target;

    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';

    setBlog({...blog, title: input.value})

  }

  return (
    <>
      <nav className="navbar">
        <span className="flex-none">
          <Image src="/logo.png" alt="site logo" width={10} height={10}/>
        </span>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length ? title : "New Blog"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white border-4 border-grey hover:opacity-80">
              <label>
                <div className="z-20">
                  <Image src={banner || "/blog-banner.png"} alt="banner image" fill={true} />
                </div>
                <input type="file" id="uploadBanner" accept=".png, .jpg, .jpeg" hidden onChange={handleBannerUpload} />
              </label>
            </div>
            <textarea className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
            placeholder="Blog Title"
            onKeyDown={handleTitleKeydown} onChange={handleTitleChange}></textarea>
            <hr className="w-full opacity-10 my-5" />
            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  )
}

export default BlogEditor