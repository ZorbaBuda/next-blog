import { allPosts } from "@/.contentlayer/generated";
import { Container } from "@/components/layouts/Container";
import { Button } from "@/components/Button";
import ArticleList from "@/components/articleListLayouts/ArticleList";
import { allCoreContent, sortPosts } from "@/lib/postsUtils";
import PageTitle from "@/components/PageTitle";
const MAX_DISPLAY = 5;

export default function Home() {

  if (!allPosts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }

  const sortedPosts = allCoreContent(sortPosts(allPosts))

  return (
    <Container>
        <div>
          <PageTitle title={"Últimos"} />
        

          <ArticleList articles={sortedPosts.slice(0, MAX_DISPLAY)} />
          <div className="flex justify-center my-16">
            <Button href={"/posts"}>Ver todos</Button>
          </div>
        </div>
    </Container>
  );
}
