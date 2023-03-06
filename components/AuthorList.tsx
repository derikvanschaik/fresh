import AuthorCard from './AuthorCard.tsx';
import GridComponent from './GridComponent.tsx';

export default function AuthorList({ authors }){
    return(
        <GridComponent>
            {
                authors.map(({author}) => <AuthorCard author={author}/> )
            }
        </GridComponent>
    )
}