import axios from 'axios';
import BlogPreviewCard from './BlogPreviewCard';
import { AxiosClient } from '../axiosc';

export default async function BlogHome() {
  let blogs = await AxiosClient.get(`${process.env.STRAPI_URL}/api/blog-posts?populate=Cover`)
    .then(res => res.data,c=>console.log(c));
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
