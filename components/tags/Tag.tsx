import Link from 'next/link'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tag/${text}`}
      className="
      tracking-wider rounded-sm py-1 px-4   cursor-pointer
          text-xs  no-underline font-bold max-w-fit
      uppercase bg-[#252525] text-slate-300 hover:bg-gray-500 
      dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
