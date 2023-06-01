'use client';
import { FiSearch } from 'react-icons/fi';
import Tippy from '@tippyjs/react/headless';
import PopperWrapper from '../Popper/Wrapper';
import { FiClock, FiArrowUpRight } from 'react-icons/fi';
import { BiChevronDown } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import Link from 'next/link';

export default function SearchInput({
    searchInput = '',
    className,
    onChange,
    onSubmit,
    onChangeOptionSearch,
    optionSearch,
    options,
}) {
    return (
        <div className="max-w-7xl mx-auto">
            <div className={`text-left mt-2 ml-4 text-2xl text-text-primary mb-4 ${className}`}>
                <div>{optionSearch.suggest}</div>
            </div>
            <div>
                <Tippy
                    interactive
                    visible={false}
                    placement="bottom"
                    render={(attrs) => (
                        <div className="w-[80rem] text-left" tabIndex={-1} {...attrs}>
                            <PopperWrapper style={{ padding: '8px' }}>
                                <div className="w-full p-4 text-1xl">
                                    <ul className="space-y-8">
                                        <li className="flex items-center justify-between">
                                            <Link href={'/'} className="flex items-center space-x-4 flex-1">
                                                <FiClock />
                                                <span>Định nghĩa đồ thị vô hướng</span>
                                            </Link>
                                            <GrClose className="cursor-pointer" />
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <Link href={'/'} className="flex items-center space-x-4 flex-1">
                                                <FiClock />
                                                <span>Định nghĩa đồ thị vô hướng</span>
                                            </Link>
                                            <GrClose className="cursor-pointer" />
                                        </li>
                                        <li className="flex items-center justify-center">
                                            <div className="flex items-center space-x-1 select-none cursor-pointer">
                                                <span>Xem thêm</span>
                                                <BiChevronDown />
                                            </div>
                                        </li>
                                    </ul>
                                    <div>
                                        <div className="text-3xl font-medium mb-6">Có thể bạn cần</div>
                                        <ul className="space-y-8">
                                            <li>
                                                <Link href={'/'} className="flex items-center space-x-4">
                                                    <FiArrowUpRight />
                                                    <span>Định nghĩa đồ thị vô hướng</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={'/'} className="flex items-center space-x-4">
                                                    <FiArrowUpRight />
                                                    <span>Định nghĩa đồ thị vô hướng</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div
                        className={`w-full flex flex-row border border-color-primary rounded-xl bg-bg-primary select-none`}
                    >
                        <input
                            type="text"
                            value={searchInput}
                            onChange={onChange}
                            placeholder={optionSearch.value === 'syntax' ? 'Nhập vào Ks' : optionSearch.suggest}
                            className="flex-1 text-xl py-5 px-7 rounded-xl border-none outline-none"
                            onKeyUp={(event) => event.keyCode === 13 && onSubmit()}
                        />
                        {optionSearch.value === 'syntax' && (
                            <>
                                <div className="w-[1px] min-h-full flex items-center justify-center">
                                    <div className="w-[1px] min-h-[50%] bg-text-primary"></div>
                                </div>
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={onChange}
                                    placeholder={
                                        optionSearch.value === 'syntax' ? 'Nhập vào Condition' : optionSearch.suggest
                                    }
                                    className="flex-1 text-xl py-5 px-7 rounded-xl border-none outline-none"
                                    onKeyUp={(event) => event.keyCode === 13 && onSubmit()}
                                />
                                <div className="w-[1px] min-h-full flex items-center justify-center">
                                    <div className="w-[1px] min-h-[50%] bg-text-primary"></div>
                                </div>
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={onChange}
                                    placeholder={optionSearch.value === 'syntax' ? 'Nhập vào Es' : optionSearch.suggest}
                                    className="flex-1 text-xl py-5 px-7 rounded-xl border-none outline-none"
                                    onKeyUp={(event) => event.keyCode === 13 && onSubmit()}
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
                        <div className="px-8 flex items-center justify-center cursor-pointer" onClick={onSubmit}>
                            <FiSearch className="text-color-primary text-4xl" />
                        </div>
                    </div>
                </Tippy>
            </div>
            {optionSearch.value === 'keyword' && (
                <div className="text-left mt-4 ml-4 text-2xl text-text-primary space-x-6">
                    <label className="space-x-2 cursor-pointer select-none" htmlFor="concept">
                        <input className="translate-y-[0.15rem] cursor-pointer" type="checkbox" value="" id="concept" />
                        <span>Khái niệm</span>
                    </label>
                    <label className="space-x-2 cursor-pointer select-none" htmlFor="rule">
                        <input className="translate-y-[0.15rem] cursor-pointer" type="checkbox" value="" id="rule" />
                        <span>Quy tắc (tính chất/ định lý/ hệ quả)</span>
                    </label>
                    <label className="space-x-2 cursor-pointer select-none" htmlFor="method">
                        <input className="translate-y-[0.15rem] cursor-pointer" type="checkbox" value="" id="method" />
                        <span>Bài toán</span>
                    </label>
                    <label className="space-x-2 cursor-pointer select-none" htmlFor="func">
                        <input className="translate-y-[0.15rem] cursor-pointer" type="checkbox" value="" id="func" />
                        <span>Phương pháp/ Thuật giải</span>
                    </label>
                </div>
            )}
        </div>
    );
}
