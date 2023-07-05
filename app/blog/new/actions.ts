"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserId } from "../auth/utils";
import { AxiosClient } from "@/app/axiosc";

export async function SubmitData(data :FormData) {
    "use server";

    // ensure logged in

    let userId = getUserId();
    if (!userId) {
        return;
    }



    let Title = data.get("title") as string;
    let Keywords = data.get("kew") as string;
    let Content = data.get("content") as string;
    let image = data.get("image") as File;

    // upload image to strapi

    let form = new FormData();
    form.append("files",image,image.name);


    const response = await AxiosClient.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, form);

    // send content to open ai

    let enhanceContent = await axios.post(`http://localhost:3000/blog/new/api`,{
        keywords:Keywords,
        jdaj:process.env.OPENAIK,
        content:Content
    });

    // upload all data and make a post in strapi

    let resData = (await AxiosClient.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-posts`,{
        data:{
            Title,
            Content : enhanceContent.data.content,
            Cover:response.data[0].id,
            blog_user: userId
        }}
    )).data;

    // revalidate data

    try{
        
        revalidatePath("/blog")
    } catch(e) {}
    redirect(`/blog/${resData.data.id}`);
}
