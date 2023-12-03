

// type Meta = {
//     id: string,
//     title: string,
//     date: string,
//     tags: string[],
//   }

import { IsoDateTimeString } from "contentlayer/core";

type PostMeta = {
  id: string
   title: string
   date: IsoDateTimeString
   tags?: string[] | undefined
   category: string
   coverImage: string
   summary?: string | undefined
   bookAuthor?: string | undefined
   bookYear?: string | undefined
   slug: string
}
  
  type BlogPost = {
    meta: PostMeta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type BlogAbout = {
   id: string
   title: string
   date?: IsoDateTimeString | undefined
   categories: string[] 
   coverImage?: string | undefined
   slug: string
  content: ReactElement<any, string | JSXElementConstructor<any>>,
}

  type Toc = {
    value: string;
    depth: number;
    url: string;
}[];

   type Post = {
    /** ID */
    _id: string
    _raw: Record<string, any>
    type: 'Post'
    title: string
    date: IsoDateTimeString
    tags: string[]
    // coverImage: string,
    banner: string,
    lastmod?: IsoDateTimeString | undefined
    draft?: boolean | undefined
    summary?: string | undefined
    images?: string[] | undefined
    authors?: string[] | undefined
    layout?: string | undefined
    bibliography?: string | undefined
    canonicalUrl?: string | undefined
    /** MDX file body */
    body: MDX
    url: string
    slug: string
  }  





type SearchResult = {
query?: {
pages?: Result[],
}
}



