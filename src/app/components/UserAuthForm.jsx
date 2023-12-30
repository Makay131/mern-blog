"use client";

import Link from "next/link";
import InputBox from "./inputBox";
import { FaGooglePlus } from "react-icons/fa";
import AnimationWrapper from "./animationWrapper";
import { useEffect, useRef } from "react";
import { passwordRegex, emailRegex } from "@/utils/variables";
import toast from "react-hot-toast";
import { userAuthThroughServer } from "@/service";
import { useAuth } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

function UserAuthForm({type}) {
    const authForm = useRef();

    const router = useRouter()

    const { userAuth: { access_token }, setUserAuth } = useAuth();

    useEffect(() => {
        access_token ? router.push('/') : ""
    }, [router, access_token])

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const serverRoute = type === 'sign-in' ? '/signin' : '/signup';

        const form = new FormData(authForm.current);
        let formData = {};
        
        for(let[key, value] of form.entries()) {
            formData[key] = value;
        }

        const { fullname, email, password } = formData;

        //Validation
        if(fullname && fullname.length < 3) {
            return toast.error("Fullname must be at least 3 letters long")
        }
        if(!email.length) {
            return toast.error("Enter email")
        }
        if(!emailRegex.test(email)) {
            return toast.error("Email is invalid")
        }
        if(!passwordRegex.test(password)) {
            return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters")
        }

        const data = await userAuthThroughServer(serverRoute, formData);
        setUserAuth(data);

    }

  return (
    <AnimationWrapper keyValue={type}>
        <section className="h-cover flex items-center justify-center">
            <form className="w-[80%] max-w-[400px]" ref={authForm}>
                <h1 className="text-4xl font-gelasio capitalize text-center mb-24">{type === "sign-in" ? "Welcome back" : "Join us today"}</h1>
                {type !== "sign-in" ? <InputBox name="fullname" type="text" placeholder="Full Name" icon="user" /> : ""}
                <InputBox name="email" type="email" placeholder="Email" icon="email" />
                <InputBox name="password" type="password" placeholder="Password" icon="password" />
                <button className="btn-dark center mt-14" onClick={handleFormSubmit}>{ type.replace("-", " ") }</button>
                <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
                    <hr className="w-1/2 border-black" />
                    <p>or</p>
                    <hr className="w-1/2 border-black" />
                </div>
                <div className="flex justify-center">
                    <button className="btn-dark flex items-center gap-2">
                        <FaGooglePlus />
                        continue with google
                    </button>
                </div>
                { type === "sign-in" ?
                <p className="mt-6 text-dark-grey text-xl text-center">Don't have an account ?
                <span className="underline text-black text-xl ml-1">
                    <Link href="/signup">Join us roday</Link>
                    </span>
                    </p>
                    :
                    <p className="mt-6 text-dark-grey text-xl text-center">Already a member ?
                    <span className="underline text-black text-xl ml-1">
                    <Link href="/signin">Sign in here</Link>
                    </span>
                    </p> 

                }
            </form>
        </section>
    </AnimationWrapper>
  )
}

export default UserAuthForm;