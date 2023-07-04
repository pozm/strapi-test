import axios from 'axios';
import BlogPreviewCard from './BlogPreviewCard';

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
        <BlogPreviewCard key={"blogi"+b.id} post={b} />
      ))}
    </div>
  </div>
}
