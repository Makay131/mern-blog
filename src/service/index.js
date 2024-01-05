import { storeInSession } from "@/common/session";
import axios from "axios";
import toast from "react-hot-toast";

import { Client, Storage } from "appwrite";

const client = new Client();

const storage = new Storage(client);

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) // Your project ID
;


export const userAuthThroughServer = async (route, formData) => {
    try {
        const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_DOMAIN + route, formData);
        if(res.status === 200) {
            storeInSession("user", JSON.stringify(res.data))
            return res.data;
        }
    } catch(err) {
        toast.error(err.response.data.error)
    }
}

export const uploadImage = async (file) => {
    const randomId = Math.random() * 100000;
    try {
        const res = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, randomId, file);
        const imageURL = `${process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${res.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
        return {...res, imageURL};
    } catch(err) {
        console.log(err)
    }
}