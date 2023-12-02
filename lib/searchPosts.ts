
import { Post, allPosts } from "@/.contentlayer/generated";
import Fuse from "fuse.js";
import { useState } from "react";

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

const searchList = allPosts.map((item) => ({
  slug: item.slug!,
  // frontmatter: item.frontmatter,
  frontmatter: {
    title: item.title,
    categories: [item.category],
    tags: item.tags,
    image: item.coverImage,
    author: item.bookAuthor!,
    summary: item.summary,
  },
  content: item.body.raw,
}));


export default function searchPosts(params) {

  //console.log('params ', params)

  // const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const fuse = new Fuse(allPosts, {
    
    keys: ["title", "category", "tags", "body.raw"],
    includeMatches: true,
    minMatchCharLength: 3,
    threshold: 0.5,
  });

  let inputResult =  fuse.search(params);
  const posts : Post[] = []
  inputResult.map((result) => posts.push(result.item))
  
  return posts
 
}
