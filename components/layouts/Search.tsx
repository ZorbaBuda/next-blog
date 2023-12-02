"use client";

import config from "@/lib/config.json";
import { humanize, plainify, slugify } from "@/lib/textConverter";
import Fuse from "fuse.js";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  FaRegFolder,
  FaRegUserCircle,
  FaSearch,
} from "react-icons/fa/index.js";
import ImageFallback from "@/components/helpers/ImageFallback";
import { Container } from "./Container";
import SearchNoImage from "@/public/no-search-found.png"


const { summary_length, blog_folder } = config.settings;

export type SearchItem = {
  slug: string;
  frontmatter: any;
  content: any;
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

const Search = ({ searchList }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  //console.log(searchList.length)
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = new Fuse(searchList, {
    keys: ["frontmatter.title", "frontmatter.categories", "frontmatter.tags"],
    includeMatches: true,
    minMatchCharLength: 3,
    threshold: 0.5,
  });

  useEffect(() => {
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    setTimeout(function () {
      inputRef.current!.selectionStart = inputRef.current!.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  }, []);

  useEffect(() => {
    let inputResult = inputVal.length > 2 ? fuse.search(inputVal) : [];
    setSearchResults(inputResult);

    if (inputVal.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    } else {
      history.pushState(null, "", window.location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputVal]);

  return (
    <Container>
    <section className="py-16 xl:py-20">
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="row mb-10 justify-center">
          <div className="lg:col-8">
            <div className="flex flex-nowrap">
              <input
                className="form-input rounded-r-none"
                placeholder="Search posts"
                type="search"
                name="search"
                value={inputVal}
                onChange={handleChange}
                autoComplete="on"
                autoFocus
                ref={inputRef}
              />
              <button className=" mt-5 border-[1px] border-slate-400 rounded-sm text-sm 
      tracking-wider  dark:text-slate-400 text-dark flex px-6 py-3 uppercase
      hover:bg-[#f02b2b] hover:text-black group-dark:hover:text-black" type="submit">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {/* {inputVal.length > 1 && (
          <div className="mt-8">
            Found {searchResults?.length}
            {searchResults?.length && searchResults?.length === 1
              ? " result"
              : " results"}{" "}
            for '{inputVal}'
          </div>
        )} */}
        <div className="row">
          {searchResults?.length < 1 ? (
            <div className="mx-auto pt-5 text-center">
              <ImageFallback
                className="mx-auto mb-6"
                src={SearchNoImage}
                alt="no-search-found"
                width={211}
                height={184}
              />
              <h1 className="h2 mb-4">
                {inputVal.length < 1 ? "Search Post Here" : "No Search Found!"}
              </h1>
              <p>
                {inputVal.length < 1
                  ? "Search for posts by title, category, or tag."
                  : "We couldn't find what you searched for. Try searching again."}
              </p>
            </div>
          ) : (
            searchResults?.map(({ item }, index) => (
              // <div className="mb-12 md:col-6 lg:col-4" key={`search-${index}`}>
            <div className="mt-10" key={index}>
              {/* <ArticleCardInSearch  post={item}   /> */}
              </div>
              // <div className="flex flex-col">
              //   <div className="bg-body dark:bg-darkmode-body">
              //     <h4 className="mb-3">
              //       <Link 
              //       href={`/posts/${item.slug}`}>
              //         {item.frontmatter.title}
              //       </Link>
              //     </h4>
              //     <ul className="mb-4">
              //       <li className="mr-4 inline-block">
              //         <Link href={`/authors/${slugify(item.frontmatter.author)}`}>
              //           <FaRegUserCircle
              //             className={"-mt-1 mr-2 inline-block"}
              //           />
              //            {humanize(item.frontmatter.author)} 
              //           {item.frontmatter.author}
              //         </Link>
              //       </li>
              //       <li className="mr-4 inline-block">
              //         <FaRegFolder className={"-mt-1 mr-2 inline-block"} />
              //          {item.frontmatter.categories.map(
              //           (category: string, index: number) => (
              //             <Link
              //               href={`/categories/${slugify(category)}`}
              //               key={category}
              //             >
              //                {humanize(category)} 
              //               {category}
              //               {index !== item.frontmatter.categories.length - 1 &&
              //                 ", "}
              //             </Link>
              //           ),
              //         )} 
                       
              //       </li>
              //     </ul>
              //     <p className="mb-6">
              //       {plainify(item.content?.slice(0, Number(summary_length)))}
              //     </p>
              //     <Link
              //       className="btn btn-outline-primary btn-sm"
              //       href={`/posts/${item.slug}`}
              //     >
              //       read more
              //     </Link>
              //   </div>
              // </div>
            ))
            
          )}
        </div>
      </div>
    </section>
    </Container>
  );
};

export default Search;
