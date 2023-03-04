export default function NavBar(){
    return (
        <nav class="flex items-center justify-between flex-wrap p-6">
        <div class="flex items-center flex-shrink-0 mr-6">
            <span class="font-semibold text-xl tracking-tight">Fresh Quotes</span>
        </div>
        <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
            <a href="/authors/1" class="block mt-4 lg:inline-block lg:mt-0 mr-4">
                Authors
            </a>
            {/* TODO: create a quotes browse page */}
            <a href="/quotes/search" class="block mt-4 lg:inline-block lg:mt-0 mr-4">
                Quotes
            </a>
            <a href="/authors/search" class="block mt-4 lg:inline-block lg:mt-0">
                Search
            </a>
            </div>
            <div>
            </div>
        </div>
    </nav>
    )

}