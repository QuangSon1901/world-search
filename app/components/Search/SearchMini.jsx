'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Container from '../Container';
import Background from './Background';
import SearchInput from './SearchInput';
import { useState } from 'react';

const SearchMini = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');

    const router = useRouter();

    const [searchInput, setSearchInput] = useState(q);

    const handleChangeSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSubmit = () => {
        router.push(`/search-result?q=${searchInput}`);
    };

    return (
        <div>
            <Background>
                <Container>
                    <div className="pt-20 pb-20 text-center">
                        <SearchInput
                            searchInput={searchInput}
                            onChange={handleChangeSearchInput}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </Container>
            </Background>
        </div>
    );
};

export default SearchMini;
