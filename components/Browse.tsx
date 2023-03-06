import { Head } from "$fresh/runtime.ts";
import NavBar from './NavBar.tsx';
import SearchSettings from '../islands/SearchSettings.tsx'
import AuthorCard from './AuthorCard.tsx';
import QuoteCard from './QuoteCard.tsx';

export async function getResults(req: any, ctx: any, baseURL: string ):
  { data: any, sortQuery: string | null, errorMessage: any } {

    const resultsPerPage = 50;
    const page = parseInt( ctx.params.page );
    let url = `${baseURL}?page=${page - 1}&limit=${resultsPerPage}`;
    const sortQuery = new URL(req.url).searchParams.get("sort");

    if (new URL(req.url).searchParams.has("sort")){
      url += '&sort=' + sortQuery; 
    }
    const sortQueryResult = sortQuery === '0' || sortQuery === '1'? sortQuery : null;

    try{
      const resp = await fetch(url);
      const data = await resp.json();
      // invalid from server 
      if(resp.status == 400){
        return { data, sortQuery: sortQueryResult, errorMessage: "An error occurred."};
      }else {
        return { data, sortQuery: sortQueryResult, errorMessage: null };
      }
    }catch(err){
      return { data: [], sortQuery: sortQueryResult, errorMessage: "An error occurred."};
    }
}
export async function redirectOnSort(req: any, baseLocation: string){
    const form = await req.formData();
    const sortValue = form.get("sort");
    const hasSort = sortValue == "1" || sortValue == "0";
    // redirect back to page with the sort value
    return new Response("", {
      // redirects to get when status is 303
      status: 303,
      headers: { Location: `${baseLocation}${hasSort? '?sort=' + sortValue : ''}`},
    });
}
export function resultsTemplate(data: any, params: any, browseType: string){
    const sort = data.sortQuery;
    const hasSort = data.sortQuery !== null;
    const isAuthor = browseType === 'author';
    // change this if browsing quotes 
    let base = '/authors';
    if(!isAuthor){
        base = '/quotes/browse';
    }
    const next = `${base}/${parseInt(params.page) + 1}${hasSort? '?sort=' + sort : ''}`;
    const prev = `${base}/${parseInt(params.page) - 1}${hasSort? '?sort=' + sort : ''}`;
    return (
      <>
      <Head>
        <title>Browse</title>
      </Head>

      <div>
        <NavBar />
        <div class="mx-auto my-0 w-3/4">
      <div>
          {isAuthor &&  <SearchSettings sort={sort} action='/authors/1' /> }
          <div class='flex flex-row justify-center items-center'>
            <a 
              class="underline font-bold py-2 px-4 rounded text-2xl" 
              href={prev}>PREV</a>
            <a 
              class="underline font-bold py-2 px-4 rounded text-2xl" 
              href={next}>NEXT</a>

          </div>
          { data.errorMessage && 
            <div class='text-center px-5 py-2 border-1 border-red-500 rounded bg-red-100'>
              <h1 class='text-lg'><span class='text-xl text-red-700 font-bold italic'>ERROR: </span>{data.errorMessage}</h1>
            </div>
            }
          <ul class='flex flex-col items-center w-full'>
            { data.data.map( ({ author, quote }) => {
              if (isAuthor){
                  return <AuthorCard author={author} />
              }else{
                return <QuoteCard quote={quote} author={author} />
              }
              })}
          </ul>
      </div>

        </div>
      </div>
      </>
  );
}
