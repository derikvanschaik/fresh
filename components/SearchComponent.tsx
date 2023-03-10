import { Head } from "$fresh/runtime.ts";
import NavBar from './NavBar.tsx';
import QuoteCard from './QuoteCard.tsx';
import AuthorCard from './AuthorCard.tsx';

// Combined into one component since the two were so similar 
// honestly this should be removed since I can't scale it, we really just need the form to be in a component
// leaving for now but should be a TODO
interface SearchProps {
  results: any, 
  searchType: string
}
export default function SearchComponent({ results, searchType}: SearchProps ){
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

          {/* Search Form  */}
          <form 
            class='my-4 w-5/6 md:w-3/4 lg:w-1/2 h-32 flex flex-col items-center justify-around' 
            action={`/${isAuthor? 'authors': 'quotes'}/search`} 
            method="POST">
            <input 
                type="text"
                name="search"
                class="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
              <button class="bg-black hover:bg-yellow-200 hover:text-black text-white font-bold py-2 px-4 rounded">
                Search
              </button>
          </form>

          {/*  Search Results */}
          <ul class='w-full'>
          <div class='text-center'>{results.length} result{results.length === 1 ? '' : 's'}</div>
          { results.length === 0 && 
              <div class='text-center'>
                  Sorry, no {isAuthor? 'authors': 'quotes'} match that search. Please try a different search.
              </div>
            }
          { results.map((object) => {
              if (isAuthor){
                const {author} = object;
                return <AuthorCard author={author}/>
              }else{
                const {author, quote} = object;
                return <QuoteCard quote={quote} author={author} />
              }
            })
            }
          </ul>
          </div>
      </div>
     
    </>
  );
}
