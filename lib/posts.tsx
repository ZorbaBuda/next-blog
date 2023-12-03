import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
//import rehypeHighLight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
// import Video from '@/components/Video'
// import CustomImage from '@/components/CustomImage'
import { getJsonFileGithub } from './jsonGithubFile'

type Filetree = {
    "tree": [ 
        {
        "path": string,
        }
    ]
}

const fileg = 'introducing-tailwind-nextjs-starter-blog.mdx'

export async function getPostByName(fileName: string) : Promise<BlogPost | undefined> {

   

    // ('GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
    //https://github.com/airbnb/javascript/blob/master/package.json
    const url= `https://api.github.com/repos/ZorbaBuda/text-blogposts/git/blobs/d23414deb7ee73edbf28e27d5bcf227ba02df927?access-token=${process.env.GITHUB_TOKEN}`
    const url2 = 'https://raw.githubusercontent.com/ZorbaBuda/text-blogposts/main/introducing-tailwind-nextjs-starter-blog.mdx'
    const url3 = `https://raw.githubusercontent.com/ZorbaBuda/text-blogposts/master/${fileName}`
    const url4 = `https://raw.githubusercontent.com/ZorbaBuda/text-blogposts/main/${fileName}`
    // const res = await fetch(`https://api.github.com/repos/ZorbaBuda/text-blogposts/git/blobs/main/more.mdx`, {
    // const res = await fetch(`https://raw.githubusercontent.com/ZorbaBuda/text-blogposts/main/${fileName}`, {
        const res = await fetch(url3, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

    if (!res.ok) return undefined

    const rawMDX = await res.text()


    if (rawMDX === '404: Not Found')  return undefined 

    const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[] }>({
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

    const blogPostObj: BlogPost = { meta: { id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags }, content }

   
    return blogPostObj
}



export async function getPostsMeta(): Promise<Meta[] | undefined> {

   //getJsonFileGithub()
    const url1 = 'https://api.github.com/repos/ZorbaBuda/text-blogposts/git/trees/main?recursive=1'
    const url2 = 'https://api.github.com/repos/ZorbaBuda/basic-blog/git/trees/main'

    const res = await fetch(url1, {
        // const res = await fetch(`https://api.github.com/repos/ZorbaBuda/text-blogposts/git/trees/f598b23fe84e82353bd364cbc1c03da20bf27d53?recursive=1`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

 

    if (!res.ok) return undefined
  

    const repoFiletree: Filetree = await res.json()
console.log(repoFiletree)

    const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))
    
   

    const posts: Meta[] = []

    const filesArrayReplaced = filesArray.map(obj => obj.replace('*/', ''))


    for (const file of filesArray) {
        
        const post = await getPostByName(file)
        if (post) {
            const { meta } = post
            
            posts.push(meta)
        }
    }

   

    

    return posts.sort((a, b) => a.date < b.date ? 1 : -1)
}


export async function getPostsMetaAltern(): Promise<Meta[] | undefined> {
    // const res = await fetch(`https://api.github.com/repos/ZorbaBuda/text-blogposts/git/trees/main?recursive=1`, {
        const res = await fetch(`https://api.github.com/repos/ZorbaBuda/text-blogposts/git/trees/main?recursive=1`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

   

    if (!res.ok) return undefined


    const repoFiletree: Filetree = await res.json()

    

    const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))



    const posts: Meta[] = []

    

    for (const file of filesArray) {
        
        const post = await getPostByName(file)
        if (post) {
            const { meta } = post
            posts.push(meta)
        }
    }

    

    

    return posts.sort((a, b) => a.date < b.date ? 1 : -1)
}