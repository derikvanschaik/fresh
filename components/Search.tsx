import { Head } from "$fresh/runtime.ts";
import NavBar from './NavBar.tsx';

interface SearchProps {
  action: string
}

export default function Search({ action }: SearchProps){
    return (
        <form class='my-4 w-5/6 md:w-3/4 lg:w-1/2 h-32 flex flex-col items-center justify-around' action={action} method="POST">
        <input 
            type="text"
            name="search"
            class="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          <button class="bg-black hover:bg-yellow-200 hover:text-black text-white font-bold py-2 px-4 rounded">
            Search
          </button>
      </form>
    )
}

export async function getSearchValueAndResponse(req: any, url: string): [string, any] {
  const form = await req.formData();
  const search = form.get("search");
  const resp = await fetch(`${url}?includes=${search}`);
  const data = await resp.json();
  return [search, data];
}

export function resultsTemplate(data: any, searchType: string){
  const isAuthor = searchType === 'author';

  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      <div>
        <NavBar />
        <div class="mx-auto my-0 w-3/4 flex flex-col items-center">
          <h1 class='font-bold text-xl'>{isAuthor? 'Author': 'Quote'} Search</h1>
          <p>
            <p class='mt-4'>
              Looking for {isAuthor? 'a quote': 'an author'}? Try <a class="underline" href={`/${isAuthor? 'quotes': 'authors'}/search`}>{isAuthor? 'Quote': 'Author'} Search</a> </p>
          </p>
          <Search action={`/${isAuthor? 'authors': 'quotes'}/search`} />
          <ul class='w-full'>
          <div class='text-center'>{data.length} result{data.length === 1 ? '' : 's'}</div>
          { data.length === 0 && 
              <div class='text-center'>
                  Sorry, no {isAuthor? 'authors': 'quotes'} match that search. Please try a different search.
              </div>
            }
          { data.map((object) => {
            if (isAuthor){
              const {author} = object;
              return (
                <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-200 w-full">
                    <a href={`/quotes/${author}`} class="text-xl italic font-medium leading-relaxed underline">{author}</a>
                </blockquote>
              );
            }else{
              const {author, quote} = object;
              return (
                <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-200 w-full">
                    <p>'{quote}'</p>
                    <a href={`/quotes/${author}`} class="text-xl italic font-medium leading-relaxed underline">{author}</a>
                </blockquote>
            );
            }
            })}
          </ul>
          </div>
      </div>
     
    </>
  );
}
