"use server";
import { AxiosClient } from "@/app/axiosc";
import axios from "axios";

import { cookies } from "next/headers"
import crypto from "crypto"
import { EncryptCookie } from "./cookieSecret";



export async function SubmitLoginData(data :FormData) {
    let username = data.get("username");
    let password = data.get("password");
    let remember = data.get("remember");

    
    let wd = /\w+/gmi
    
    if (!String(username).match(wd) || !String(password).match(wd)) {
        console.log("bad username or password")
        return;
    }
    let user = await AxiosClient.get(`http://localhost:1337/api/blog-users?filters[Username][$eq]=${username}&filters[Pass][$eq]=${password}`).then(res => res.data.data[0],err => null);
    
    console.log(user);
    
    if (!user && !("id" in user)) {
        
        return;
    }
    let cookie_store = cookies();
    
    let enc_id = EncryptCookie(String(user.id))

    cookie_store.set("a:u",enc_id)

    console.log("logged in")

    return;
    
}