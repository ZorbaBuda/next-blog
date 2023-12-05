import { NavMenu } from '@/components/header/NavMenu'
import { getAboutPost } from '@/lib/postsOctokit'
import React from 'react'

export default async function NavWrapper() {

  const about = await getAboutPost()
  const categories = about.categories

  return (
   <NavMenu categories={categories}/>
  )
}
