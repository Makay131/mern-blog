import Image from "next/image"
import AnimationWrapper from "./animationWrapper"

function BlogEditor() {
  const handleBannerUpload = (e) => {
    let img = e.target.files[0];
    console.log(img)
  }

  return (
    <>
      <nav className="navbar">
        <span className="flex-none">
          <Image src="/logo.png" alt="site logo" width={10} height={10}/>
        </span>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          New Blog
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
                  <Image src="/blog-banner.png" alt="banner image" fill={true} />
                </div>
                <input type="file" id="uploadBanner" accept=".png, .jpg, .jpeg" hidden onChange={handleBannerUpload} />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  )
}

export default BlogEditor