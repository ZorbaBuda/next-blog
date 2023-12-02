import Image from "next/image";
import slugify from "slugify";
import { Post } from "@/.contentlayer/generated";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "../cards/ButtonCard";
import Category from "../tags/Category";
import { TbPointFilled } from "react-icons/tb";

type Props = {
  post: Post;
  pattern: string;
};

function ArticleCard({ post, pattern }: Props) {
  const { coverImage, slug, date, title, summary, tags, category } = post;

  const slug1 = slugify(title).toLowerCase();
  const formattedDate = getFormattedDate(date);
  const imageUrl = `${process.env.GITHUB_URL_IMAGES}${coverImage}`;

  return (
    <div
      className="  group  p-5   border border-spacing-2 border-slate-700
       "
    >
      {/* <div className="  flex flex-wrap-reverse justify-between items-center"> */}
      {/* <div className="md:grid md:grid-cols-2 md:gap-20 flex flex-wrap-reverse justify-between items-center"> */}
      <div className=" grid-cols-1 justify-between items-center">
        <Link
          className=" overflow-hidden no-underline mx-auto   flex justify-center items-center
            sm:h-[273px] sm:container container h-[313px]
             bg-[#EEEEEE] dark:bg-[#252525] rounded-sm
          "
          href={`/posts/${slug}`}
        >
          {category === "blog" ? (
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
          ) : (
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
          )}
        </Link>

        <div className=" mt-3   flex flex-col  max-w-none ">
          <div className="flex  items-center gap-2">
            <Category text={category} />

            <div className="text-[#FB5148]">
              <TbPointFilled />
            </div>
            <div className="flex items-center  text-sm  uppercase dark:text-white text-black gap-2">
              <FaRegCalendarAlt />
              <div className=" mt-1   ">{formattedDate}</div>
            </div>
          </div>

          <Link className="no-underline" href={`/posts/${slug}`}>
            <div className="hover:underline mt-3 font-gloock   tracking-wider  text-3xl  text-black dark:text-white">
              {title}
            </div>
          </Link>

          <div className="font-gloock dark:text-white text-xl text-black mt-1">
            {" "}
            {post.bookAuthor ? post.bookAuthor : "Anonymous"}
            {", "}
            {post.bookYear ? post.bookYear : "No year"}
          </div>

          <div className="font-open_sans dark:text-white text-black leading-normal  text-base mt-2 tracking-normal  ">
            {" "}
            {summary}
          </div>

          <Button href={`/posts/${slug}`}>Leer artículo</Button>
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
