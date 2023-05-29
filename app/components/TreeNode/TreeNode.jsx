'use client';

import React, { Fragment, useEffect, useState } from 'react';
import Container from '../Container';
import MarkdownIt from 'markdown-it';
import Link from 'next/link';
import routesConfig from '@/app/routes/routes';
import { useSearchParams } from 'next/navigation';
const mdParser = new MarkdownIt({ html: true });
export const getTreeNode = async () => {
    const res = await fetch(`http://localhost:8000/api/t-node`);

    if (!res.ok) {
        return;
    }

    return res.json();
};

const TreeNode = () => {
    const searchParams = useSearchParams();
    const node = searchParams.get('node');

    const [data, setData] = useState(null);
    const [nodeActive, setNodeActive] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchTreeNode = await getTreeNode();
            setData(fetchTreeNode.result);
            if (!nodeActive) {
                setNodeActive(fetchTreeNode.result[0].childrens[0].id);
            }
        };
        fetchData();
    }, []);

    function findElementById(array, id) {
        if (!array || array.length <= 0) {
            return null;
        }
        id = Number(id);
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return array[i];
            }
            if (Array.isArray(array[i].childrens)) {
                const foundElement = findElementById(array[i].childrens, id);
                if (foundElement) {
                    return foundElement;
                }
            }
        }
        return null; // Trả về null nếu không tìm thấy phần tử
    }

    useEffect(() => {
        if (node) {
            setNodeActive(node);
        }
    }, [node]);

    return (
        <div>
            <Container>
                <div className="pt-24 pb-28">
                    <div className="grid grid-cols-12">
                        <div className="col-span-3">
                            <div className="pr-4">
                                <div className="pb-16">
                                    <div className="text-text-primary text-3xl font-bold mb-6">Lý thuyết đồ thị</div>
                                    {data &&
                                        data.length > 0 &&
                                        data.map((value, index) => (
                                            <Fragment key={index}>
                                                <div className="text-text-primary text-3xl font-medium mb-6">
                                                    {value.label}
                                                </div>
                                                {value.childrens &&
                                                    value.childrens.length > 0 &&
                                                    value.childrens.map((children, index2) => (
                                                        <div
                                                            key={index2}
                                                            className="text-text-primary ml-6 text-3xl font-medium mb-6"
                                                        >
                                                            <Link href={`${routesConfig.tNode}?node=${children.id}`}>
                                                                {children.label}
                                                            </Link>
                                                        </div>
                                                    ))}
                                            </Fragment>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-9">
                            <div className="pl-4 border-l-2 border-border">
                                <div>
                                    <div
                                        className="text-text-primary text-3xl font-medium mb-6"
                                        dangerouslySetInnerHTML={{
                                            __html: mdParser.render(
                                                (findElementById(data, nodeActive) &&
                                                    findElementById(data, nodeActive).content) ||
                                                    '',
                                            ),
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TreeNode;
