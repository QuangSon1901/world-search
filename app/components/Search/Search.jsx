'use client';

import { useRouter } from 'next/navigation';
import Container from '../Container';
import Background from './Background';
import SearchInput from './SearchInput';
import { useState } from 'react';

export default function Search() {
    const router = useRouter();

    const [searchInput, setSearchInput] = useState('');

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
                    <div className="pt-24 pb-20 text-center">
                        <h1 className="font-bold text-5xl">
                            <span className="text-text-red">World</span> - Search any thing
                        </h1>
                        <p className="text-2xl mt-11 max-w-2xl mx-auto tracking-widest leading-10">
                            Truy vấn kiến thức chính xác nhất, dễ dàng nhất tại hệ thống tri thức{' '}
                            <span className="text-text-red">World</span> - Search any thing
                        </p>
                        <SearchInput
                            className="mt-24"
                            searchInput={searchInput}
                            onChange={handleChangeSearchInput}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </Container>
            </Background>
        </div>
    );
}
