import { useState } from "preact/hooks";

export default function SearchSettings({sort, action}: any ){

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

        <div>
        {
            open &&
            <form method="POST" action={action}>
                <label class="block text-sm font-medium text-gray-900 mb-2">Sort:</label>
                <select
                class='px-3 py-1 border-1 border-black rounded-md mb-2'
                name="sort">
                {
                    [
                        {value: null, text: 'No Sort' }, 
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
            </form>

        }
        </div>
        
        </>

    );
}