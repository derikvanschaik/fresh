import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import SearchSettings from '../../../islands/SearchSettings.tsx';
import NavBar from '../../../components/NavBar.tsx';
import { getResults, redirectOnSort, resultsTemplate } from '../../../components/Browse.tsx';


export const handler: Handlers = {

  async GET(req, ctx) {
    const { data, sortQuery, errorMessage } = await getResults(req, ctx, `${Deno.env.get("API_URL")}/quotes`)
    if(!errorMessage){
      const quotes = (data).map(({quote, author}) =>{
        return {
          author,
          quote
        }
      })
      return ctx.render({ data: quotes , sortQuery, errorMessage })
    }
    return ctx.render( {data: [], sortQuery, errorMessage })
  },
//   async POST(req, ctx){
//     const baseURL = '/quotes/browse/1';
//     return redirectOnSort(req, baseURL);
//   }
};

export default function Home({ params, data}: PageProps) {
  return (
    <>
    { resultsTemplate(data, params, 'quote') }
      
    </>
  );
}