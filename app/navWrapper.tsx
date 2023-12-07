import { NavMenu } from '@/components/header/NavMenu'
import { getAboutPost } from '@/lib/postsOctokit'
import React from 'react'

export const revalidate = 86400

export default async function NavWrapper() {

  const about = await getAboutPost()
  console.log(about)
  const categories = about.categories

  return (
   <NavMenu categories={categories}/>
  )
}
