import { Head } from "$fresh/runtime.ts";

export async function getResults(req: any, ctx: any, baseURL: string ):
  { data: any, sortQuery: string | null, errorMessage: any } {

    const resultsPerPage = 50;
    const page = parseInt( ctx.params.page );
    let url = `${baseURL}?page=${page - 1}&limit=${resultsPerPage}`;
    const sortQuery = new URL(req.url).searchParams.get("sort");
    const sortBy = new URL(req.url).searchParams.get("sortBy");
    if (new URL(req.url).searchParams.has("sort")){
      url += '&sort=' + sortQuery; 
    }
    if (new URL(req.url).searchParams.has("sortBy")){
      url += '&sortBy=' + sortBy; 
    }
    const sortQueryResult = sortQuery === '0' || sortQuery === '1'? sortQuery : null;

    try{
      const resp = await fetch(url);
      const data = await resp.json();
      // invalid from server 
      if(resp.status == 400){
        return { data, sortQuery: { value : sortQueryResult, type: sortBy }, errorMessage: "An error occurred."};
      }else {
        return { data, sortQuery: { value : sortQueryResult, type: sortBy }, errorMessage: null };
      }
    }catch(err){
      return { data: [], sortQuery: { value : sortQueryResult, type: sortBy }, errorMessage: "An error occurred."};
    }
}
export async function redirectOnSort(req: any, baseLocation: string){
    const form = await req.formData();
    const sortValue = form.get("sort");
    const sortBy = form.get("sortBy");

    const hasSort = sortValue == "1" || sortValue == "0";
    // redirect back to page with the sort value
    return new Response("", {
      // redirects to get when status is 303
      status: 303,
      headers: { Location: `${baseLocation}${hasSort? '?sort=' + sortValue : ''}${sortBy? '&sortBy=' + sortBy:''}`},
    });
}

export async function getSearchValueAndResponse(req: any, url: string): [string, any] {
  const form = await req.formData();
  const search = form.get("search");
  const resp = await fetch(`${url}?includes=${search}`);
  const data = await resp.json();
  return [search, data];
}
