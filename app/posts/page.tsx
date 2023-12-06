import siteMetadata from '@/data/siteMetadata'
//import ListLayout from '@/layouts/ListLayoutWithTags'
//import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
// import categoryData from '@/content/category-files.json'
import { Container } from '@/components/layouts/Container'
import ScrollTop from '@/components/ScrollTop'
import ArticleList from '@/components/articleListLayouts/ArticleList'
import PageTitle from '@/components/PageTitle'
import { getPostsMeta } from "@/lib/postsOctokit";

export const revalidate = 600


export default async function page() {

  const postsMeta = await getPostsMeta()

  return (
    <Container>
    
    <PageTitle title={"Posts"} />
          
        <ArticleList articles={postsMeta} showEndMessage fullHeight />
  
<ScrollTop />
    </Container>
  )}
    
 
