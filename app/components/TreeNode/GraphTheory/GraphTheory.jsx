'use client';

import { useState } from 'react';
import GraphTheoryAction from './GraphTheoryAction';

const GraphTheory = () => {
    const [modalActive, setModalActive] = useState({ isActive: false, item: null });
    return (
        <div>
            <div
                className="mt-4 bg-white py-4 rounded-lg"
                style={{ boxShadow: '0px 2px 10px 0px rgba(58, 53, 65, 0.1)' }}
            >
                <div className="px-6 flex justify-between items-center pb-4">
                    <button
                        className="bg-color-primary rounded-md py-4 px-6 text-1xl text-white"
                        onClick={() => setModalActive({ ...modalActive, isActive: true })}
                    >
                        Thêm mục
                    </button>
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
            </div>
            {/* <div className="flex justify-center items-center my-10">
                <button className="bg-primary-600 rounded-md py-2 px-4 text-white">Load More</button>
            </div> */}
            {modalActive.isActive && (
                <GraphTheoryAction close={() => setModalActive({ isActive: false, product: null })} />
            )}
        </div>
    );
};

export default GraphTheory;
