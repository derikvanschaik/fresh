import QuoteCard from './QuoteCard.tsx';
import GridComponent from './GridComponent.tsx';

export default function QuoteList({ quotes }){
    return(
        <GridComponent>
            {
                quotes.map( ({author, quote}) => <QuoteCard quote={quote} author={author}/> )
            }
        </GridComponent>
    )
}