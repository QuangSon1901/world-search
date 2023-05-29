'use client';
import { FiSearch } from 'react-icons/fi';

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
            <div
                className={`w-full relative flex flex-row border border-color-primary rounded-xl bg-bg-primary select-none ${className}`}
            >
                <input
                    type="text"
                    value={searchInput}
                    onChange={onChange}
                    placeholder={optionSearch.suggest}
                    className="flex-1 text-xl py-5 px-7 rounded-xl border-none outline-none"
                    onKeyUp={(event) => event.keyCode === 13 && onSubmit()}
                />
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
            <div className="text-left mt-2 ml-4 text-2xl text-text-primary">
                <i>`{optionSearch.suggest}`</i>
            </div>
        </div>
    );
}
