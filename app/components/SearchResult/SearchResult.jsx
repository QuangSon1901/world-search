'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Container from '../Container';
import MarkdownIt from 'markdown-it';
import Link from 'next/link';
const mdParser = new MarkdownIt({ html: true });
export const getSemantic = async (q, type) => {
    const res = await fetch(`http://localhost:8000/api/${type}?q=${q}`);

    if (!res.ok) {
        return;
    }

    return res.json();
};

const SearchResult = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q');
    const type = searchParams.get('type');

    const [data, setData] = useState(null);

    useEffect(() => {
        if (q && q.trim().length > 0 && type) {
            const fetchData = async () => {
                const fetchSemantic = await getSemantic(q, type);
                setData(fetchSemantic.result);
            };
            fetchData();
        }
    }, [q, type]);
    console.log(data);
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
                                                        {relate.array.map((com) => (
                                                            <Link href={'/'}>
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
