"use server";
import { AxiosClient } from "@/app/axiosc";
import axios from "axios";

import { cookies } from "next/headers"
import crypto from "crypto"
import { EncryptCookie } from "./cookieSecret";

export async function Logout() {
    cookies().delete("a:u")
}

export async function SubmitLoginData(data :FormData) {
    let username = data.get("username");
    let password = data.get("password");
    let remember = data.get("remember");

    // confirm that the username and password only contains alphanumeric 
    // to prevent content injection or whatever

    let wd = /^\w+$/mi
    if (!wd.test(String(username)) || !wd.test(String(password))) {
        console.log("bad username or password")
        return;
    }
    let user = await AxiosClient.get(`${process.env.STRAPI_URL}/api/blog-users?filters[Username][$eq]=${username}&filters[Pass][$eq]=${password}`).then(res => res.data.data[0],err => null);
    
    // check that a user was found
    
    if (!user || !("id" in user)) {
        
        return;
    }

    // store the user id in the cookie
    let cookie_store = cookies();
    
    let enc_id = EncryptCookie(String(user.id))

    cookie_store.set("a:u",enc_id)


    return;
    
}