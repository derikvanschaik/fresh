import { Handlers, PageProps } from "$fresh/server.ts";
import NavBar from '../../components/NavBar.tsx';
import QuoteList from '../../components/QuoteList.tsx';

export const handler: Handlers = {
  async GET(_, ctx) {
    const authorName = ctx.params.author;
    const resp = await fetch(`${Deno.env.get("API_URL")}/quotes/${authorName}`);
    const data = await resp.json();
    const quotes = data.map( ({quote, author_name}) =>{
      return {
        author: author_name, 
        quote
      }
    })
    return ctx.render({ quotes , author: authorName })
    
  },
};
export default function Greet({params, data }: PageProps) {
  return (
    <div>
    <NavBar />
    <div class='w-3/4 mx-auto my-0' id="top">
      <h1 
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Quotes by <span class="text-blue-600 dark:text-blue-500">{data.author}</span> :</h1>
      <QuoteList quotes={data.quotes} />
    </div>
    </div>
  )
}
