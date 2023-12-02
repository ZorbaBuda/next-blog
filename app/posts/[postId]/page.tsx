import { allPosts } from "@/.contentlayer/generated";
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

type BlogParam = {
  postId: string;
};

interface BlogDetailsProps {
  params: BlogParam;
}


export async function generateMetadata({
  params,
}: {
  params: BlogParam
}): Promise<Metadata | undefined> {
  const slug = params.postId
  const post = allPosts.find((p) => p.slug === slug)
  
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
 
  return {
    title: post.title,
    description: post.summary,
    // openGraph: {
    //   title: post.title,
    //   description: post.summary,
    //   siteName: siteMetadata.title,
    //   locale: 'en_US',
    //   type: 'article',
    //   publishedTime: publishedAt,
    //   url: './',
    // },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: post.title,
    //   description: post.summary,
    // },
  }
}

async function getPostFromParams(params: BlogParam) {
  const slug = params.postId;

  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return null;
  }

  return post;
}

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

const BlogDetails: React.FC<BlogDetailsProps> = async ({ params }) => {
  // export default function SingleBlogPage(params: BlogParam) {
  //const Component = React.useMemo(() => getMDXComponent(code), [code]);
  const post = await getPostFromParams(params);

 
  // const isBookResume = post.type === "Writing" ? false : true;
  // console.log(isBookResume);

  if (!post) {
    notFound();
  }

  

  //#region  //*=========== Scrollspy ===========
  // const activeSection = useScrollSpy();
  // const [toc, setToc] = React.useState<HeadingScrollSpy>();
  // const minLevel =
  //   toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  // React.useEffect(() => {
  //   const headings = document.querySelectorAll('.mdx h1, .mdx h2, .mdx h3');

  //   const headingArr: HeadingScrollSpy = [];
  //   headings.forEach((heading) => {
  //     const id = heading.id;
  //     const level = +heading.tagName.replace('H', '');
  //     const text = heading.textContent + '';

  //     headingArr.push({ id, level, text });
  //   });

  //   setToc(headingArr);
  // }, [frontmatter.slug]);
  //#endregion  //*======== Scrollspy ===========
  return (
    <Container
      post={post._id}
      title={post.title}
      description={post.summary}
      coverImage={post.coverImage}
      date={new Date(post.date).toISOString()}
      category={post.category}
    >
      <ScrollTop />


     <DocHeading post={post} />


     <div className=" max-w-4xl flex mx-auto">
      <div className=" flex flex-col  lg:gap-8">
        {post.toc && (
          <div className="mt-10 lg:col-start-1 lg:col-end-10">
            {post.toc.length > 0 && <TableOfContents source={post.body.raw} />}
          </div>
        )}

     

        
          <article
            className=" mt-4 text-black dark:text-white font-source_serif  prose-headings:font-minion
          prose lg:prose-2xl  sm:prose-lg  md:prose-lg prose-base
          prose-headings:text-black dark:prose-headings:text-slate-800  
          prose-headings:text-2xl tracking-normal md:leading-8 leading-7
          max-w-none md:px-5 sm:px-5 lg:px-0  
          
          "
          >
            <MDXComponents code={post.body.code} />
          </article>
      

        <article className="mt-10 flex flex-wrap text-black dark:text-white ">
          <div className="flex justify-between items-center">
            <BsFillTagsFill />
             <div className="ml-3">Etiquetas:</div>
          </div>
          
         <div className="ml-5 flex gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
          </div>
        </article>
      </div>
      </div>
    </Container>
  );
};

export default BlogDetails;
