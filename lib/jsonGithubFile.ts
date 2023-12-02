

export async function getJsonFileGithub() {

    const filename = 'tag-data.json'
    
    const res = await fetch(`https://raw.githubusercontent.com/ZorbaBuda/text-blogposts/main/${filename}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    })

    if (!res.ok) return undefined

    const result = await res.json()

    // console.log(result);
    // console.log("code" , result.guide)

    
}


