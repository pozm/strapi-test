import { cookies } from "next/headers";
import { DecryptCookie } from "./cookieSecret";
import { AxiosClient } from "@/app/axiosc";
export function getUserId() {
    let cookie_store = cookies();
    let enc = cookie_store.get("a:u")
    if (enc) {
        return DecryptCookie(enc.value)
    }
    return undefined
}

export function fetchUser(id:string) {
    return AxiosClient.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-users/${id}`).then(v=>v.data.data,c=>undefined)
}
export function fetchUserWithAvatar(id:string) {
    return AxiosClient.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blog-users/${id}?populate=avatar`).then(v=>v.data.data,c=>undefined)
}