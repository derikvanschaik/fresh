import { Handlers, PageProps } from "$fresh/server.ts";


export const handler: Handlers = {
  async GET(_, ctx) {
    const authorID = ctx.params.author;
    const resp = await fetch(`${Deno.env.get("API_URL")}/authors/${authorID}`);
    const data = await resp.json();
    const authorData = data.author;
    return ctx.render({ quotes: authorData.quotes, author: authorData.author })
    
  },
};
export default function Greet({params, data }: PageProps) {
  return (
    <div class='w-3/4 mx-auto my-0' id="top">
      <h1 
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Quotes by <span class="text-blue-600 dark:text-blue-500">{data.author}</span> :</h1>
      <ul>
        { data.quotes.map(quote => {
          return (
            <>
              <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-200">
                  <p class="text-xl italic font-medium leading-relaxed text-grey-400">"{quote}"</p>
              </blockquote>
            </>

          );
          })}
      </ul>
    </div>
  )
}
