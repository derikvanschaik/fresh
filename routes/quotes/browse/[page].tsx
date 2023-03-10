import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import SearchSettings from '../../../islands/SearchSettings.tsx';
import NavBar from '../../../components/NavBar.tsx';
import PaginationNav from '../../../components/PaginationNav.tsx';
import QuoteList from '../../../components/QuoteList.tsx';
import ErrorCard from '../../../components/ErrorCard.tsx';
import { getResults, redirectOnSort } from '../../../utils/utils.tsx';


export const handler: Handlers = {

  async GET(req, ctx) {
    const { data, errorMessage } = await getResults(req, ctx, `${Deno.env.get("API_URL")}/quotes`)
    if(!errorMessage){
      const quotes = (data).map(({quote, author}) =>{
        return {
          author,
          quote
        }
      })
      return ctx.render({ quotes , errorMessage })
    }
    return ctx.render( {quotes: [], errorMessage })
  },
};

export default function BrowseQuotes({ params, data}: PageProps) {
  const next = `${parseInt(params.page) + 1}`;
  const prev = `${parseInt(params.page) - 1}`;

  return (
      <div>
        <NavBar />
        <div class="mx-auto my-0 w-3/4">
          <div>
              <PaginationNav next={next} prev={prev} />
              { data.errorMessage && <ErrorCard message={ data.errorMessage } /> }
              <QuoteList quotes={data.quotes}/>
          </div>
        </div>
      </div>
  );
}