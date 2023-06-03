'use client';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import mathjax3 from 'markdown-it-mathjax3';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
const mdParser = new MarkdownIt({ html: true });
mdParser.use(mathjax3);
export const getParentNode = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/parent-node`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};

export const addProducts = async (formData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-node`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
};

const GraphTheoryAction = ({ close }) => {
    const [content, setContent] = useState('');
    const [parentNode, setParentNode] = useState('');
    const [label, setLabel] = useState('');
    const [zIndex, setZIndex] = useState(0);
    const [selectList, setSelectList] = useState({ parentNodes: [] });
    useEffect(() => {
        const data = async () => {
            const fetchParentNodes = await getParentNode();
            setSelectList({ parentNodes: fetchParentNodes.result });
        };
        data();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fetchAddProduct = async () => {
            const res = await addProducts({
                label,
                content,
                node_parent: parentNode,
                z_index: zIndex,
            });

            if (res.ok !== true) {
                toast.error('Internal Server Error!');
                return;
            }
            toast.success('Thêm thành công!');
            close();
        };
        fetchAddProduct();
    };

    return (
        <div className={`fixed inset-0 items-center justify-center bg-bg-overlay flex z-20`}>
            <form className="bg-white p-10 rounded-md" onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-1xl font-bold ">Thêm mục mới</h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        onClick={close}
                        className="w-6 h-6 cursor-pointer"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="flex gap-8">
                    <div className="flex flex-col gap-6 my-8">
                        <label htmlFor="label">
                            <p className="mb-4 relative w-max after:content-['*'] after:text-red-600 after:top-0 after:-right-3 after:font-bold after:absolute">
                                Nhãn :
                            </p>
                            <input
                                id="label"
                                type="text"
                                name="label"
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                placeholder="Nhập vào nhãn"
                                className={`w-[300px] p-4 text-1xl outline-none border border-borderColor rounded-md `}
                            />
                        </label>
                        <label htmlFor="node-parent">
                            <p className="mb-4 relative w-max after:content-['*'] after:text-red-600 after:top-0 after:-right-3 after:font-bold after:absolute">
                                Mục cha :
                            </p>
                            <select
                                name="node-parent"
                                value={parentNode}
                                onChange={(e) => setParentNode(e.target.value)}
                                className={`w-[300px] p-4 outline-none border border-borderColor rounded-md`}
                            >
                                <option value="" label="Chọn mục cha">
                                    Chọn mục cha
                                </option>
                                {selectList.parentNodes &&
                                    selectList.parentNodes.length > 0 &&
                                    selectList.parentNodes.map((node) => (
                                        <option key={node.id} value={node.id} label={node.label}>
                                            {node.label}
                                        </option>
                                    ))}
                            </select>
                        </label>
                        <label htmlFor="bac">
                            <p className="mb-4 relative w-max after:content-['*'] after:text-red-600 after:top-0 after:-right-3 after:font-bold after:absolute">
                                Bậc :
                            </p>
                            <input
                                id="bac"
                                type="num"
                                name="bac"
                                value={zIndex}
                                onChange={(e) => setZIndex(e.target.value)}
                                placeholder="Nhập vào bậc"
                                className={`w-[300px] p-4 text-1xl outline-none border border-borderColor rounded-md `}
                            />
                        </label>
                        <button type="submit" className="bg-color-primary rounded-md text-white py-4">
                            Thêm mục
                        </button>
                    </div>
                    <div className="flex flex-col gap-6 my-8">
                        <div className="h-full">
                            <p className="mb-4 relative w-max after:content-['*'] after:text-red-600 after:top-0 after:-right-3 after:font-bold after:absolute">
                                Nội dung :
                            </p>
                            <div className="flex gap-8 h-full">
                                <MdEditor
                                    className="w-[1000px] h-full outline-none border border-borderColor rounded-md"
                                    defaultValue={content}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={({ html, text }) => setContent(text)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default GraphTheoryAction;
