export default function GridComponent({ children }){
    return (
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            { children }
        </div>
    )
}