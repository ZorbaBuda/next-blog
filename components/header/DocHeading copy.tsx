'use client'
import { Post } from "@/.contentlayer/generated";
import React from "react";
import Image from "next/image";
import getFormattedDate from "@/lib/getFormattedDate";
import Category from "../tags/Category";
import { FaRegCalendarAlt } from "react-icons/fa";
import "./patterns.scss"
import { useTheme } from "next-themes";

type Props = {
  post: Post;
};

export default function DocHeading({ post }: Props) {
  const imageUrl = `${process.env.NEXT_PUBLIC_GITHUB_URL_IMAGES}${post.coverImage}`;
  const formattedDate = getFormattedDate(post.date);

  const { theme, setTheme, resolvedTheme } = useTheme();
  console.log(theme)
  return (
    <div className={`${theme === 'dark' ? 'patterns pt28' : 'patterns pt13'}`}>
    <article className=" flex  flex-col gap-5 justify-center   text-black dark:text-white">
     <div className="flex justify-center">
      <div className=" flex flex-col  gap-5 ">
      <div className="text-black dark:text-white lg:text-5xl text-4xl  font-bold font-recoleta_bold ">
        {post.title}
      </div>

      <div className=" lg:text-3xl text-xl flex flex-wrap items-center text-black dark:text-white font-recoleta tracking-wide gap-x-3">
      {" "}
            {post.bookAuthor ? `${post.bookAuthor},` : ''}
            {" "}
            {post.bookYear ? post.bookYear : ''}
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <Category text={post.category} />{" "}
        <div className="flex  text-sm  uppercase dark:text-slate-400 text-black">
          <FaRegCalendarAlt />
          <div className="tracking-wider  ml-3 ">{formattedDate}</div>
        </div>
      
      </div>
      </div>
      </div>
<div className="flex justify-center">
      <Image
        priority={true}
        className="rounded-md lg:ml-0 ml-3 object-cover my-0 w-[224px] h-[343px] lg:w-[354px] lg:h-[539px] md:w-[354px] md:h-[539px] "
        alt={imageUrl}
        src={imageUrl}
        width={354}
        height={539}
      />
      </div>
    </article>
    </div>
  );
}
