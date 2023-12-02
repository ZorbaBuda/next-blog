"use client";
import Footer from "@/components/Footer";
import Head from "next/head";
import { PageTransition } from "@/components/PageTransition";
import { NavMenu } from "../header/NavMenu";
import React from "react";
import Breadcrumbs from "../breadcrumb/Breadcrumbs";
import ScrollTop from "../ScrollTop";


export const Container = (props) => {
  const { children, ...customMeta } = props;

 
  //   title: siteMetadata.title,
  //   description: siteMetadata.description,
  //   imageUrl: null,
  //   type: PageType.WEBSITE,
  //   twitterHandle: siteMetadata.twitterHandle,
  //   canonicalUrl: customMeta.sponsoredArticle
  //     ? customMeta.sponsoredUrl
  //     : `${siteMetadata.siteUrl}${router.asPath}`,
  //   date: null,
  //   isArticle: false,
  //   ...customMeta
  // };

  return (
    <div className={` min-h-full`}>
      {/* <Header /> */}
      <NavMenu />
     
      <main
        className={`xl:px-0 px-5 lg:px-5 flex flex-col mx-auto max-w-7xl justify-center relative `}
      >
        <div className="z-10">
          <PageTransition>
             {/* <BreadcrumbComponent /> */}
             <Breadcrumbs />
            <div className="text-black dark:text-white text-xl mt-0 py-5">
             
               
            </div>
            {children}
          </PageTransition>
          
        </div>
      </main>
     
      <Footer />
    </div>
  );
};
