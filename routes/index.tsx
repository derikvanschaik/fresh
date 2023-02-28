import AuthorSearch from "../components/AuthorSearch.tsx";

export default function Home() {
    // const background = {
    //     backgroundImage: `url(${'/landscape.jpeg'})`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'top',
    //     backgroundRepeat: 'no-repeat'
    // }
  return (
          <div class='w-full h-screen flex flex-col items-center justify-around' >
                <div class='bg-black border-2 border-yellow-200 rounded-lg px-10 py-5'>
                        <h1 class="text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">Fresh Quotes</h1>
                        {/* fresh js badge */}
                        <img width="197" height="37" src="https://fresh.deno.dev/fresh-badge-dark.svg" alt="Made with Fresh" />
                </div>

            <AuthorSearch />

            <div class="text-center bg-gray-500 py-24 px-6 bg-opacity-70 rounded-md">
                <h1 class="text-lg tracking-tight mb-12 text-gray-100">Browse our vast collection of quotes from <br /><span class="text-5xl font-bold italic text-yellow-300">676 authors</span> and become inspired...</h1>
                <a 
                    class="inline-block px-7 py-3 mr-2 bg-black text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-yellow-200 hover:text-black hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out animate-bounce" 
                    data-mdb-ripple="true" 
                    data-mdb-ripple-color="light" 
                    href="/authors/1" 
                    role="button">
                        See Authors</a>
                {/* <a class="inline-block px-7 py-3 bg-transparent text-blue-600 font-medium text-sm leading-snug uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light" href="#!" role="button">Learn more</a> */}
            </div>

          </div>
  );
}