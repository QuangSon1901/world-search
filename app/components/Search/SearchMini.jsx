'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Container from '../Container';
import Background from './Background';
import SearchInput from './SearchInput';
import { useState } from 'react';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
const options = [
    { value: 'keyphrase', label: 'Keyphrase', suggest: 'Nhập mọi thứ bạn muốn tìm' },
    {
        value: 'keyword',
        label: 'Keyword',
        suggest: 'Tìm kiếm theo từ khoá. Nhập vào danh sách các từ khoá cách nhau bằng dấu ","',
        filter: [
            {
                value: 'concept',
                label: 'Khái niệm',
            },
            {
                value: 'rule',
                label: 'Quy tắc (tính chất/ định lý/ hệ quả)',
            },
            {
                value: 'method',
                label: 'Bài toán',
            },
            {
                value: 'func',
                label: 'Phương pháp/ Thuật giải',
            },
        ],
    },
    {
        value: 'syntax',
        label: 'Syntax',
        suggest: 'Nhập dữ liệu theo dạng câu truy vấn "Ks|Condition|Es" (Ks và Es bắt buộc phải có).',
    },
];

const SearchMini = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const type = searchParams.get('type');
    let filter = searchParams.get('filter');
    filter = filter && filter.split('|');
    const router = useRouter();

    const [searchInput, setSearchInput] = useState((type === 'syntax' && q.split('|')[0]) || q || '');
    const [searchInputCondition, setSearchInputCondition] = useState((type === 'syntax' && q.split('|')[1]) || '');
    const [searchInputEs, setSearchInputEs] = useState((type === 'syntax' && q.split('|')[2]) || '');
    const [searchKeyword, setSearchKeyword] = useState({
        concept: (filter && filter.includes('concept')) || false,
        rule: (filter && filter.includes('rule')) || false,
        func: (filter && filter.includes('func')) || false,
        method: (filter && filter.includes('method')) || false,
    });
    const [optionSearch, setOptionSearch] = useState(
        (type && options.find((value) => value.value === type)) || options[0],
    );

    const handleChangeSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSubmit = () => {
        let result = '';
        let query = searchInput;
        if (optionSearch.value === 'keyword') {
            const trueElements = Object.entries(searchKeyword)
                .filter(([key, value]) => value === true)
                .map(([key, value]) => key);

            result = trueElements.join('|');
        }
        if (optionSearch.value === 'syntax') {
            query = `${searchInput}|${searchInputCondition}|${searchInputEs}`;
        }
        Loading.circle({ svgColor: '#2563EB', zindex: '9999999' });
        router.push(`/search-result?q=${query}&type=${optionSearch.value}&filter=${result}`);
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
                            searchInputCondition={searchInputCondition}
                            searchInputEs={searchInputEs}
                            onChange={handleChangeSearchInput}
                            onChangeCondition={(e) => setSearchInputCondition(e.target.value)}
                            onChangeEs={(e) => setSearchInputEs(e.target.value)}
                            onSubmit={handleSubmit}
                            optionSearch={optionSearch}
                            options={options}
                            onChangeOptionSearch={handleChangeOptionSearch}
                            searchKeyword={searchKeyword}
                            setSearchKeyword={setSearchKeyword}
                        />
                    </div>
                </Container>
            </Background>
        </div>
    );
};

export default SearchMini;
