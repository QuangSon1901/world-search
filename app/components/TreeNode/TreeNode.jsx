'use client';

import React, { Fragment, useEffect, useState } from 'react';
import Container from '../Container';
import MarkdownIt from 'markdown-it';
import mathjax3 from 'markdown-it-mathjax3';
import Link from 'next/link';
import routesConfig from '@/app/routes/routes';
import { GiOpenWound } from 'react-icons/gi';
import { useSearchParams } from 'next/navigation';
const mdParser = new MarkdownIt({ html: true });
mdParser.use(mathjax3);

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
            if (!nodeActive && !node) {
                setNodeActive(fetchTreeNode.result[0].childrens[0].id);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (node) {
            setNodeActive(node);
        }
    }, [node]);

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

    return (
        <div>
            <Container>
                <div className="pt-24 pb-28">
                    <div className="grid grid-cols-12">
                        <div className="col-span-3">
                            <div className="pr-4">
                                <div className="pb-16">
                                    <div className="text-text-AA text-3xl font-medium mb-6">Lý thuyết đồ thị</div>
                                    {data &&
                                        data.length > 0 &&
                                        data.map((value, index) => (
                                            <Fragment key={index}>
                                                <div className="text-text-primary text-3xl font-medium mb-6 flex items-center">
                                                    {value.label}
                                                </div>
                                                {value.childrens &&
                                                    value.childrens.length > 0 &&
                                                    value.childrens.map((children, index2) => (
                                                        <div
                                                            key={index2}
                                                            className={`${
                                                                nodeActive == children.id
                                                                    ? 'text-color-primary underline'
                                                                    : 'text-text-primary ml-11'
                                                            }  text-3xl font-medium mb-6 flex items-center`}
                                                        >
                                                            {nodeActive == children.id && (
                                                                <GiOpenWound className="mr-4" />
                                                            )}
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
                                <div className="text-text-primary text-3xl font-normal mb-6 content-md">
                                    {/* {findElementById(data, nodeActive) &&
                                        findElementById(data, nodeActive).content &&
                                        mathJaxText(findElementById(data, nodeActive).content).length > 0 &&
                                        mathJaxText(findElementById(data, nodeActive).content).map((p, index) => (
                                            <div key={index}>
                                                {p.type === 'text' && (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: mdParser.render(p.text),
                                                        }}
                                                    ></div>
                                                )}
                                                {p.type === 'mathjax' && (
                                                    <MathJax.Provider>
                                                        <MathJax.Node formula={p.text} />
                                                    </MathJax.Provider>
                                                )}
                                            </div>
                                        ))} */}
                                    {findElementById(data, nodeActive) && findElementById(data, nodeActive).content && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: mdParser.render(findElementById(data, nodeActive).content),
                                            }}
                                        ></div>
                                    )}
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
