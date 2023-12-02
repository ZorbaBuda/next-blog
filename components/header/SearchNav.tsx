"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import Search from "../ui/Search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchNav = () => {
  const [navShow, setNavShow] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputVal, setInputVal] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { replace } = useRouter();
  const [searchText, setSearchText] = useState<string>("");

  function handleSearch(event: { preventDefault: () => void; }) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchText) {
      params.set("s", searchText);
    } else {
      params.delete("s");
    }
   
    replace(`/search?${params.toString()}`);
     setNavShow(false)
    //  setParamsSearch(`/search?${params.toString()}`)
  }

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        // document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="mr-5 inline-block border-r border-border pr-5 text-xl text-dark  dark:border-darkmode-border dark:text-white"
      >
        <div className="hover:text-text2 dark:hover:text-darkmode-text2 ">
          {" "}
          <IoSearch />
        </div>
      </button>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transform  bg-white dark:bg-black duration-1000 ease-in-out  ${
          navShow ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-end">
          <button
            className="mr-8 mt-11 h-8 w-8"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
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

        <div className=" flex items-center justify-around">
          {/* <label htmlFor="search" className="sr-only">
        Search {searchParams}
      </label> */}
          <form
            onSubmit={handleSearch}
            // ref={formRef}
          >
            <div className=" bg-white dark:bg-black text-black dark:text-white inline-flex text-2xl border-b-2 border-b-gray-200">
            <input
              id="form-search"
              className=" dark:bg-black text-2xl     py-5  outline-0 placeholder:text-2xl
               placeholder:text-gray-500 dark:placeholder:bg-black placeholder:bg-white"
              placeholder={"Texto a buscar..."}
              required
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              type="text"
              
              defaultValue={searchParams.get("s")?.toString()}
            />
            <button type="submit"><IoSearch/></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchNav;
