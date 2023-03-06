import Card from './Card.tsx';

export default function QuoteCard({ author, quote }){
    return (
        <Card>
            <p class="px-4 text-2xl font-bold italic">
              <span class='font-extrabold font-italic text-3xl'>"</span>
              {quote}
              <span class='font-extrabold font-italic text-3xl'>"</span>
            </p>
            <a 
                href={`/quotes/${author}`} 
                class="text-xl italic font-medium leading-relaxed underline">{author}</a>
        </Card>

    )
}