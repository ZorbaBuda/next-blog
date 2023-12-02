import React from 'react'
import { TbPointFilled } from 'react-icons/tb'


export default function PageTitle({title} : { title : string } ) {
  return (
    <div className="flex items-center space-x-5 capitalize ">
            <div className="  font-semibold font-lora md:text-4xl text-3xl ">
              {" "}
              {title}
            </div>
            <div className="dark:text-darkmode-text2 text-text2">
              <TbPointFilled />
            </div>
            <div className="flex-grow border-t "></div>
          </div>
  )
}
