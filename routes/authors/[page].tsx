import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";


export const handler: Handlers = {
  async GET(_, ctx) {
    const resultsPerPage = 50;
    const page = parseInt( ctx.params.page );
    const resp = await fetch(`${Deno.env.get("API_URL")}/authors?page=${page - 1}&limit=${resultsPerPage}`);
    const authors = await resp.json();
    return ctx.render({ authors })
  },
};

export default function Home({ params, data}: PageProps) {
  return (
    <>
      <Head>
        <title>Authors</title>
      </Head>
      <div class="mx-auto my-0 w-3/4">
      <div class="relative fixed top-0 left-0 w-full bg-gray-300 bg-opacity-50 flex flex-row justify-center items-center">
        <a class='absolute top-0 left-0 font-bold' href='/authors/search'>Search</a>
        <a class="text-gray-400 font-bold py-2 px-4 rounded" href={`/authors/${parseInt(params.page) - 1}`}>Previous</a>
        <a class="text-gray-400 font-bold py-2 px-4 rounded" href={`/authors/${parseInt(params.page) + 1}`}>Next</a>
      </div>
        <ul class='mt-20'>
          { data.authors.map( ({_id, author }) => {
            return (
              <>
                <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-200">
                    <a href={`/quotes/${_id}`} class="text-xl italic font-medium leading-relaxed">{author}</a>
                </blockquote>
              </>

            );
            })}
        </ul>
        </div>
    </>
  );
}
