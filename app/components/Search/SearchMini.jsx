'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Container from '../Container';
import Background from './Background';
import SearchInput from './SearchInput';
import { useState } from 'react';

const options = [
    { value: 'natural', label: 'Natural', suggest: 'Nhập mọi thứ bạn muốn tìm' },
    { value: 'keyphrase', label: 'Keyphrase', suggest: 'Nhập vào danh sách các keyphrase cách nhau bằng dấu ","' },
    {
        value: 'syntax',
        label: 'Syntax',
        suggest:
            'Nhập dữ liệu theo dạng câu truy vấn "Ks|Condition|Es" (Ks và Es bắt buộc phải có). VD: Định nghĩa, ví dụ | liên quan đến | đồ thị',
    },
];

const SearchMini = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const type = searchParams.get('type');

    const router = useRouter();

    const [searchInput, setSearchInput] = useState(q);
    const [optionSearch, setOptionSearch] = useState(
        (type && options.find((value) => value.value === type)) || options[0],
    );

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
                    <div className="pt-20 pb-20 text-center">
                        <SearchInput
                            searchInput={searchInput}
                            onChange={handleChangeSearchInput}
                            onSubmit={handleSubmit}
                            optionSearch={optionSearch}
                            options={options}
                            onChangeOptionSearch={handleChangeOptionSearch}
                        />
                    </div>
                </Container>
            </Background>
        </div>
    );
};

export default SearchMini;
