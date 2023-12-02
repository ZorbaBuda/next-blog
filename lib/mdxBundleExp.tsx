import { bundleMDX } from "mdx-bundler";
import {getMDXComponent} from 'mdx-bundler/client'
import React from "react";
import { useMemo } from "react";


const mdxSource = `
---
title: Example Post
published: 2021-02-13
description: This is some description
---

# Wahoo

import Demo from './demo'

Here's a **neat** demo:

<Demo />
`.trim();

async function bundle() {
const result = await bundleMDX({
  source: mdxSource,
  files: {
    "./demo.tsx": `
import * as React from 'react'

function Demo() {
  return <div>Neat demo!</div>
}

export default Demo
    `,
  },
});

const { code, frontmatter } = result;


}

export default async function PostBundle() {

 
  
  
  const result = await bundleMDX({
    source: mdxSource,
    files: {
      "./demo.tsx": `
  import * as React from 'react'
  
  function Demo() {
    return <div>Neat demo!</div>
  }
  
  export default Demo
      `,
    },
  });
  
  const { code, frontmatter } = result;
  
  
  
  
    // it's generally a good idea to memoize this function call to
    // avoid re-creating the component every render.
    const Component = getMDXComponent(code)
    return (
      <>
        <header>
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.description}</p>
        </header>
        <main>
          <Component />
        </main>
      </>
    )
  }
