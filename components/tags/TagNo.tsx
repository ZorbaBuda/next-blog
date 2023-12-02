import Link from 'next/link';

export function Tag({ tag, activeTag }) {
  return (
    <Link
      href={tag ? `/blog/categories/${tag}` : '/tags/all'}
      passHref
      legacyBehavior
    >
      <span
        className={` text-xl font-eina mr-2 rounded-full py-2 px-5  cursor-pointer ${
          activeTag === tag && 'bg-teal-500 text-white'
        } hover:bg-slate-100 dark:hover:bg-midnight `}
      >
        <span className=" capitalize">
          {tag === '' ? 'all' : tag}
        </span>
      </span>
    </Link>
  );
}
