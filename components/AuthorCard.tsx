import Card from './Card.tsx';

export default function AuthorCard({ author}){
    return (
        <Card>
            <a 
                href={`/quotes/${author}`} 
                class="text-xl italic font-medium leading-relaxed underline">{author}</a>
        </Card>

    )
}