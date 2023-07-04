import axios from "axios";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Metadata } from "next";

const components = {
    h1: (props : any) => <h2 {...props} className="text-4xl" >
        {props.children}
    </h2>,
}


export async function generateMetadata({params} : {params : {post_id:string}}) : Promise<Metadata> {
    if (!/^\d+$/gmi.test(params.post_id)) {
        return {
            title:"Invalid post id",
        }
    }

    // fetch the blog post data from strapi




    let blog = await axios.get(`http://127.0.0.1:1337/api/blog-posts/${params.post_id}?populate=Cover`,{
        headers:
        {
            "Authorization":"Bearer " + process.env.STRAPI_TOKEN as string,
            host:"127.0.0.1:1337",
            Accept:"*/*"
        },
          
    }).then(res => res.data,c=>console.log(c));

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




    let blog = await axios.get(`http://127.0.0.1:1337/api/blog-posts/${params.post_id}?populate=Cover`,{
        headers:
        {
            "Authorization":"Bearer " + process.env.STRAPI_TOKEN as string,
            host:"127.0.0.1:1337",
            Accept:"*/*"
        },
          
    }).then(res => res.data,c=>console.log(c));
    
    if (!blog?.data) {
        return notFound();
    }

    // render the blog post




    return <div className="p-4" >

        <h1 className="text-5xl text-white">{blog.data.attributes.Title}</h1>
        <MDXRemote components={components} options={{
            mdxOptions:{

            }
        }} source={blog.data.attributes.Content} />

        <img src={"http://127.0.0.1:1337" + blog.data.attributes?.Cover?.data?.attributes?.url } />
    </div>
}