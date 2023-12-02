"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "../ThemeSwitcher";
import menu from "@/data/menu.json";
import React from "react";
import config from '@/data/config.json'
//TODO use mdx to dropdown children
import SearchNav from "./SearchNav";
import { allAbouts } from "@/.contentlayer/generated";
import Logo from "../Logo";
import BrandTitle from "../BrandTitle";

// child navigation link interface
export interface IChildNavigationLink {
  name: string;
  url: string;
}

// navigation link interface
export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

export function NavMenu({}) {

  const categories = allAbouts[0].categories
  // distructuring the main menu from menu object
  const { main } = menu;
  const { navigation_button, settings } = config;

  //toggle menu
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  const pathname = usePathname();

   // scroll to top on route change
  //  useEffect(() => {
  //   window.scroll(0, 0);
  // }, [pathname]);


  //not part of Gekky
  // TODO this is not working fine
  //nabvar visible on scroll up
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });


  return (
    <>
     {/* <header className={`header ${visible ? "top-0" : "hidden"}`}> */}
     <header className={` header`}>
       {/* <header className="header">  */}
      <nav className="navbar container ">
        {/* <div className="order-1  sm:order-1 flex items-center"> <Logo /> </div> */}
        <div className="order-1  sm:order-1 flex items-center"> <BrandTitle /> </div>
        
             {/* navbar toggler */}
              <input id="nav-toggle" type="checkbox" className="hidden" /> 
        <label
          htmlFor="nav-toggle"
          className="order-0  px-3 cursor-pointer flex lg:hidden items-center  text-dark dark:text-white "
        >
       
          <svg
           onClick={handleShowMenu}
            id="show-button"
            className={`h-6 fill-current ${ showMenu ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
          >
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
          <svg
           onClick={handleShowMenu}
            id="hide-button"
            className={`h-6 fill-current ${ showMenu ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
          >
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>

{/* here */}
        <ul
          id="nav-menu"
          className={`navbar-nav order-3 ${showMenu ? "block" : "hidden"}    w-full pb-6 lg:order-1 lg:flex lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8`}
        >
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li className="nav-item nav-dropdown group relative">
                  
                  <span
                    className={`nav-link inline-flex items-center ${
                      menu.children?.map(({ url }) => url).includes(pathname) ||
                      menu.children
                        ?.map(({ url }) => `${url}/`)
                        .includes(pathname)
                        ? " text-text2 dark:text-darkmode-text2"
                        : ""
                    }`}
                  >
                    <Link
                    href={`/category`}
                   
                  >
                    {menu.name}
                  </Link>
                    
                    <svg className="h-4 w-4 fill-current group-hover:rotate-180 transition duration-500" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                  {categories?.map((child, i) => (
                      <li className="nav-dropdown-item" key={`children-${i}`}>
                        <Link
                          href={`/category/${child}`}
                          className={`nav-dropdown-link block ${
                            (pathname === `${child}/` ||
                              pathname === child) &&
                            "text-text2 dark:text-darkmode-text2"
                          }`}
                        >
                          {child}
                        </Link>
                      </li>
                    ))}
                  </ul>
                   
                    {/* {menu.children?.map((child, i) => (
                      <li className="nav-dropdown-item" key={`children-${i}`}>
                        <Link
                          href={child.url}
                          className={`nav-dropdown-link block ${
                            (pathname === `${child.url}/` ||
                              pathname === child.url) &&
                            "text-[#FB5148]"
                          }`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul> */}
                </li>
              ) : (
                <li className="nav-item nav-dropdown group relative ">
                  <Link
                    href={menu.url}
                    className={`nav-link block active ${
                      (pathname === `${menu.url}/` || pathname === menu.url) &&
                      "text-text2 dark:text-darkmode-text2"
                    }`}
                  >
                    {menu.name}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
          {navigation_button.enable && (
            <li className="mt-4 inline-block lg:hidden">
              <Link
                className="btn btn-outline-primary btn-sm"
                href={navigation_button.link}
              >
                {navigation_button.label}
              </Link>
            </li>
          )}
        </ul>

        <div className="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
          {/* {settings.search && (
            <Link
              className="mr-5 inline-block border-r border-border pr-5 text-xl text-dark hover:text-primary dark:border-darkmode-border dark:text-white"
              href="/search"
             
             
              aria-label="search"
            >
            <div className="hover:text-primary">  <IoSearch /></div>
            </Link>
          )} */}
          <SearchNav />
          <ThemeSwitcher className="mr-5" />
        
         
        </div>

        {/* <SearchModal
          searchModal={searchModal}
          setSearchModal={setSearchModal}
        /> */}
      </nav>
    </header>
    </>
  );
}
