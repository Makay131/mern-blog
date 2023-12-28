import Link from "next/link";
import InputBox from "./inputBox";
import { FaGooglePlus } from "react-icons/fa";
import AnimationWrapper from "./animationWrapper";

function UserAuthForm({type}) {
  return (
    <AnimationWrapper keyValue={type}>
        <section className="h-cover flex items-center justify-center">
            <form className="w-[80%] max-w-[400px]">
                <h1 className="text-4xl font-gelasio capitalize text-center mb-24">{type === "sign-in" ? "Welcome back" : "Join us today"}</h1>
                {type !== "sign-in" ? <InputBox name="fullname" type="text" placeholder="Full Name" icon="user" /> : ""}
                <InputBox name="email" type="email" placeholder="Email" icon="email" />
                <InputBox name="password" type="password" placeholder="Password" icon="password" />
                <button className="btn-dark center mt-14">{ type.replace("-", " ") }</button>
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