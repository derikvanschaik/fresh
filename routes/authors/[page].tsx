import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import SearchSettings from '../../islands/SearchSettings.tsx';
import NavBar from '../../components/NavBar.tsx';
import PaginationNav from '../../components/PaginationNav.tsx';
import AuthorList from '../../components/AuthorList.tsx';
import ErrorCard from '../../components/ErrorCard.tsx';
import { getResults, redirectOnSort } from '../../utils/utils.tsx';


export const handler: Handlers = {

  async GET(req, ctx) {
    const { data, sortQuery, errorMessage } = await getResults(req, ctx, `${Deno.env.get("API_URL")}/authors`)
    let authors = [];
    if(!errorMessage){
      authors = (data).map(([author, quoteCount]) =>{
        return {
          author,
          quoteCount
        }
      })
    }
    return ctx.render({ authors , sortQuery, errorMessage })
  },
  async POST(req, ctx){
    const baseURL = '/authors/1';
    return redirectOnSort(req, baseURL);
  }
};

export default function AuthorsPage({ params, data}: PageProps) {
  const hasSort = data.sortQuery.value !== null
  const value = data.sortQuery.value
  const type = data.sortQuery.type;
  const next = `${parseInt(params.page) + 1}${hasSort? '?sort=' +  value : ''}${type? '&sortBy=' + type : ''}`;
  const prev = `${parseInt(params.page) - 1}${hasSort? '?sort=' + value : ''}${type? '&sortBy=' + type : ''}`;

  return (
      <div>
        <NavBar />
        <div class="mx-auto my-0 w-3/4">
          <div>
              <PaginationNav next={next} prev={prev} />
              <SearchSettings sort={value} action='/authors/1' sortBy={type}/>
              { data.errorMessage && <ErrorCard message={ data.errorMessage } /> }
              <AuthorList authors={data.authors}/>
          </div>
        </div>
      </div>
  );
}
