'use client';

import React, { useEffect, useState } from 'react';
import * as httpRequest from '@/libs/httpRequest';

const typeContentInit = [
    {
        value: 'concept',
        label: 'Khái niệm',
    },
    {
        value: 'rule',
        label: 'Quy tắc',
    },
    {
        value: 'method',
        label: 'Phương thức',
    },
];

const ComponentContent = () => {
    const [typeContent, setTypeContent] = useState('concept');
    const [dataResult, setDataResult] = useState([]);
    const [nameContent, setNameContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const res = await httpRequest.get(`http://localhost:8000/api/get-content?type=${typeContent}`);

            if (res.ok) {
                setDataResult(res.result.data);
            }
        };
        fetchData();
    }, [typeContent]);

    const handleAddContent = async () => {
        const res = await httpRequest.post(`http://localhost:8000/api/add-content`, {
            name: nameContent,
            type: typeContent,
        });

        if (res.ok) {
            setDataResult(res.result.data);
        }
    };

    return (
        <div>
            <div
                className="mt-4 bg-white py-4 rounded-lg"
                style={{ boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)' }}
            >
                <div className="px-6 flex justify-between items-center pb-4">
                    {/* <button className="bg-color-primary rounded-md py-4 px-6 text-1xl text-white">Thêm mục</button> */}
                    <div>
                        <select
                            value={typeContent}
                            onChange={(e) => setTypeContent(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            {typeContentInit.map((type, index) => (
                                <option key={index} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="absolute top-1/2 left-3 w-5 h-5 -translate-y-1/2 text-borderColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>

                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="outline-none pr-4 pl-10 py-2 border border-borderColor rounded-md focus:border-primary"
                        />
                    </div>
                </div>

                <div className="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <div className="p-4 text-md font-medium">Thêm nội dung</div>
                    <div className="p-4 flex space-x-8">
                        <input
                            type="text"
                            value={nameContent}
                            onChange={(e) => setNameContent(e.target.value)}
                            placeholder="Tên nội dung"
                            className="outline-none pr-4 pl-10 py-2 border border-borderColor rounded-md focus:border-primary"
                        />
                        <button
                            className="bg-color-primary rounded-md py-4 px-6 text-1xl text-white"
                            onClick={handleAddContent}
                        >
                            Thêm nội dung
                        </button>
                    </div>
                </div>

                <div className="relative overflow-x-auto mt-10">
                    <table className="w-full text-2xl text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Tên nội dung
                                </th>
                                <th scope="col" className="px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataResult &&
                                dataResult.length > 0 &&
                                dataResult.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            <button
                                                className="bg-gray-500 rounded-md py-4 px-6 text-1xl text-white"
                                                onClick={handleAddContent}
                                            >
                                                Xem danh sách Component
                                            </button>
                                        </td>
                                        {/* <td className="px-6 py-4">Silver</td>
                                <td className="px-6 py-4">Laptop</td>
                                <td className="px-6 py-4">$2999</td> */}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ComponentContent;
