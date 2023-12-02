'use client'
import { Container } from "@/components/layouts/Container";
import {  allAbouts } from "@/.contentlayer/generated";
import MDXComponents from "@/components/mdx-component";
import { About } from "@/.contentlayer/generated";
import Link from "next/link";
import React from "react";
import { TbPointFilled } from "react-icons/tb";
import PageTitle from "@/components/PageTitle";

export default function About() {

 
  return (
    <Container>
     <PageTitle title={"Acerca"} />

      <article
       className=" mt-4 text-black dark:text-white font-source_serif  prose-headings:font-minion
       prose lg:prose-2xl  sm:prose-lg  md:prose-lg prose-base
       prose-headings:text-black dark:prose-headings:text-slate-800  
       prose-headings:text-2xl tracking-normal md:leading-8 leading-7
       max-w-none md:px-5 sm:px-5 lg:px-0  
       
       "
      >
        <MDXComponents code={allAbouts[0].body.code} />
        {/* <Component
                  components={
                    {
                      ...MDXComponents,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                  }
                /> */}
      </article>

     

    </Container>
  );
}
