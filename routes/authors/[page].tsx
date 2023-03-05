import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import SearchSettings from '../../islands/SearchSettings.tsx';
import NavBar from '../../components/NavBar.tsx';
import { getResults, redirectOnSort, resultsTemplate } from '../../components/Browse.tsx';


export const handler: Handlers = {

  async GET(req, ctx) {
    const { data, sortQuery, errorMessage } = await getResults(req, ctx, `${Deno.env.get("API_URL")}/authors`)
    const authors = (data).map(({_id}) =>{
      return {
        author: _id
      }
    })
    return ctx.render({ data: authors , sortQuery, errorMessage })
  },
  async POST(req, ctx){
    const baseURL = '/authors/1';
    return redirectOnSort(req, baseURL);
  }
};

export default function Home({ params, data}: PageProps) {
  return (
    <>
    { resultsTemplate(data, params, 'author') }
      
    </>
  );
}
