import Header from "@/app/components/Header";
import Products from "@/app/components/Products";
import axios from "axios";
import { redirect } from "next/navigation";


interface SearchParams {
  q?: string;
}
async function page({searchParams}:{searchParams:Promise<SearchParams>}) {
    const params = await searchParams
    const q = params.q
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/search?q=${q}`)
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