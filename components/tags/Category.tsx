import Link from 'next/link'
interface Props {
  text: string
}

const colors = {
  tantra: "text-blue-800 hover:text-blue-600 ",
  body: "text-red-800 hover:text-red-600  ",
  mind:"text-green-800 hover:text-green-600 ",
  blog:"text-yellow-700 hover:text-yellow-500 ",
  yoga:"text-gray-700 hover:text-gray-500 ",
    // <span class="bg-yellow-500 font-bold text-white text-center py-1 px-2 text-xs rounded">Warning</span>
    // <span class="bg-purple-400 font-bold text-white text-center py-1 px-2 text-xs rounded">Info</span>
    // <span class="bg-gray-100 font-bold text-gray-800 text-center py-1 px-2 text-xs rounded">Light</span>
    // <span class="bg-gray-800 font-bold text-white text-center py-1 px-2 text-xs rounded">Dark</span>
}

const Category = ({ text }: Props) => {
  
  return (
    <Link
    href={`/category/${text}`}
    className="
    tracking-wider rounded-sm py-1 px-4   cursor-pointer
        text-xs  no-underline font-bold max-w-fit font-crimson_text uppercase
         bg-gray-300 dark:bg-[#252525]
          text-[#252525] dark:text-slate-300
           hover:bg-gray-500  dark:hover:text-slate-500"
  >
    {text.split(' ').join('-')}
  </Link>
  //   <Link
  //   href={`/category/${text}`}
  //   className={`
   
  //      cursor-pointer lg:text-xl font-open_sans font-semibold
  //        max-w-fit no-underline hover:underline
  //   capitalize  text-primary
  // `}
  // >
  //   {text}
  // </Link>
    // <Link
    //   href={`/category/${text}`}
    //   className={`
    //   ${colors[text]}
    //   tracking-wider rounded-sm py-1 px-4   cursor-pointer
    //       text-xs max-w-fit no-underline font-open_sans
    //   uppercase  text-slate-300 
    // `}
    // >
    //   {text}
    // </Link>
  )
}

export default Category
