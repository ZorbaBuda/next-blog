import Link from "next/link";


export default function BrandTitle() {
  return (
    <Link className=""
     href={'/'} >
    <div className="capitalize font-syne text-2xl font-bold text-text2 dark:text-darkmode-text2">
      Primal Blog
    </div>
    </Link>
  )
}
