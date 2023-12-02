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
import PaginationControl from '@/components/PaginationControl'


export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const sortedPosts = allCoreContent(sortPosts(allPosts))

  const page = searchParams['p'] ?? '1'
  const POSTS_PER_PAGE = 5

  const start = (Number(page) - 1) * Number(POSTS_PER_PAGE) // 0, 5, 10 ...
  const end = start + Number(POSTS_PER_PAGE) // 5, 10, 15 ...

  const paginatedPosts = sortedPosts.slice(start, end)

  

  return (
    <Container>
    
    <PageTitle title={"Posts"} />
          
        <ArticleList articles={paginatedPosts} showEndMessage={false} fullHeight />
  
        <PaginationControl
        hasNextPage={end < allPosts.length}
        hasPrevPage={start > 0}
      />

<ScrollTop />
    </Container>
  )}
    
 
