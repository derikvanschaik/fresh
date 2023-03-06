export default function Card({ children }){
    return (
        // <div class="w-full my-4 p-4 text-gray-800 bg-blue-100 rounded-lg shadow-lg">
        <div class='w-full my-4 p-6 bg-white border border-gray-200 rounded-lg shadow bg-blue-50'>
        <div class="mb-2 flex flex-col items-center">
            { children }
        </div>
      </div>
    )
}