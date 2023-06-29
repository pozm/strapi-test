import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';

export default async function BlogHome() {
  let blogs = await axios.get("http://127.0.0.1:1337/api/blog-posts?populate=Cover",{
    headers:
      {
        "Authorization":"Bearer " + process.env.STRAPI_TOKEN as string,
        host:"127.0.0.1:1337",
        Accept:"*/*"
      },
      
  }).then(res => res.data,c=>console.log(c));
  console.log(blogs.data[0].attributes.Cover.data.attributes);

  return <div>
    <h1 className='text-4xl' >Welcome to my shitty blog</h1>
    <div className='grid grid-cols-3 mx-5 my-14' >
      {blogs.data.map((b:any) => (
        <Link key={"blogi"+b.id} href={`./${b.id}`} >
          <div className='bg-neutral-900 rounded-xl border-neutral-700 border-2 mx-4 p-4 h-44'>
            <h2 className='text-xl' >{b.attributes.Title}</h2>
            <p className='overflow-ellipsis' >{b.attributes.Content.slice(0,100)+"..."}</p>
            <Image src={"https://localhost:1337" + b.attributes.Cover.data.attributes.url} height={b.attributes.Cover.data.attributes.height} width={b.attributes.Cover.data.attributes.width} alt={b.attributes.Cover.data.attributes.name} ></Image>
          </div>
        </Link>
      ))}
    </div>
  </div>
}
