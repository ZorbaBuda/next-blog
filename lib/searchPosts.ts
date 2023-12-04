// 'use client'
import Fuse from "fuse.js";
import { PostMeta } from "@/types";

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

// const searchList = allPosts.map((item) => ({
//   slug: item.slug!,
//   // frontmatter: item.frontmatter,
//   frontmatter: {
//     title: item.title,
//     categories: [item.category],
//     tags: item.tags,
//     image: item.coverImage,
//     author: item.bookAuthor!,
//     summary: item.summary,
//   },
//   content: item.body.raw,
// }));


export default function searchPosts(params: string, postsGithub : PostMeta[]) {

  //console.log('params ', params)
  
  // const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const fuse = new Fuse(postsGithub, {
    
    keys: ["title", "category", "tags", "summary"],
    includeMatches: true,
    minMatchCharLength: 3,
    threshold: 0.5,
  });

  let inputResult =  fuse.search(params);
  const posts : PostMeta[] = []
  inputResult.map((result) => posts.push(result.item))
  
  return posts
 
}
