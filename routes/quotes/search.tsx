import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import SearchComponent from "../../components/SearchComponent.tsx";
import { getSearchValueAndResponse } from '../../utils/utils.tsx'
import NavBar from '../../components/NavBar.tsx';

export const handler: Handlers = {
  async GET(req, ctx){
      return ctx.render({ quotes : [], quote: ''})
  },
  async POST(req, ctx) {
    const endpoint = `${Deno.env.get("API_URL")}/quotes`;
    const [ searchedQuote , data ] = await getSearchValueAndResponse(req, endpoint);
    // parse api return value 
    const quotes = data;
    return ctx.render({ quotes, quote: searchedQuote })
  },
};

export default function Home({ params, data}: PageProps) {
  return (
    <>
      <SearchComponent results={data.quotes} searchType='quote' />
    </>
  );
}
