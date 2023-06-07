'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Container from '../Container';
import MarkdownIt from 'markdown-it';
import Link from 'next/link';
import { storage } from '@/libs/storage';
import * as httpRequest from '@/libs/httpRequest';
import mathjax3 from 'markdown-it-mathjax3';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
const mdParser = new MarkdownIt({ html: true });
mdParser.use(mathjax3);

export const getSemantic = async (q, type, filter = '') => {
    const token = storage.get('ACCESS_TOKEN');
    const res = await httpRequest.get(`${process.env.NEXT_PUBLIC_API_URL}/${type}?q=${q}&type=${filter}`, {
        headers: {
            Authorization: `Bearer ${token || ''}`,
        },
    });
    if (!res.ok) {
        return;
    }

    return res;
};

const SearchResult = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const type = searchParams.get('type');
    const filter = searchParams.get('filter');
    const [data, setData] = useState(null);

    useEffect(() => {
        if (q && q.trim().length > 0 && type) {
            const fetchData = async () => {
                const fetchSemantic = await getSemantic(q, type, filter);
                setData(fetchSemantic.result);
                Loading.remove(500);
            };
            fetchData();
        }
    }, [q, type, filter]);

    return (
        <div>
            <Container>
                <div className="pt-24 pb-28">
                    <div className="grid grid-cols-12">
                        <div className="col-span-9">
                            <div className="pr-4">
                                <div className="pb-16">
                                    <div className="text-text-AA text-3xl font-medium mb-6">Dữ liệu nhập vào</div>
                                    {type === 'syntax' ? (
                                        <>
                                            {q.split('|')[0].length > 0 && (
                                                <div className="text-text-primary text-3xl font-medium">
                                                    {`Ks        := ${q.split('|')[0]}`}
                                                </div>
                                            )}
                                            {q.split('|')[1].length > 0 && (
                                                <div className="text-text-primary text-3xl font-medium">
                                                    {`Condition := ${q.split('|')[1]}`}
                                                </div>
                                            )}
                                            {q.split('|')[2].length > 0 && (
                                                <div className="text-text-primary text-3xl font-medium">
                                                    {`Es        := ${q.split('|')[2]}`}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-text-primary text-3xl font-medium">{q}</div>
                                    )}
                                </div>
                                {data &&
                                    data.main.length > 0 &&
                                    data.main.map((com) => (
                                        <div key={com.id} className="pb-16" id={com.type}>
                                            <div className="text-text-AA text-3xl font-medium mb-6">{com.type}</div>
                                            <div
                                                className="text-text-primary text-3xl font-medium"
                                                dangerouslySetInnerHTML={{ __html: mdParser.render(com.content) }}
                                            ></div>

                                            {com.type === 'Ví dụ' && (
                                                <Link href={'/'} className="text-color-primary hover:underline">
                                                    Xem thêm ví dụ
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="pl-4 border-l-2 border-border">
                                <div className="pb-16">
                                    <div className="text-text-primary text-3xl font-medium mb-6">Dữ liệu nhập vào</div>
                                    {data &&
                                        data.main.length > 0 &&
                                        data.main.map((com) => (
                                            <div key={com.id} className="text-text-primary text-3xl font-medium mb-6">
                                                <a href={'#' + com.type}>{com.type}</a>
                                            </div>
                                        ))}
                                </div>
                                {data && data.relate.length > 0 && (
                                    <div className="pb-16">
                                        <div className="text-text-AA text-3xl font-medium mb-6">Nội dung liên quan</div>
                                        <div className="text-text-primary text-3xl font-medium">
                                            {data.relate.map((relate, index) => (
                                                <div key={index} className="mb-16">
                                                    <div className="text-text-primary text-3xl font-medium mb-6">
                                                        {relate.type}
                                                    </div>
                                                    <div>
                                                        {relate.array.slice(0, 3).map((com) => (
                                                            <Link
                                                                key={com.id}
                                                                href={`/search-result?q=${com.concept.name}&type=${type}&filter=${filter}`}
                                                            >
                                                                <div
                                                                    key={com.concept.id}
                                                                    className="border mb-6 rounded-xl p-6 hover:underline"
                                                                >
                                                                    <div className="text-color-primary text-2xl font-medium">
                                                                        {com.concept.name}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SearchResult;
