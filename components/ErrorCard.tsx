export interface ErrorCardProps {
    message: string 
}
export default function ErrorCard({ message }: ErrorCardProps ){
    return (
        <div class='text-center px-5 py-2 border-1 border-red-500 rounded bg-red-100'>
            <h1 class='text-lg'>
                <span class='text-xl text-red-700 font-bold italic'>ERROR: </span>
                {message}
            </h1>
        </div>
    )
}