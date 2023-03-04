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
    </>
  );
}
