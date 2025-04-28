import Header from "@/app/components/Header";
import Products from "@/app/components/Products";
import axios from "axios";
import { redirect } from "next/navigation";

interface ProductsPageProps {
    category:string,
    subcategory:string,
    minPrice:string,
    maxPrice:string,
    condition:string,
    recentlyPosted:string,
    
  }

async function page({searchParams}:{searchParams:ProductsPageProps}) {
const params = await searchParams
  const category =  params.category;
  const subcategory =  params.subcategory;
  const minPrice =  params.minPrice;
  const maxPrice =  params.maxPrice;
  const condition =  params.condition;
  const recentlyPosted =  params.recentlyPosted;
    
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?category=${category}&subcategory=${subcategory}&condition=${condition}&maxPrice=${maxPrice}&recentlyPosted=${recentlyPosted}&minPrice=${minPrice}`)
    const items = res.data.data

      async function handleQuery(a:string) {
        'use server'
        redirect(`/products/search?q=${a}`)
      }


  return (
    <>
      <Header/>
      <Products items={items} func={handleQuery} />
    </>
  )
}

export default page