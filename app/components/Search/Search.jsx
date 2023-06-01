'use client';

import { useRouter } from 'next/navigation';
import Container from '../Container';
import Background from './Background';
import SearchInput from './SearchInput';
import { useState } from 'react';

const options = [
    { value: 'keyphrase', label: 'Keyphrase', suggest: 'Nhập mọi thứ bạn muốn tìm' },
    {
        value: 'keyword',
        label: 'Keyword',
        suggest: 'Tìm kiếm theo từ khoá. Nhập vào danh sách các từ khoá cách nhau bằng dấu ","',
    },
    {
        value: 'syntax',
        label: 'Syntax',
        suggest: 'Nhập dữ liệu theo dạng câu truy vấn "Ks|Condition|Es" (Ks và Es bắt buộc phải có).',
    },
];

export default function Search() {
    const router = useRouter();

    const [searchInput, setSearchInput] = useState('');
    const [optionSearch, setOptionSearch] = useState(options[0]);

    const handleChangeSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSubmit = () => {
        router.push(`/search-result?q=${searchInput}&type=${optionSearch.value}`);
    };

    const handleChangeOptionSearch = (e) => {
        setOptionSearch(options.find((value) => value.value === e.target.value));
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
                            optionSearch={optionSearch}
                            options={options}
                            onChangeOptionSearch={handleChangeOptionSearch}
                            onChange={handleChangeSearchInput}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </Container>
            </Background>
        </div>
    );
}
