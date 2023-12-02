import siteMetadata from '@/data/siteMetadata'
//import ListLayout from '@/layouts/ListLayoutWithTags'
//import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
// import categoryData from '@/content/category-files.json'
import { allAbouts } from '@/.contentlayer/generated'
import { Container } from '@/components/layouts/Container'
import BookResumeList from '@/components/articleListLayouts/PostsListGrid'
import { allPosts } from '@/.contentlayer/generated'
import type { Post } from '@/.contentlayer/generated'
import { allCoreContent, sortPosts } from '@/lib/postsUtils'
import ScrollTop from '@/components/ScrollTop'
import ArticleList from '@/components/articleListLayouts/ArticleList'
import PageTitle from '@/components/PageTitle'


export default function page() {

 
  const sortedPosts = allCoreContent(
    sortPosts(allPosts)
  )

  return (
    <Container>
    
    <PageTitle title={"Posts"} />
          
        <ArticleList articles={sortedPosts} showEndMessage fullHeight />
  
<ScrollTop />
    </Container>
  )}
    
 
