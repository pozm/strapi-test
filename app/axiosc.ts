import axios from "axios";

export let AxiosClient = axios.create({
    headers: {
        "Authorization":"Bearer " + process.env.STRAPI_TOKEN as string,
        // Host:"strcms.aixeria.com",
        Accept:"*/*"
    },
})