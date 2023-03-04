import NavBar from '../components/NavBar.tsx';

export default function Home() {
  return (
          <div class='w-full' >
              <NavBar />
                {/* <div class='px-10 py-2'>
                        <h1 class="text-lg font-semibold leading-none tracking-tight">Fresh Quotes</h1>
                        <img width="197" height="37" src="https://fresh.deno.dev/fresh-badge.svg" alt="Made with Fresh" />
                </div> */}

            <div class="w-full text-center bg-purple-400 py-24 px-6">
                <h1 class="text-2xl tracking-tight mb-12 text-gray-100">Browse our vast collection of quotes from <br /><span class="text-5xl font-bold italic text-yellow-300">676 authors</span> and become inspired...</h1>
                <a 
                    class="inline-block px-7 py-3 mr-2 bg-black text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-yellow-200 hover:text-black hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out animate-bounce" 
                    data-mdb-ripple="true" 
                    data-mdb-ripple-color="light" 
                    href="/authors/1" 
                    role="button">
                        See Authors</a>
                <h1 class="mt-8 text-2xl tracking-tight mb-12 text-gray-100">or try searching for an author of your choice </h1>


                  <div class="">
                      <a href='/authors/search' class='flex flex-row items-center justify-center'>
                          <svg aria-hidden="true" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                          <h4 class='pl-2'>Begin your search</h4>
                      </a>
                  </div>
            </div>
          </div>
  );
}