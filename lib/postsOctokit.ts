import { BlogAbout, BlogPost, Heading, PostMeta } from "@/types";
import { compileMDX } from "next-mdx-remote/rsc";
import { Octokit, App } from "octokit";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { extractTocHeadings } from "./remark-tok-headings";
// "octokit": "^2.0.14",
const githubToken = process.env.GITHUB_TOKEN;

export async function getPostsMeta() {
  console.log("🤣", githubToken);
  const octokit = new Octokit({ auth: githubToken });
  var resp = await octokit.request(
    `GET /repos/ZorbaBuda/tina-blog/contents/content/posts`,
    {
      owner: "ZorbaBuda",
      // ref: 'testo0',
      repo: "tina-blog",
      branch: "main",
      path: "posts",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  // console.log('🚀', resp)

  //the mdx posts obtained from content/posts folder in github
  const postsGithub = resp.data.filter((post: any) =>
    post.name.endsWith(".mdx")
  );

  const postsMeta: PostMeta[] = [];

  for (const postGithub of postsGithub) {
    const postMeta = await getPostByName(postGithub.name);
    if (postMeta) {
      const { meta } = postMeta;

      postsMeta.push(meta);
    }
  }

  return postsMeta.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostByName(
  fileName: string
): Promise<BlogPost | undefined> {
  const url = `https://raw.githubusercontent.com/ZorbaBuda/tina-blog/main/content/posts/${fileName}`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!res.ok) return undefined;

  const rawMDX = await res.text();
const headings =  await extractTocHeadings(rawMDX)
// console.log("heading ❤")
//  console.log(headings)
  // console.log(rawMDX)


  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter, content } = await compileMDX<{
    title: string;
    date: Date;
    tags?: string[];
    category: string;
    coverImage: string;
    summary?: string;
    bookAuthor?: string;
    bookYear?: string;
    slug: string;
    headings?: Heading[]
  }>({
    source: rawMDX,
    components: {
      // Video,
      // CustomImage
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          //rehypeHighLight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
        ],
      },
    },
  });

  const id = fileName.replace(/\.mdx$/, "");

  const blogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
      category: frontmatter.category,
      coverImage: frontmatter.coverImage,
      summary: frontmatter.summary,
      bookAuthor: frontmatter.bookAuthor,
      bookYear: frontmatter.bookYear,
      slug: fileName,
      headings: headings
    },
    content,
  };

  return blogPostObj;
}

export async function getAboutPost(): Promise<BlogAbout | undefined> {
  const url = `https://raw.githubusercontent.com/ZorbaBuda/tina-blog/main/content/about/about.mdx`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!res.ok) return undefined;

  const rawMDX = await res.text();

  if (rawMDX === "404: Not Found") return undefined;

  const { frontmatter, content } = await compileMDX<{
    title: string;
    date?: Date;
    categories: string[];
    coverImage?: string;
    slug: string;
  }>({
    source: rawMDX,
    components: {
      // Video,
      // CustomImage
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          //rehypeHighLight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
        ],
      },
    },
  });

  const id = "about";

  const aboutPostObj: BlogAbout = {
    id,
    title: frontmatter.title,
    date: frontmatter.date,
    categories: frontmatter.categories,
    coverImage: frontmatter.coverImage,
    slug: "about.mdx",
    content,
  };

  return aboutPostObj;
}
