import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Search from "../../components/Search.tsx";
import { getSearchValueAndResponse } from "../../components/Search.tsx";

export const handler: Handlers = {
  async GET(req, ctx){
      return ctx.render({ authors: [], author: ''})
  },
  async POST(req, ctx) {
    const endpoint = `${Deno.env.get("API_URL")}/authors`;
    const [ searchedAuthor, data ] = await getSearchValueAndResponse(req, endpoint);
    // parse api return value 
    const authors = ( data ).map( 
      ({_id}) => {
        return { author: _id }
      }
      );
    return ctx.render({ authors, author: searchedAuthor })
  },
};

export default function Home({ params, data}: PageProps) {
  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      
      <div class="mx-auto my-0 w-3/4 flex flex-col items-center">

          <Search action="/authors/search" />
          <p class='mt-4'>Looking for a quote? Try <a class="underline" href="/quotes/search">Quotes Search</a> </p>

          <div>Displaying {data.authors.length} result{data.authors.length === 1 ? '' : 's'} for '{data.author}'</div>
        <ul class='mt-20 w-full'>

          { data.authors.length === 0 && 
              <div class='text-center'>
                  Sorry, no Authors match that search. Please try a different search.
              </div>
            }
          { data.authors.map(({author}) => {
            return (
                <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-200 w-full">
                    <a href={`/quotes/${author}`} class="text-xl italic font-medium leading-relaxed">{author}</a>
                </blockquote>
            );
            })}
        </ul>
        </div>
    </>
  );
}
