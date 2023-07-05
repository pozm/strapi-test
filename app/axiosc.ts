import axios from "axios";

export let AxiosClient = axios.create({
    
    headers: {
        "Authorization":"Bearer " + process.env.STRAPI_TOKEN as string,
        host:"127.0.0.1:1337",
        Accept:"*/*"
    }
})