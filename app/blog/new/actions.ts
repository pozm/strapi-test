"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserId } from "../auth/utils";

export async function SubmitData(data :FormData) {
    "use server";
    let userId = getUserId();
    if (!userId) {
        return;
    }

    let Title = data.get("title") as string;
    let Keywords = data.get("kew") as string;
    let Content = data.get("content") as string;
    let image = data.get("image") as File;

    let form = new FormData();
    form.append("files",image,image.name);

    const response = await axios.post('http://localhost:1337/api/upload', form, {
        headers:{"Authorization":"Bearer " + process.env.STRAPI_TOKEN as string}
    });

    console.log(response.data)

    let enhanceContent = await axios.post("http://localhost:3000/blog/new/api",{
        keywords:Keywords,
        jdaj:"82kjfakh29",
        content:Content
    });


    let resData = (await axios.post("http://localhost:1337/api/blog-posts",{
        data:{
            Title,
            Content : enhanceContent.data.content,
            Cover:response.data[0].id,
            blog_user: userId
        }},
        {headers:{
            "Authorization":"Bearer " + process.env.STRAPI_TOKEN as string,
            host:"127.0.0.1:1337",
            Accept:"*/*"
        }}
    )).data;
    try{
        
        revalidatePath("/blog")
    } catch(e) {}
    redirect(`/blog/${resData.data.id}`);
}
