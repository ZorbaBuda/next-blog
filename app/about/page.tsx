import { Container } from "@/components/layouts/Container";
import PageTitle from "@/components/PageTitle";
import { getAboutPost } from "@/lib/postsOctokit";

export default async function About() {
      const about = await getAboutPost()
 
  return (
    <Container>
     <PageTitle title={"Acerca"} />

      <article
       className=" mt-4 text-black dark:text-white font-source_serif  prose-headings:font-minion
       prose lg:prose-2xl  sm:prose-lg  md:prose-lg prose-base
       prose-headings:text-black dark:prose-headings:text-slate-800  
       prose-headings:text-2xl tracking-normal md:leading-8 leading-7
       max-w-none md:px-5 sm:px-5 lg:px-0  
       
       "
      >
       {about.content}
      </article>

     

    </Container>
  );
}
