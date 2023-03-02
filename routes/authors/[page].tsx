import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import SearchSettings from '../../islands/SearchSettings.tsx';


export const handler: Handlers = {
  async GET(req, ctx) {
    const resultsPerPage = 50;
    const page = parseInt( ctx.params.page );
    let url = `${Deno.env.get("API_URL")}/authors?page=${page - 1}&limit=${resultsPerPage}`;
    const sortQuery = new URL(req.url).searchParams.get("sort");

    if (new URL(req.url).searchParams.has("sort")){
      url += '&sort=' + sortQuery; 
    }
    const resp = await fetch(url);
    const authors = (await resp.json()).map(({_id}) =>{
      return {
        author: _id
      }
    })
    // api 

    return ctx.render({ authors , sortQuery })
  },
  async POST(req, ctx){
    const form = await req.formData();
    const sortValue = form.get("sort");
    const hasSort = sortValue == "1" || sortValue == "0";
    // redirect back to this page with the sort value
    return new Response("", {
      // redirects to get when status is 303
      status: 303,
      headers: { Location: `/authors/1${hasSort? '?sort=' + sortValue : ''}`},
    });
  }
};

export default function Home({ params, data}: PageProps) {
  const sort = data.sortQuery;
  const hasSort = data.sortQuery !== null;
  return (
    <>
      <Head>
        <title>Authors</title>
      </Head>
      <div class="mx-auto my-0 w-3/4">
        {/* navigation + search */}
      <div class="relative fixed top-0 left-0 w-full bg-gray-300 bg-opacity-50 flex flex-row justify-center items-center">
        <a class='absolute top-0 left-0 font-bold' href='/authors/search'>Search</a>
        <a 
          class="text-gray-400 font-bold py-2 px-4 rounded" 
          href={`/authors/${parseInt(params.page) - 1}${hasSort? '?sort=' + sort : ''}`}>Previous</a>
        <a 
        class="text-gray-400 font-bold py-2 px-4 rounded" 
        href={`/authors/${parseInt(params.page) + 1}${hasSort? '?sort=' + sort : ''}`}>Next</a>
      </div>
      {/* add sort option */}
      <div class='mt-20'>
      <SearchSettings sort={sort}/>

          <ul>
            { data.authors.map( ({ author }) => {
              return (
                <>
                  <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-200">
                      <a href={`/quotes/${author}`} class="text-xl italic font-medium leading-relaxed">{author}</a>
                  </blockquote>
                </>

              );
              })}
          </ul>
      </div>

        </div>
    </>
  );
}
