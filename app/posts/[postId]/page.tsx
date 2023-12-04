// import { allPosts } from "@/.contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MDXComponents from "@/components/mdx-component";
import DocHeading from "@/components/header/DocHeading";
import TableOfContents from "@/components/TableOfContents";
import ScrollTop from "@/components/ScrollTop";
import Tag from "@/components/tags/Tag";
import { Container } from "@/components/layouts/Container";
import { BsFillTagsFill} from 'react-icons/bs'
import siteMetadata from "@/data/siteMetadata";
import { getPostByName, getPostsMeta } from "@/lib/postsOctokit";
import getFormattedDate from "@/lib/getFormattedDate";

type Props = {
  params: {
  postId: string;
  }
};

export async function generateStaticParams() {
  const posts = await getPostsMeta() //deduped!

  if (!posts) return []

  return posts.map((post) => ({
      postId: post.id
  }))
}

// interface BlogDetailsProps {
//   params: BlogParam;
// }


// export async function generateMetadata({
//   params,
// }: {
//   params: BlogParam
// }): Promise<Metadata | undefined> {
//   const slug = params.postId
//   // const post = allPosts.find((p) => p.slug === slug)
  
//   // if (!post) {
//   //   return
//   // }

//   // const publishedAt = new Date(post.date).toISOString()
 
//   return {
//     // title: post.title,
//     // description: post.summary,
//     // openGraph: {
//     //   title: post.title,
//     //   description: post.summary,
//     //   siteName: siteMetadata.title,
//     //   locale: 'en_US',
//     //   type: 'article',
//     //   publishedTime: publishedAt,
//     //   url: './',
//     // },
//     // twitter: {
//     //   card: 'summary_large_image',
//     //   title: post.title,
//     //   description: post.summary,
//     // },
//   }
// }

export async function generateMetadata({ params: { postId } }: Props) {

  const post = await getPostByName(`${postId}.mdx`) //deduped!

  if (!post) {
      return {
          title: 'Post Not Found'
      }
  }

  return {
      title: post.meta.title,
  }
}


// async function getPostFromParams(params: BlogParam) {
//   const slug = params.postId;

  // const post = allPosts.find((p) => p.slug === slug);

  // if (!post) {
  //   return null;
  // }

  // return post;
//}

// export async function generateMetadata({
//   params,
// }: BlogDetailsProps): Promise<Metadata> {
//   const post = await getPostFromParams(params);

//   if (!post) {
//     return {};
//   }

//   return {
//     title: post.title,
//     description: post.summary,
//   };
// }

export default async function Post({ params: { postId } }: Props) {

  const post = await getPostByName(`${postId}.mdx`) //deduped!

  if (!post) notFound()

  const { meta, content } = post
 
  const pubDate = getFormattedDate(meta.date)

  // const tags = meta.tags.map((tag, i) => (
  //     <Link key={i} href={`/tags/${tag}`}>{tag}</Link>
  // ))

 
  // const isBookResume = post.type === "Writing" ? false : true;
  // console.log(isBookResume);

  // if (!post) {
  //   notFound();
  // }

  
  return (
    <Container
      // post={post._id}
      // title={post.title}
      // description={post.summary}
      // coverImage={post.coverImage}
      // date={new Date(post.date).toISOString()}
      // category={post.category}
    >
      <ScrollTop />


     <DocHeading post={post} />


     <div className=" max-w-4xl flex mx-auto">
      <div className=" flex flex-col  lg:gap-8">
        {/* {post.toc && (
          <div className="mt-10 lg:col-start-1 lg:col-end-10">
            {post.toc.length > 0 && <TableOfContents source={post.body.raw} />}
          </div>
        )} */}
          {meta.headings && (
          <div className="mt-10 lg:col-start-1 lg:col-end-10">
            {meta.headings.length > 0 && <TableOfContents headings={meta.headings} />}
          </div>
        )}

     

        
          <article
            className=" mt-4 text-black dark:text-white font-source_serif  prose-headings:font-lora
          prose lg:prose-xl  sm:prose-lg  md:prose-lg prose-base
          prose-headings:text-black dark:prose-headings:text-white prose-headings:font-extrabold
           tracking-normal md:leading-8 leading-7
          max-w-none md:px-5 sm:px-5 lg:px-0  
          
           prose-headings:no-underline prose-headings:text-4xl 
           prose-a:no-underline
           
          
          "
          >
            {content}
            {/* <MDXComponents code={post.body.code} /> */}
          </article>
      

        <article className="mt-10 flex flex-wrap text-black dark:text-white ">
          <div className="flex justify-between items-center">
            <BsFillTagsFill />
             <div className="ml-3">Etiquetas:</div>
          </div>
          
         <div className="ml-5 flex gap-2">
          {meta.tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
          </div>
        </article>
      </div>
      </div>
    </Container>
  );
};


