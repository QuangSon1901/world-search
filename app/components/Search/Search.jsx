'use client';

import { useRouter } from 'next/navigation';
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

export default function Search() {
    const router = useRouter();

    const [searchInput, setSearchInput] = useState('');
    const [searchInputCondition, setSearchInputCondition] = useState('');
    const [searchInputEs, setSearchInputEs] = useState('');
    const [searchKeyword, setSearchKeyword] = useState({ concept: false, rule: false, func: false, method: false });
    const [optionSearch, setOptionSearch] = useState(options[0]);
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
                            searchInputCondition={searchInputCondition}
                            searchInputEs={searchInputEs}
                            optionSearch={optionSearch}
                            options={options}
                            onChangeOptionSearch={handleChangeOptionSearch}
                            onChange={handleChangeSearchInput}
                            onChangeCondition={(e) => setSearchInputCondition(e.target.value)}
                            onChangeEs={(e) => setSearchInputEs(e.target.value)}
                            onSubmit={handleSubmit}
                            searchKeyword={searchKeyword}
                            setSearchKeyword={setSearchKeyword}
                        />
                    </div>
                </Container>
            </Background>
        </div>
    );
}
