export interface PaginationNavProps {
    next: string, 
    prev: string,
}
export default function PaginationNav({ next, prev}: PaginationNavProps){
    return (
        <div class='flex flex-row justify-center items-center'>
            <a 
                class="underline font-bold py-2 px-4 rounded text-2xl" 
                href={prev}>PREV</a>
            <a 
                class="underline font-bold py-2 px-4 rounded text-2xl" 
                href={next}>NEXT</a>

      </div>
    )
}