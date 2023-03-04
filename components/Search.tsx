interface SearchProps {
  action: string
}
export default function Search({ action }: SearchProps){
    return (
        <form class='my-4 w-5/6 md:w-3/4 lg:w-1/2 h-32 flex flex-col items-center justify-around' action={action} method="POST">
        <input 
            type="text"
            name="search"
            class="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          <button class="bg-black hover:bg-yellow-200 hover:text-black text-white font-bold py-2 px-4 rounded">
            Search
          </button>
      </form>
    )
}

export async function getSearchValueAndResponse(req: any, url: string): [string, any] {
  const form = await req.formData();
  const search = form.get("search");
  const resp = await fetch(`${url}?includes=${search}`);
  const data = await resp.json();
  return [search, data];

}
