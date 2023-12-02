import Image from "next/image";
import slugify from "slugify";
import { Post } from "@/.contentlayer/generated";
import Link from "next/link";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "./ButtonCard";
import Category from "../tags/Category";
import { TbPointFilled } from "react-icons/tb";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
  post: Post;
};

function ArticleCard({ post }: Props) {
  const { coverImage, slug, date, title, summary,  category } = post;

  // TODO what slugify means
  const titleSlug = slugify(title).toLowerCase();
  const formattedDate = (
    <time dateTime={date} className="mt-1">
          {format(parseISO(post.date), 'd LLLL , yyyy', {locale: es})}
        </time> )
  const imageUrl = `${process.env.NEXT_PUBLIC_GITHUB_URL_IMAGES}${coverImage}`;
 
  return (
    // <div className="dark:bg-[#222222] md:border-b md:border-b-slate-700">
    <div className=" md:border-b md:border-b-slate-700">
    {/* <div className="  group  p-5 md:pt-8 md:pb-14  border border-spacing-2 border-slate-700
    md:border-none   "> */}
    <div className="  group  p-5 md:pt-8 md:pb-14  
    md:border-none border border-spacing-2 border-slate-700   ">
       <div className="md:grid lg:grid-cols-3 md:grid-cols-2 md:gap-10 grid-cols-1 justify-between items-center">
      
         <Link
          className="md:order-last overflow-hidden no-underline mx-auto md:mx-auto lg:mx-0 flex justify-center items-center
           lg:h-[273px] lg:w-[348px]  md:h-[273px] md:w-[348px] sm:h-[273px] sm:container container h-[313px]
             bg-[#EEEEEE] dark:bg-[#252525] rounded-sm
          "
          href={`/posts/${slug}`}
        >
        {category === 'blog' ? (
         
              <Image
                className=" mx-auto  object-cover 
               overflow-hidden w-full h-full
              transition-all duration-1000 group-hover:scale-110 
             
                "
                alt={coverImage}
                src={imageUrl}
                width={348}
                height={173}
                loading="lazy"
              />
        ):  (
         
          <Image
            className=" mx-auto  object-fill  h-[220px] w-[132px] 
          rounded-xl overflow-hidden
          transition-all duration-1000 group-hover:scale-110 
          border-4  border-black
            "
            alt={coverImage}
            src={imageUrl}
            width={324}
            height={500}
            loading="lazy"
          />
    )
          
  }
        </Link>
      
        <div className="lg:col-span-2 mt-3 md:mt-2  flex flex-col  max-w-none ">

          <div className="flex  items-center gap-2">
          <Category text={category} />
       
          <div className=" dark:text-slate-400 text-slate-800"><TbPointFilled /></div>
          <div className="dark:text-slate-400 text-slate-800 flex items-center  text-sm  uppercase   gap-2">
            <FaRegCalendarAlt />
           {formattedDate}
          </div>
         </div>

        
          <Link className="no-underline"    href={`/posts/${slug}`}>
            <div className=" dark:hover:text-darkmode-text2 dark:text-white transition 
            duration-500 mt-3 font-lora font-bold   tracking-wide lg:text-5xl text-3xl 
             text-black  ">
              {title}
            </div>
          </Link>

          <div className="font-lora font-semibold dark:text-white text-2xl text-black mt-1">
            {" "}
            {post.bookAuthor ? post.bookAuthor : 'Anonymous'}
            {', '}
            {post.bookYear ? post.bookYear : 'No year'}
          </div>

          <div className="font-source_serif dark:text-white text-black leading-normal  lg:text-xl text-base mt-2 
          tracking-normal  ">
            {" "}
            {summary}
          </div>

         

          <Button    href={`/posts/${slug}`}>Leer post</Button>
        </div>


     

      </div>
     </div>
     </div>
  );
}

export default ArticleCard;

{
  /* <Link className="no-underline mx-auto md:mx-auto lg:mx-0 " href={`/document/${slug}`}>
<div
  className=" mt-0 overflow-hidden rounded-md border-5
shadow-xl    h-[273px] w-[348px]  max-h-[273px] max-w-[348px] p-
"
>
  <div
    className={` ${patternn} card-zoom-image   w-full h-full   
flex items-center justify-center  
transition-all duration-1000 group-hover:scale-110 transform-cpu 

   `}
  >
    <div className="flex items-center justify-center  h-[250px] w-[162px] backdrop:blur ">
    <Image
      className=" p-5  object-fill  h-[250px] w-[162px] 
              rounded-xl overflow-hidden
               
                "
      alt={coverImage}
      src={imageUrl}
      width={324}
      height={500}
      loading="lazy"
    />
    </div>
  </div>
</div>
</Link> */
}
