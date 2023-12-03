import siteMetadata from "@/data/siteMetadata";
//import ListLayout from '@/layouts/ListLayoutWithTags'
//import { genPageMetadata } from 'app/seo'
import { Metadata } from "next";
// import categoryData from '@/content/category-files.json'
// import { allAbouts } from '@/.contentlayer/generated'
import { Container } from "@/components/layouts/Container";
import BookResumeList from "@/components/articleListLayouts/PostsListGrid";
// import { allPosts } from '@/.contentlayer/generated'
// import type { Post } from '@/.contentlayer/generated'
import { allCoreContent, sortPosts } from "@/lib/postsUtils";
import ScrollTop from "@/components/ScrollTop";
import { TbPointFilled } from "react-icons/tb";
import ArticleList from "@/components/articleListLayouts/ArticleList";
import PageTitle from "@/components/PageTitle";
import { PostMeta } from "@/types";
import { getPostsMeta } from "@/lib/postsOctokit";

// type CategoryParam = {
//   category: string;
// };

// interface CategoryProps {
//   params: CategoryParam;
// }

// async function getCategoryFromParams(params: CategoryParam) {
//   const category = params.category;
//   return category;
// }

// export async function generateMetadata({
//   params,
// }: CategoryProps): Promise<Metadata> {
//   const category = await getCategoryFromParams(params);

//   if (!category) {
//     return {};
//   }

//   return {
//     title: category,
//     description: category,
//   };
// }

export default async function page({
  params,
}: {
  params: { category: string };
}) {
  const category = decodeURI(params.category);
  const postsMeta = await getPostsMeta();

  if (!postsMeta) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }

  // const categoryDocs : PostMeta[] = []

  const categoryDocs = postsMeta.map((postMeta) => {
    if (postMeta.category === category) return postMeta;
  });

  console.log('categoryDocs')
  console.log(categoryDocs)

  return (
    <Container>
      <PageTitle title={category} />

      <ArticleList articles={categoryDocs} showEndMessage fullHeight />
    </Container>
  );
}
