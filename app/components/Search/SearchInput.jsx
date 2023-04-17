'use client';
import { FiSearch } from 'react-icons/fi';

const options = [{ value: 'keyphrase', label: 'Keyphrase' }];

export default function SearchInput() {
    return (
        <div className="max-w-7xl mx-auto mt-24 relative flex flex-row border border-color-primary rounded-xl bg-bg-primary select-none">
            <input
                type="text"
                placeholder="Nhâp mọi thứ bạn cần tìm"
                className="flex-1 text-xl py-5 px-7 rounded-xl border-none outline-none"
            />
            <div className="flex items-center justify-center">
                <select class="bg-transparent text-xl block w-full outline-none cursor-pointer px-8 border-r border-r-text-primary">
                    <option selected>Keyphrase</option>
                    <option value="syntax">Syntax</option>
                </select>
            </div>
            <div className="px-8 flex items-center justify-center cursor-pointer">
                <FiSearch className="text-color-primary text-4xl" />
            </div>
        </div>
    );
}
