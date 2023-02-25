import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import AuthorSearch from "../../components/AuthorSearch.tsx";


export const handler: Handlers = {
  async GET(req, ctx){
      return ctx.render({ authors: [], author: ''})
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const searchedAuthor = form.get("author").toLowerCase();
    const resp = await fetch(`https://type.fit/api/quotes`);
    const authors = new Set();
    (await resp.json() ).map(({author, text}) => {
      const auth = author? author: 'Anonymous';
      if(!authors.has(auth)){
        if(auth.toLowerCase().includes(searchedAuthor) || searchedAuthor.includes(auth.toLowerCase()) ){
            authors.add(auth);
        }
      }
    });

    return ctx.render({ authors: [...authors], author: searchedAuthor })
  },
};

export default function Home({ params, data}: PageProps) {
  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      
      <div class="mx-auto my-0 w-3/4 flex flex-col items-center">
          <AuthorSearch />
          <div>Displaying {data.authors.length} result{data.authors.length === 1 ? '' : 's'} for '{data.author}'</div>
        <ul class='mt-20 w-full'>
          { data.authors.length === 0 && 
              <div>
                  Sorry, no Authors match that search. Please try a different search.
              </div>
            }
          { data.authors.map(author => {
            return (
                <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-200 w-full">
                    <a href={`/quotes/${author}`} class="text-xl italic font-medium leading-relaxed text-grey-400 underlined">{author}</a>
                </blockquote>

            );
            })}
        </ul>
        </div>
    </>
  );
}
