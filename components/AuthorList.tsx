import AuthorCard from './AuthorCard.tsx';
import GridComponent from './GridComponent.tsx';

export default function AuthorList({ authors }){
    return(
        <GridComponent>
            {
                authors.map(({author, quoteCount}) => <AuthorCard author={author} quoteCount={quoteCount}/> )
            }
        </GridComponent>
    )
}