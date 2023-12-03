import { BlogPost, PostMeta } from "@/types";
import { compileMDX } from "next-mdx-remote/rsc";
import { Octokit, App } from "octokit";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
// "octokit": "^2.0.14",
const githubToken = process.env.GITHUB_TOKEN;


export async function getPostsMeta() {
  console.log('🤣', githubToken)
    const octokit = new Octokit({ auth: githubToken });
    var resp = await octokit.request(`GET /repos/ZorbaBuda/tina-blog/contents/content/posts`, {
        owner: 'ZorbaBuda',
        // ref: 'testo0',
        repo: 'tina-blog',
        "branch": "main",
        path: 'posts',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    // console.log('🚀', resp)

    //the mdx posts obtained from content/posts folder in github
    const postsGithub = resp.data.filter((post: any) =>  post.name.endsWith('.mdx'));
   
   const postsMeta: PostMeta[] = []

   for (const postGithub of postsGithub) {
        
    const postMeta = await getPostByName(postGithub.name)
    if (postMeta) {
        const { meta } = postMeta
        
        postsMeta.push(meta)
    }
}
   
    return postsMeta.sort((a, b) => a.date < b.date ? 1 : -1)

}

export async function getPostByName(fileName: string) : Promise<BlogPost | undefined> {

  //https://github.com/airbnb/javascript/blob/master/package.json
  const url = `https://raw.githubusercontent.com/ZorbaBuda/tina-blog/main/content/posts/${fileName}`
  // const res = await fetch(`https://api.github.com/repos/ZorbaBuda/text-blogposts/git/blobs/main/more.mdx`, {
  // const res = await fetch(`https://raw.githubusercontent.com/ZorbaBuda/text-blogposts/main/${fileName}`, {
      const res = await fetch(url, {
      headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
      }
  })

  if (!res.ok) return undefined

  const rawMDX = await res.text()


  if (rawMDX === '404: Not Found')  return undefined 

  const { frontmatter, content } = await compileMDX<{ 
                                            title: string, 
                                            date: string,
                                            tags?: string[],
                                            category: string,
                                            coverImage: string,
                                            summary?: string,
                                            bookAuthor?: string,
                                            bookYear?: string,
                                            slug: string
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
                 [rehypeAutolinkHeadings, {
                  behavior: 'wrap'
                 }],
              ]
          }
      } 
  })


  const id = fileName.replace(/\.mdx$/, '')

  const blogPostObj: BlogPost = { meta: {
    id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags,
    category: frontmatter.category,
    coverImage: frontmatter.coverImage,
    summary: frontmatter.summary,
    slug: fileName,
  }, content }

 
  return blogPostObj
}


//we pass name as parameter i.e. (name:'mdx2.mdx')
//used for obtain the meta info from file, just for the card info
export async function getPost(fileName: string) {
  // console.log(fileName)
  //this returns the content encoded in base64
  // const url= `https://api.github.com/repos/ZorbaBuda/next-blog/contents/content/posts/test1.mdx}`
  // https://raw.githubusercontent.com/ZorbaBuda/next-blog/main/contents/content/posts/test1.mdx
// console.log(`http://api.github.com/raw.githubusercontent.com/ZorbaBuda/next-blog/main/content/posts/${fileName}`)
  const octokit = new Octokit({ auth: githubToken });
  // var resp = await octokit.request(`GET /repos/ZorbaBuda/next-blog/contents/content/posts/${fileName}`, {
    var resp = await octokit.request(`GET /raw.githubusercontent.com/ZorbaBuda/next-blog/main/content/posts/${fileName}`, {

      owner: 'ZorbaBuda',
      repo: 'next-blog',
      path: 'posts',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
  });

  //TODO manage octokit responses
  // if (!resp.ok) return undefined
  console.log(resp.data)

  let buff = Buffer.from(resp.data.content, 'base64');
  let text = buff.toString('utf-8');

  // saveGithubPost(buff, fileName)

  return {
    content: text,
    fileName: fileName,
    path: resp.data.path,
    sha: resp.data.sha
  };
}

// export async function getPost(fileName: string) {
//   console.log(fileName)
//   const octokit = new Octokit({ auth: githubToken });
//   var resp = await octokit.request(`GET /repos/ZorbaBuda/next-blog/contents/content/posts/${fileName}`, {
//       owner: 'ZorbaBuda',
//       repo: 'next-blog',
//       path: 'posts',
//       headers: {
//         'X-GitHub-Api-Version': '2022-11-28'
//       }
//   });

//   let buff = Buffer.from(resp.data.content, 'base64');
//   let text = buff.toString('utf-8');

//   // saveGithubPost(buff, fileName)

//   return {
//     content: text,
//     fileName: fileName,
//     path: resp.data.path,
//     sha: resp.data.sha
//   };
// }




export async function getAboutPost() {
  const octokit = new Octokit({ auth: githubToken });
  var resp = await octokit.request(`GET /repos/ZorbaBuda/blog-v4/contents/content/about/about.mdx`, {
      owner: 'ZorbaBuda',
      repo: 'blog-v4',
      path: 'about',
      "branch": "main",
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
  });

  let buff = Buffer.from(resp.data.content, 'base64');
  let text = buff.toString('utf-8');

  return {
    content: text,
    fileName: 'about.mdx',
    path: resp.data.path,
    sha: resp.data.sha
  };
}


