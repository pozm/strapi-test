import { SubmitData } from "./actions";
import { getUserId } from "../auth/utils";
import { notFound } from "next/navigation";

export default function NewBlogPost() {

    if (!getUserId()) {
        return notFound()
    }


    return <div className="flex mx-auto p-20 flex-col">
        <div className="w-fit mx-auto bg-neutral-800 border-2 shadow-xl border-neutral-600 rounded-xl p-3 flex flex-col" >
            <h1 className="text-3xl" >New Blog Post</h1>
            <form action={SubmitData} className="flex flex-col w-[42rem] px-4">
                <label htmlFor="title" >Blog Title</label>
                <input required className="text-white border border-neutral-500 appearance-none outline-none focus:ring-1 hover:ring-1 hover:ring-fuchsia-600 focus:ring-fuchsia-700 rounded-lg bg-neutral-700 px-3 py-2" id="title" name="title"  type="text" />
                <label htmlFor="content" >Blog Content</label>
                <textarea required className="text-white border border-neutral-500 appearance-none outline-none focus:ring-1 hover:ring-1 hover:ring-fuchsia-600 focus:ring-fuchsia-700 rounded-lg bg-neutral-700 px-3 py-2" id="content" name="content" />
                <label htmlFor="image" >Image</label>
                <input required className="text-white border border-neutral-500 appearance-none outline-none focus:ring-1 hover:ring-1 hover:ring-fuchsia-600 focus:ring-fuchsia-700 rounded-lg bg-neutral-700 file:border-0 file:py-2 file:px-3 file:cursor-pointer file:mr-3 file:bg-fuchsia-600 file:text-white file:transition-colors file:hover:text-black file:hover:bg-fuchsia-400 " id="image" name="image"  type="file" />
                <label htmlFor="kew" >Keywords for SEO</label>
                <input required className="text-white border border-neutral-500 appearance-none outline-none focus:ring-1 hover:ring-1 hover:ring-fuchsia-600 focus:ring-fuchsia-700 rounded-lg bg-neutral-700 px-3 py-2" id="kew" name="kew"  type="text" />

                {/* <button formAction={GenPreview} className="block max-w-fit px-3 py-2 bg-teal-600 rounded-lg mt-4 hover:bg-teal-500 transition-colors" >Preview</button> */}
                <button type="submit"  className="block max-w-fit px-3 py-2 bg-fuchsia-600 rounded-lg mt-4 hover:bg-fuchsia-500 transition-colors" >Submit</button>

            </form>


        </div>

        {/* {previewSrc&&<div className="bg-neutral-800 border-2 border-neutral-600 rounded-xl mt-4" >
            <MDXRemote {...previewSrc}  />
        </div>} */}

    </div>
}