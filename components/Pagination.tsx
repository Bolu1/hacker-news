import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Cookie from 'js-cookie'

export const Pagination = () => {
  const router = useRouter()
  const [page, setPage] = useState(10)

  const handleBack = () =>{
    if(page>9){
    const p = page-10
    setPage(p)
    Cookie.set("page", p)
    router.push(`/?page=${p}`)
    }
  }

  const handleFoward = () =>{
    const p = page+10
    setPage(p)
    Cookie.set("page", p)
    router.push(`/?page=${p}`)
  }

  return (
    <div >

    <div className="flex justify-center ">
        <a
        onClick={handleBack}
         href="#" className="flex items-center px-4 py-2 mx-1 hover:bg-blue-600 hover:bg-blue-500 hover:text-white hover:text-gray-200 bg-white rounded-md  bg-gray-200 text-gray-600">
            previous
        </a>

        <a
        onClick={handleFoward}
         href="#" className="flex items-center px-4 py-2 mx-1 text-gray-600 transition-colors duration-200 transform bg-white rounded-md bg-gray-200  hover:bg-blue-600 hover:bg-blue-500 hover:text-white hover:text-gray-200">
            Next
        </a>
    </div>
    </div>
  )
}
