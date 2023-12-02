'use client'
import { allPosts } from '@/.contentlayer/generated'
import { GrPrevious } from "react-icons/gr";
import { GrNext } from 'react-icons/gr';
import { IconContext } from "react-icons";

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
}

const style = {
  btn :` border-[1px] border-slate-400 rounded-sm text-sm tracking-wider  
  dark:text-slate-400 text-black flex px-6 py-3 uppercase
  dark:bg-darkmode-text2 dark:hover:text-black group-dark:hover:text-black
  bg-text2 hover:text-white`
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('p') ?? '1'

  console.log(allPosts.length)
 
  return (
    <>
    <div className='mt-5 flex gap-20 justify-center items-center'>
      <button
        className={style.btn}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/postPagination?p=${Number(page) - 1}`)
        }}>
      {/* <div className='text-black dark:text-slate-500 text-2xl'>  <GrPrevious /></div> */}
      <IconContext.Provider
      value= {{  className: "react-icons" }} ><GrPrevious/></IconContext.Provider>
      </button>

      <div>
        {page} / {Math.ceil(allPosts.length / 5)}
      </div>

      <button
        className={style.btn}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/postPagination?p=${Number(page) + 1}`)
        }}
        
        >
        <div className='text-black dark:text-slate-500 text-2xl'>  <GrNext /></div>
      </button>
    </div>
    <div className='text-black dark:text-slate-500 text-2xl'>  <GrPrevious /></div>
    </>
  )
}

export default PaginationControls