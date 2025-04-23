import Header from "@/app/components/Header";
import Products from "@/app/components/Products";
import axios from "axios";
import { redirect } from "next/navigation";


interface SearchParams {
  q?: string;
}
async function page({searchParams}:{searchParams:SearchParams}) {
    const params:SearchParams = await searchParams
    const q = params.q
    const res = await axios.get(`http://localhost:3000/api/products/search?q=${q}`)
    const items = res.data.products

      async function handleQuery(a:string) {
        'use server'
        redirect(`/products/search?q=${a}`)
      }


  return (
    <>
      <Header/>
      <Products items={items} func={handleQuery} searchQuery={q}/>
    </>
  )
}

export default page