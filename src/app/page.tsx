'use client'
// "use strict";

import React, { useEffect, useState } from "react";
import DarkMode from "./Components/DarkMode";
import SearchBar from "./Components/SearchBar";
import { useInfiniteQuery } from "@tanstack/react-query";
import Error from "next/error";
// import { fetchImages } from "./lib/server";
import { useDebounce } from 'use-debounce';
import Image from "next/image";

interface Photo {
  id: string;
  urls: {
    regular: string;
  };
  description: string;
}
interface PhotoType {
  total: number;
  total_pages: number;
  results: Photo[]
}


export default function Home({ }) {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState<PhotoType | null>();
  const [value] = useDebounce(search, 300)
  useEffect(() => {
    const FetchImage = async () => {
      const res = await fetch(`https://api.unsplash.com/search/photos?page=3&query=${(search == "") ? "pakistan" : search}&client_id=KhTg2I6eh3aifPUzKU6EtKXGIfQXkwaiSmD14ZLK-g0`)
      const data = await res.json()
      setImages(data)
    }
    FetchImage();
  }, [search])
  console.log(images);
  return (
    <div className="flex flex-col gap-3 relative text-black dark:text-white bg-white dark:bg-black min-h-screen">
      <nav className="flex justify-between items-center px-5 py-4 gap-3 bg-white dark:bg-black z-10 sticky top-0">
        <h2 className="bg-clip-text text-transparent font-bold text-3xl whitespace-nowrap bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Image Gallery
        </h2>
        <div className="w-full hidden md:flex">
          <SearchBar value={search} onChange={(e) => {
            setSearch(e.target.value)
          }} />
        </div>
        <DarkMode />
      </nav>
      <div className="flex md:hidden">
        <SearchBar value={search} onChange={(e) => { setSearch(e.target.value) }} />
      </div>
      {/* <h1>{search}</h1> */}
      <div className="flex flex-wrap gap-8 justify-center py-4">
        {
          images?.results?.map((image, index) => {
            // images.unsplash.com
            return (
              <div key={index} className="border-2 border-primary rounded-[15px]">
                <div key={index} className="relative w-[270px] h-[250px]  rounded-[15px]">
                  <Image src={image.urls.regular} alt="" fill className="rounded-[15px]" />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}




// "use client"
// import React from "react";
// import DarkMode from "./Components/DarkMode";
// import SearchBar from "./Components/SearchBar";
// import { useState } from "react"


// export default function Home() {
//   const [search, setSearch] = useState();
//   return (
//     <div className="flex flex-col gap-3 relative text-black dark:text-white bg-white dark:bg-black min-h-screen">
//       <nav className='flex justify-between items-center px-5 py-4 gap-3 bg-white dark:bg-black z-10 sticky top-0'>
//         <h2 className='bg-clip-text text-transparent font-bold text-3xl whitespace-nowrap bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
//           Image Gallery
//         </h2>
//         <div className='w-full hidden md:flex'>
//           <SearchBar value={search} onChange={e=>setSearch(e.target.value)} />
//         </div>
//         <DarkMode />
//       </nav>
//       <div className='flex md:hidden'>
//         <SearchBar />
//       </div>
//     </div>
//   );
// }
