import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: {
    template: "%s | shitty Blog",
    default: "shitty Blog",
  },
}

export default function BlogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className={"h-vh p-2"}>
          <div className="w-full bg-fuchsia-900/20 backdrop-blur-md p-1 rounded-lg sticky top-2" >
            <Link href={"/blog"} ><button className="m-1 px-2 py-1 rounded-lg bg-indigo-400" >Blog root</button></Link>
            <Link href={"/blog/new"} ><button className="m-1 px-2 py-1 rounded-lg bg-blue-400" >New Blog</button></Link>
          </div>
          {children}
        </div>
    )
  }
  