import Link from "next/link";

export interface BlogPreviewCardProps {
    post : {
        id:number,
        [x:string]:any
    }
}

export default function BlogPreviewCard(props:BlogPreviewCardProps) {

    return <Link className="h-fit mb-5" href={`/blog/${props.post.id}`} >
        <div className='transition-colors bg-neutral-900 hover:bg-neutral-900/50 hover:border-fuchsia-800 shadow-lg rounded-xl border-neutral-700 border-2 mx-4 p-4 min-h-[11  em]'>
        <h2 className='text-xl' >{props.post.attributes.Title}</h2>
        <p className='overflow-ellipsis' >{props.post.attributes.Content.slice(0,100)+"..."}</p>
        {props.post.attributes.Cover?.data?.attributes?.url &&
            <img className="rounded-xl mx-auto my-3" src={process.env.NEXT_PUBLIC_STRAPI_URL + props.post.attributes.Cover.data.attributes.url} height={props.post.attributes.Cover.data.attributes.height} width={props.post.attributes.Cover.data.attributes.width} alt={props.post.attributes.Cover.data.attributes.name} />
        }
        </div>
    </Link>
}