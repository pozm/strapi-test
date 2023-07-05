import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Metadata } from "next";
import { AxiosClient } from "@/app/axiosc";

const components = {
    h1: (props : any) => <h2 {...props} className="text-4xl" >
        {props.children}
    </h2>,
}


export async function generateMetadata({params} : {params : {post_id:string}}) : Promise<Metadata> {
    // make sure the param is only a number
    if (!/^\d+$/gmi.test(params.post_id)) {
        return {
            title:"Invalid post id",
        }
    }

    // fetch the blog post data from strapi




    let blog = await AxiosClient.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-posts/${params.post_id}?populate=Cover`)
        .then(res => res.data,c=>console.log(c));

    return {
        title:blog.data.attributes.Title,
        description:blog.data.attributes.Content.slice(0,100)+"...",
        openGraph:{
            title:blog.data.attributes.Title,
            description:blog.data.attributes.Content.slice(0,100)+"...",
            images:[
                {
                    url:blog.data.attributes.Cover?.data?.attributes?.url,
                    width:blog.data.attributes.Cover?.data?.attributes?.width,
                    height:blog.data.attributes.Cover?.data?.attributes?.height,
                    alt:blog.data.attributes.Cover?.data?.attributes?.name
                }
            ]
        }
    }
}

export default async function BlogPost({params} : {params : {post_id:string}}) {

    // validate that the post_id is a number

    if (!/^\d+$/gmi.test(params.post_id)) {
        return notFound()
    }

    // fetch the blog post data from strapi




    let blog = await AxiosClient.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-posts/${params.post_id}?populate[blog_user][populate]=avatar&populate=Cover`)
        .then(res => res.data,c=>console.log(c));

    
    
    if (!blog?.data) {
        return notFound();
    }


    let user = blog.data.attributes?.blog_user?.data
    let user_pic = user ?(process.env.NEXT_PUBLIC_STRAPI_URL + user.attributes.avatar.data.attributes.url) : undefined

    // render the blog post




    return <div className="p-4" >

        <h1 className="text-5xl text-white">{blog.data.attributes.Title}</h1>
        {user && <div className="flex flex-row items-center" >
            <h2 className="text-2xl mr-3" >✨Posted by {user.attributes.Username} </h2>
            {user_pic && <img className="rounded-full object-cover aspect-square"  width={40} height={40} src={user_pic} />}
        </div>}
        <MDXRemote components={components} options={{
            mdxOptions:{

            }
        }} source={blog.data.attributes.Content} />

        <img src={process.env.NEXT_PUBLIC_STRAPI_URL + blog.data.attributes?.Cover?.data?.attributes?.url } />
    </div>
}