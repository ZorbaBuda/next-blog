import PageTitle from '@/components/PageTitle';
import { Container } from '@/components/layouts/Container';
import { allAbouts } from '@/.contentlayer/generated';
import tagFiles from '@/lib/tag-files.json'
import Category from '@/components/tags/Category';
// import Tag from '@/components/tags/Tag';


export default function CategoryPage() {
  
  const categories = allAbouts[0].categories
  // const tags = Object.keys(tagFiles)

  return (
    <Container>
      <div className='flex flex-col gap-y-8'>
      <PageTitle title={'Explorar categorias'}/>
      <div className='flex flex-wrap justify-center gap-2'>
      {categories.map((category) => (
        <Category key={category} text={category}/>
      ))}
      </div>
      {/* <PageTitle title={'Etiquetas'} />
      <div className='flex flex-wrap gap-2'>
      {tags.map((tag) => (
        <Tag key={tag} text={tag}/>
      ))}
      </div> */}
      </div>
    </Container>
  )

 };
