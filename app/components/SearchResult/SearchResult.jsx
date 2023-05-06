'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Container from '../Container';

export const getSemantic = async (q) => {
    const res = await fetch(`http://localhost:8000/api/semantic?q=${q}`);

    if (!res.ok) {
        return;
    }

    return res.json();
};

const SearchResult = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');

    const [data, setData] = useState(null);

    useEffect(() => {
        if (q && q.trim().length > 0) {
            const fetchData = async () => {
                const fetchSemantic = await getSemantic(q);
                setData(fetchSemantic.result);
            };
            fetchData();
        }
    }, []);

    return (
        <div>
            <Container>
                <div className="pt-24 pb-28">
                    <div className="grid grid-cols-12">
                        <div className="col-span-9">
                            <div className="pr-4">
                                <div className="pb-16">
                                    <div className="text-text-AA text-3xl font-medium mb-6">Dữ liệu nhập vào</div>
                                    <div className="text-text-primary text-3xl font-medium">{q}</div>
                                </div>
                                <div className="pb-16">
                                    <div className="text-text-AA text-3xl font-medium mb-6">Định nghĩa</div>
                                    <div className="text-text-primary text-3xl font-medium">
                                        {data && data.text && data.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="pl-4 border-l-2 border-border">
                                <div>
                                    <div className="text-text-primary text-3xl font-medium mb-6">Dữ liệu nhập vào</div>
                                    <div className="text-text-primary text-3xl font-medium">Định nghĩa</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SearchResult;
