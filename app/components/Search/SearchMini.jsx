import Container from '../Container';
import Background from './Background';
import SearchInput from './SearchInput';

const SearchMini = () => {
    return (
        <div>
            <Background>
                <Container>
                    <div className="pt-20 pb-20 text-center">
                        <SearchInput />
                    </div>
                </Container>
            </Background>
        </div>
    );
};

export default SearchMini;
