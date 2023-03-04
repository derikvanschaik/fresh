import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Search from "../../components/Search.tsx";
import { getSearchValueAndResponse, resultsTemplate } from "../../components/Search.tsx";
import NavBar from '../../components/NavBar.tsx';

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
      { resultsTemplate(data.authors, 'author') }
      {/* <Head>
        <title>Search Results</title>
      </Head>
      <div>
        <NavBar />
        <div class="mx-auto my-0 w-3/4 flex flex-col items-center">
          <h1 class='font-bold text-xl'>Author Search</h1>
          <p>
            <p class='mt-4'>Looking for a quote? Try <a class="underline" href="/quotes/search">Quotes Search</a> </p>
          </p>
          <Search action="/authors/search" />
          <ul class='w-full'>
          <div class='text-center'>{data.authors.length} result{data.authors.length === 1 ? '' : 's'}</div>
          { data.authors.length === 0 && 
              <div class='text-center'>
                  Sorry, no Authors match that search. Please try a different search.
              </div>
            }
          { data.authors.map(({author}) => {
            return (
                <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-200 w-full">
                    <a href={`/quotes/${author}`} class="text-xl italic font-medium leading-relaxed underline">{author}</a>
                </blockquote>
            );
            })}
          </ul>
          </div>
      </div> */}
     
    </>
  );
}
