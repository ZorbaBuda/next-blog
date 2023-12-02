import Link from 'next/link';
import Tag from '@/components/tags/Tag';
import tagData from '@/lib/tag-data.json';
import { slug } from 'github-slugger';
import { AiOutlineSearch } from "react-icons/ai";

export default function AsideLayout() {

  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  
  return (
    <aside className='flex flex-col mx-auto min-w-[10rem] max-w-[300px]  '>
      
      <div className='flex items-center gap-[.6rem] h-[2.6rem] border px-[1rem] text-sm '>
       
        <input
          className='italic border-none outline-none bg-none w-full'
          placeholder="Search and hit enter..."
          type="text"
        />
         <AiOutlineSearch />
      </div>
      <div className=''>
        <div className=''>
        <div className='text-white text-center py-3'>TAGS</div>
        </div>
      <div className="flex  flex-wrap justify-start">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="space-x-1">
                <Tag text={t} />
                <Link
                  href={`/tags/${slug(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${t}`}
                >
                 
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}