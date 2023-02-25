export default function AuthorSearch(){
    return (
        <form class='my-4 w-5/6 md:w-3/4 lg:w-1/2 h-32 flex flex-col items-center justify-around' action="/authors/search" method="POST">
        <input 
            type="text"
            name="author"
            class="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Author Name" required />
          <button class="bg-black hover:bg-yellow-200 hover:text-black text-white font-bold py-2 px-4 rounded">
            Search
          </button>
      </form>
    )

}
