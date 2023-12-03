import { Octokit, App } from "octokit";
// "octokit": "^2.0.14",
const githubToken = process.env.GITHUB_TOKEN;

// console.log(githubToken);

export async function upsertPost(slug: string, post: string, sha?: string) {
   console.log(post ,'😜')
    const octokit = new Octokit({ auth: githubToken });
    let buff = Buffer.from(post);
    let base64data = buff.toString('base64')

    var resp = await octokit.request(`PUT /repos/ZorbaBuda/blog-v4/contents/content/posts/${slug}`, {
        owner: 'ZorbaBuda',
        repo: 'blog-v4',
        path: './posts',
        // "branch": "main",
        message: 'my commit message',
        committer: {
          name: 'admin',
          email: 'pacoaraz1311@gmail.com'
        },
        content: base64data,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        sha
    });

console.log(resp)
    return resp;
}

export async function uploadFile(file: File) {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes);
  let base64data = buffer.toString('base64')

  // console.log(file ,'😜')
  const octokit = new Octokit({ auth: githubToken });

  var resp = await octokit.request(`PUT /repos/ZorbaBuda/blog-v4/contents/public/${file.name}`, {
      owner: 'ZorbaBuda',
      repo: 'blog-v4',
      path: './public',
      message: 'added image',
      committer: {
        name: 'admin',
        email: 'pacoaraz1311@gmail.com'
      },
      content: base64data,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
  });

  return resp;
}


export async function getAllPosts() {
  console.log('🤣', githubToken)
    const octokit = new Octokit({ auth: githubToken });
    var resp = await octokit.request(`GET /repos/ZorbaBuda/blog-v4/contents/content/posts`, {
        owner: 'ZorbaBuda',
        // ref: 'testo0',
        repo: 'blog-v4',
        "branch": "main",
        path: 'posts',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    return resp.data.filter((post: any) => post.name.endsWith('.md') || post.name.endsWith('.mdx'));
}

export async function getPost(fileName: string) {
  console.log(fileName)
  const octokit = new Octokit({ auth: githubToken });
  var resp = await octokit.request(`GET /repos/ZorbaBuda/blog-v4/contents/content/posts/${fileName}`, {
      owner: 'ZorbaBuda',
      repo: 'blog-v4',
      path: 'posts',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
  });

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

export async function deletePost(fileName: string, sha: string) {
  const octokit = new Octokit({ auth: githubToken });
  var resp = await octokit.request(`DELETE /repos/ZorbaBuda/blog-v4/contents/content/posts/${fileName}`, {
    owner: 'ZorbaBuda',
    repo: 'blog-v4',
    path: './posts',
    message: 'my commit message',
    committer: {
      name: 'admin',
      email: 'pacoaraz1311@gmail.com'
    },
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    sha
  });

  return resp;
}

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


export async function upsertAbout( about: string, sha?: string) {
  //  console.log(about ,'😜')
    const octokit = new Octokit({ auth: githubToken });
    let buff = Buffer.from(about);
    let base64data = buff.toString('base64')

    var resp = await octokit.request(`PUT /repos/ZorbaBuda/blog-v4/contents/content/about/about.mdx`, {
        owner: 'ZorbaBuda',
        repo: 'blog-v4',
        path: './about',
        message: 'about updated',
        committer: {
          name: 'admin',
          email: 'pacoaraz1311@gmail.com'
        },
        content: base64data,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        sha
    });


    return resp;
}
