
import siteMetadata, { search } from '@/data/siteMetadata'
//import ListLayout from '@/layouts/ListLayoutWithTags'
//import { genPageMetadata } from 'app/seo'

import { Container } from '@/components/layouts/Container'
import ArticleList from '@/components/articleListLayouts/ArticleList'
import { useSearchParams } from 'next/navigation'
import searchPosts from "@/lib/searchPosts";
import { useEffect, useState } from 'react'
import Search from '@/components/ui/Search'
import PageTitle from '@/components/PageTitle'



export default function page( {
  searchParams,
}: {
  searchParams?: {
    s?: string;
    p?: string;
  };
}) {
  const query = searchParams?.s || '';
  //for use when pagination const currentPage = Number(searchParams?.page) || 1;
 
  const posts = searchPosts(query)
  //console.log("type of posts ", (posts[0]))
 
  return (
    <Container>
      <div className='flex flex-col gap-5'>
     <PageTitle title={"Búsqueda"} />

      <div className="flex items-center justify-center">
            <div className=" text-black dark:text-white font-libre_baskerville text-3xl ">
             {posts && posts.length > 0 ? (
              `Mostrando ${posts.length} resultados para '${query}'`
             ) : (
              `No hay resultados para '${query}'`
             )
            }        
             
            </div>
           
          </div>
          <Search />

         
          
         <ArticleList articles={posts} showEndMessage fullHeight />  
   </div>

    </Container>
  )}
    {/* <div className="mt-10 flex  flex-wrap">
    {categoryKeys.length === 0 && 'No tags found.'}
    {categoryKeys.map((t) => {
      return (
        <div key={t} className="mb-2 mr-5 mt-2">
          <Category text={t} />
          <Link
            href={`/category/${t}`}
            className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
            aria-label={`View posts tagged ${t}`}
          >   
          </Link>
        </div>
      )
    })}
  </div>
    <div>
      <div className='mt-10'>Browsing  {category}  Category   </div>
    </div> */}
 
