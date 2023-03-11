import Card from './Card.tsx';
import PillBadge from './PillBadge.tsx'

export default function AuthorCard({ author, quoteCount }){
    return (
        <Card>
            <div class='flex flex-row items-center justify-center'>
                <a 
                    href={`/quotes/${author}`} 
                    class="text-xl italic font-medium leading-relaxed underline">{author}</a>
                <PillBadge text={quoteCount}/>
            </div>
        </Card>

    )
}