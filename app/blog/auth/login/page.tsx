import { SubmitLoginData } from "../actions";
import { cookies } from "next/headers";
import { DecryptCookie } from "../cookieSecret";
import { getUserId } from "../utils";

export default function LoginPage() {

    let loggedIn = getUserId();
    

    return <div className="flex mx-auto p-20 flex-col">
        <div className="w-fit mx-auto bg-neutral-800 border-2 shadow-xl border-neutral-600 rounded-xl p-3 flex flex-col" >
            {loggedIn ? <h1 className="text-3xl" >Already logged in</h1> : <>
                <h1 className="text-3xl" >Account Login</h1>
                <form action={SubmitLoginData} className="flex flex-col w-[42rem] px-4">
                    <label htmlFor="username" >Username</label>
                    <input required className="text-white border border-neutral-500 appearance-none outline-none focus:ring-1 hover:ring-1 hover:ring-fuchsia-600 focus:ring-fuchsia-700 rounded-lg bg-neutral-700 px-3 py-2" id="username" name="username"  type="text" />
                    <label htmlFor="password" >Password</label>
                    <input required className="text-white border border-neutral-500 appearance-none outline-none focus:ring-1 hover:ring-1 hover:ring-fuchsia-600 focus:ring-fuchsia-700 rounded-lg bg-neutral-700 px-3 py-2" id="password" name="password"  type="password" />
                    <label htmlFor="remember" >Remember</label>
                    <input className="" name="remember" id="remember" type="checkbox" />
                    {/* <button formAction={GenPreview} className="block max-w-fit px-3 py-2 bg-teal-600 rounded-lg mt-4 hover:bg-teal-500 transition-colors" >Preview</button> */}
                    <button type="submit"  className="block max-w-fit px-3 py-2 bg-fuchsia-600 rounded-lg mt-4 hover:bg-fuchsia-500 transition-colors" >Submit</button>

                </form>
            </>}

        </div>

        {/* {previewSrc&&<div className="bg-neutral-800 border-2 border-neutral-600 rounded-xl mt-4" >
            <MDXRemote {...previewSrc}  />
        </div>} */}

    </div>
}