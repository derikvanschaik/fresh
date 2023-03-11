import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import SearchComponent from "../../components/SearchComponent.tsx";
import { getSearchValueAndResponse } from '../../utils/utils.tsx'
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
      ([author, quoteCount]) => {
        return { author, quoteCount }
      }
      );
    return ctx.render({ authors, author: searchedAuthor })
  },
};

export default function Home({ params, data}: PageProps) {
  return (
    <>
      <SearchComponent results={data.authors} searchType={'author'} />
    </>
  );
}
