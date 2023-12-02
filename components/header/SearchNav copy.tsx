'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { IoSearch } from "react-icons/io5";
import { FaSearch } from 'react-icons/fa';
import Search from '../ui/Search';

const SearchNav = () => {
  const [navShow, setNavShow] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");


  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="mr-5 inline-block border-r border-border pr-5 text-xl text-dark  dark:border-darkmode-border dark:text-white">
     <div className='hover:text-primary'> <IoSearch /></div>
      </button>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transform  bg-white duration-1000 ease-in-out dark:bg-gray-900 ${
          navShow ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-end">
          <button className="mr-8 mt-11 h-8 w-8" aria-label="Toggle Menu" onClick={onToggleNav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
       
         
      <div className='  mt-52  justify-center px-10'>
       <Search />
       </div>

   
      </div>
     
    </>
  )
}

export default SearchNav
