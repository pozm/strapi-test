import { Metadata } from "next"
import Link from "next/link"
import { fetchUserWithAvatar, getUserId } from "./auth/utils"
import { Logout } from "./auth/actions"

export const metadata: Metadata = {
  title: {
    template: "%s | shitty Blog",
    default: "shitty Blog",
  },
}

export default async function BlogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    let loggedIn = getUserId();
    let fuser = loggedIn ? await fetchUserWithAvatar(loggedIn) : undefined
    let fpfp = fuser ? process.env.NEXT_PUBLIC_STRAPI_URL + fuser.attributes.avatar.data.attributes.url : undefined

    return (
        <div className={"h-vh p-2"}>
          <div className="w-full items-center flex flex-row bg-fuchsia-900/20 backdrop-blur-md p-1 rounded-lg sticky top-2" >
            <Link href={"/blog"} ><button className="m-1 px-2 py-1 rounded-lg bg-indigo-400" >Blog root</button></Link>
            {loggedIn && <Link href={"/blog/new"} ><button className="m-1 px-2 py-1 rounded-lg bg-blue-400" >New Blog</button></Link>}
            {loggedIn && <form><button formAction={Logout}  className="m-1 px-2 py-1 rounded-lg bg-red-400" >Log out</button></form>}
            {!loggedIn && <Link href={"/blog/auth/login"} ><button className="m-1 px-2 py-1 rounded-lg bg-purple-400" >Login</button></Link>}
            {fuser && <div className="flex flex-row items-center ml-auto" >
              <p>Logged in as {fuser.attributes.Username}</p>
              <img className="rounded-full object-cover aspect-square ml-3"  width={40} height={40} src={fpfp} />
              </div>
            }
          </div>
          {children}
        </div>
    )
  }
  