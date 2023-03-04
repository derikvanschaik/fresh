import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Search from "../../components/Search.tsx";
import { getSearchValueAndResponse } from "../../components/Search.tsx";

export const handler: Handlers = {
  async GET(req, ctx){
      return ctx.render({ quotes : [], quote: ''})
  },
  async POST(req, ctx) {
    const endpoint = `${Deno.env.get("API_URL")}/quotes`;
    const [ searchedQuote , data ] = await getSearchValueAndResponse(req, endpoint);
    // parse api return value 
    const quotes = data;
    return ctx.render({ quotes, quote: searchedQuote })
  },
};

export default function Home({ params, data}: PageProps) {
  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      
      <div class="mx-auto my-0 w-3/4 flex flex-col items-center">

          <Search action="/quotes/search" />
          <p class='mt-4'>Looking for an author? Try <a class="underline" href="/authors/search">Author Search</a> </p>
          

          <div>Displaying {data.quotes.length} result{data.quotes.length === 1 ? '' : 's'} for quotes containing '{data.quote}'</div>
        <ul class='mt-20 w-full'>
          { data.quotes.length === 0 && 
              <div class='text-center'>
                  Sorry, no quotes contain that text. Please try a different search.
              </div>
            }
          { data.quotes.map(({author, quote}) => {
            return (
                <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-200 w-full">
                    <p>'{quote}'</p>
                    <a href={`/quotes/${author}`} class="text-xl italic font-medium leading-relaxed">{author}</a>
                </blockquote>
            );
            })}
        </ul>
        </div>
    </>
  );
}
