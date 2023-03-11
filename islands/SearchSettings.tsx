import { useState } from "preact/hooks";

export default function SearchSettings({sort, action, sortBy }: any ){

    const [open, setOpen] = useState(false);

    return (
        <>
        <div class='flex flex-row justify-center items-center'>
            {/* more icon */}
            <button onClick={() => setOpen(!open)} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <div>
                Settings
            </div>
        </div>

        <div class='flex flex-col justify-center items-center'>
        {
            open &&
            <>
            <form method="POST" action={action}>
                <h1>Sort By:</h1>
                <select
                class='px-3 py-1 border-1 border-black rounded-md mb-2'
                name="sortBy">
                {
                    [
                        {value: "author_name", text: 'Author Name'}, 
                        {value: "quote_count", text: 'Author Quote Count'}
                    ].map( ({value, text}) =>{
                    if(value === sortBy){
                        return <option value={value} selected>{text}</option>
                    }else{
                        return <option value={value} >{text}</option>
                    }
                    })
                }
                </select>

                <label class="block text-sm font-medium text-gray-900 mb-2">Sort Type:</label>
                <select
                class='px-3 py-1 border-1 border-black rounded-md mb-2'
                name="sort">
                {
                    [
                        {value: "0", text: 'Ascending (A-Z)'}, 
                        {value: "1", text: 'Descending (A-Z)'}
                    ].map( ({value, text}) =>{
                    if(value === sort){
                        return <option value={value} selected>{text}</option>
                    }else{
                        return <option value={value} >{text}</option>
                    }
                    })
                }
                </select>
                <button class='block text-sm font-medium border-2 border-black rounded-md py-1 px-3'>Change Sort</button>
                <h1 class='text-gray-600 font-light text-lg mb-2'>Press Change Sort to apply your sort settings above </h1>
            </form>
            <h1 class='text-gray-4=600 font-light text-lg'><span class='italic'>OR </span>Press clear sort to revert to original browse settings </h1>
            <form method="POST" action={action}>
                <input name="sort"  type="hidden" value="clear_sort"></input>
                <button class='block text-sm font-medium border-2 border-black bg-purple-100 rounded-md py-1 px-3'>Clear Sort</button>
            </form>
            </>

        }
        </div>
        
        </>

    );
}