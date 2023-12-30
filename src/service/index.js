import { storeInSession } from "@/common/session";
import axios from "axios";
import toast from "react-hot-toast";

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