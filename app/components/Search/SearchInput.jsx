'use client';
import { FiSearch } from 'react-icons/fi';
import Tippy from '@tippyjs/react/headless';
import PopperWrapper from '../Popper/Wrapper';
import { FiClock, FiArrowUpRight } from 'react-icons/fi';
import { BiChevronDown } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import * as httpRequest from '@/libs/httpRequest';
import { storage } from '@/libs/storage';
import { useRouter } from 'next/navigation';

const searchInit = {
    history: [],
    historyCount: 0,
    suggest: [],
};

export default function SearchInput({
    searchInput = '',
    searchInputCondition = '',
    searchInputEs = '',
    className,
    onChange,
    onChangeCondition,
    onChangeEs,
    onSubmit,
    onChangeOptionSearch,
    optionSearch,
    options,
    searchKeyword,
    setSearchKeyword,
}) {
    const router = useRouter();
    const [searchResult, setSearchResult] = useState(searchInit);
    const [historyLimit, setHistoryLimit] = useState(true);
    const [suggest, setSuggest] = useState(false);

    const debouncedValue = useDebounce(searchInput, 500);
    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) return setSearchResult({ ...searchResult, suggest: [] });

        const fetchSuggestApi = async () => {
            try {
                const res = await httpRequest.get(`${process.env.NEXT_PUBLIC_API_URL}/keyphrase`, {
                    params: { q: debouncedValue, suggest: true },
                });
                setSearchResult({
                    ...searchResult,
                    suggest: res.result,
                });
            } catch (error) {}
        };

        fetchSuggestApi();
    }, [debouncedValue]);

    useEffect(() => {
        const fetchApiHistory = async () => {
            const token = storage.get('ACCESS_TOKEN');
            if (!token) {
                return;
            }
            try {
                const res = await httpRequest.get(`${process.env.NEXT_PUBLIC_API_URL}/get-history-search`, {
                    params: { q: debouncedValue, type: optionSearch.value.toUpperCase(), limit: historyLimit },
                    headers: {
                        Authorization: `Bearer ${token || ''}`,
                    },
                });

                setSearchResult({
                    ...searchResult,
                    history: res.result.history,
                    historyCount: res.result.historyCount,
                });
            } catch (error) {}
        };
        fetchApiHistory();
    }, [suggest, historyLimit, optionSearch.value]);

    const handleSearchSubmit = () => {
        onSubmit();
        inputRef.current.blur();
        setSuggest(false);
    };

    const handleLinkClick = (text) => {
        router.push(`/search-result?q=${text}&type=${optionSearch.value}`);
        inputRef.current.blur();
        setSuggest(false);
    };

    const handleDeleteAllHistory = async () => {
        const token = storage.get('ACCESS_TOKEN');
        const res = await httpRequest.deleted(`${process.env.NEXT_PUBLIC_API_URL}/delete-all-history`, {
            headers: {
                Authorization: `Bearer ${token || ''}`,
            },
        });
        setSearchResult({ ...searchResult, history: [], historyCount: 0 });
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className={`text-left mt-2 ml-4 text-2xl text-text-primary mb-4 ${className}`}>
                <div>{optionSearch.suggest}</div>
            </div>
            <div>
                <Tippy
                    interactive
                    visible={suggest && (searchResult.history.length > 0 || searchResult.suggest.length > 0)}
                    placement="bottom"
                    onClickOutside={() => setSuggest(false)}
                    render={(attrs) => (
                        <div className="w-[80rem] text-left" tabIndex={-1} {...attrs}>
                            <PopperWrapper style={{ padding: '8px' }}>
                                <div className="w-full p-4 text-2xl">
                                    <ul className="space-y-8 max-h-[200px] overflow-hidden overflow-y-auto pb-4">
                                        {searchResult.history &&
                                            searchResult.history.length > 0 &&
                                            searchResult.history.map((history) => (
                                                <li key={history.id} className="flex items-center justify-between">
                                                    <div
                                                        onClick={() => handleLinkClick(history.content)}
                                                        className="flex items-center space-x-4 flex-1 cursor-pointer"
                                                    >
                                                        <FiClock />
                                                        <span>{history.content}</span>
                                                    </div>
                                                    <GrClose className="cursor-pointer" />
                                                </li>
                                            ))}
                                        {historyLimit && searchResult.historyCount > 3 && (
                                            <li
                                                className="flex items-center justify-center"
                                                onClick={() => setHistoryLimit(false)}
                                            >
                                                <div className="flex items-center space-x-1 select-none cursor-pointer">
                                                    <span>Xem tất cả</span>
                                                    <BiChevronDown />
                                                </div>
                                            </li>
                                        )}

                                        {!historyLimit && searchResult.historyCount > 3 && (
                                            <li
                                                className="flex items-center justify-center"
                                                onClick={handleDeleteAllHistory}
                                            >
                                                <div className="flex items-center space-x-1 select-none cursor-pointer">
                                                    <span>Xoá tất cả</span>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                    {searchResult.suggest && searchResult.suggest.length > 0 && (
                                        <div>
                                            <div className="text-3xl font-medium mb-6">Có thể bạn cần</div>
                                            <ul className="space-y-8">
                                                {searchResult.suggest &&
                                                    searchResult.suggest.length > 0 &&
                                                    searchResult.suggest.map((suggest) => (
                                                        <li key={suggest.concept.id}>
                                                            <div
                                                                onClick={() => handleLinkClick(suggest.concept.name)}
                                                                className="flex items-center space-x-4 cursor-pointer"
                                                            >
                                                                <FiArrowUpRight />
                                                                <span>{suggest.concept.name}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div
                        className={`w-full flex flex-row border border-color-primary rounded-xl bg-bg-primary select-none`}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchInput}
                            onChange={onChange}
                            placeholder={optionSearch.value === 'syntax' ? 'Nhập vào Ks' : optionSearch.suggest}
                            className="flex-1 text-xl py-5 px-7 rounded-xl border-none outline-none"
                            onKeyUp={(event) => event.keyCode === 13 && handleSearchSubmit()}
                            onFocus={() => setSuggest(true)}
                        />
                        {optionSearch.value === 'syntax' && (
                            <>
                                <div className="w-[1px] min-h-full flex items-center justify-center">
                                    <div className="w-[1px] min-h-[50%] bg-text-primary"></div>
                                </div>
                                <input
                                    type="text"
                                    value={searchInputCondition}
                                    onChange={onChangeCondition}
                                    placeholder={
                                        optionSearch.value === 'syntax' ? 'Nhập vào Condition' : optionSearch.suggest
                                    }
                                    className="flex-1 text-xl py-5 px-7 rounded-xl border-none outline-none"
                                    onKeyUp={(event) => event.keyCode === 13 && handleSearchSubmit()}
                                />
                                <div className="w-[1px] min-h-full flex items-center justify-center">
                                    <div className="w-[1px] min-h-[50%] bg-text-primary"></div>
                                </div>
                                <input
                                    type="text"
                                    value={searchInputEs}
                                    onChange={onChangeEs}
                                    placeholder={optionSearch.value === 'syntax' ? 'Nhập vào Es' : optionSearch.suggest}
                                    className="flex-1 text-xl py-5 px-7 rounded-xl border-none outline-none"
                                    onKeyUp={(event) => event.keyCode === 13 && handleSearchSubmit()}
                                />
                            </>
                        )}
                        <div className="flex items-center justify-center">
                            <select
                                value={optionSearch.value}
                                onChange={(e) => onChangeOptionSearch(e)}
                                className="bg-transparent text-xl block w-full outline-none cursor-pointer px-8 border-r border-r-text-primary"
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div
                            className="px-8 flex items-center justify-center cursor-pointer"
                            onClick={handleSearchSubmit}
                        >
                            <FiSearch className="text-color-primary text-4xl" />
                        </div>
                    </div>
                </Tippy>
            </div>
            {optionSearch.value === 'keyword' && (
                <div className="text-left mt-4 ml-4 text-2xl text-text-primary space-x-6">
                    {optionSearch.filter.map((value, index) => (
                        <label key={index} className="space-x-2 cursor-pointer select-none" htmlFor={value.value}>
                            <input
                                className="translate-y-[0.15rem] cursor-pointer"
                                type="checkbox"
                                checked={searchKeyword[value.value]}
                                onChange={() =>
                                    setSearchKeyword({ ...searchKeyword, [value.value]: !searchKeyword[value.value] })
                                }
                                id={value.value}
                            />
                            <span>{value.label}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
