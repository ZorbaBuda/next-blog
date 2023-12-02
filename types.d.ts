

type Meta = {
    id: string,
    title: string,
    date: string,
    tags: string[],
  }
  
  type BlogPost = {
    meta: Meta,
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

  export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    TERTIARY = 'tertiary'
  }

  export enum PageType {
    WEBSITE = 'website',
    ARTICLE = 'article'
  }

  export type RegularPage = {
    frontmatter: {
      title: string;
      image?: string;
      description?: string;
      meta_title?: string;
      layout?: string;
      draft?: boolean;
    };
    content: string;
    slug?: string;
  };