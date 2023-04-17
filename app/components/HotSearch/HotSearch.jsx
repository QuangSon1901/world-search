'use client';

import Container from '../Container';

export default function HotSearch() {
    return (
        <div className="pt-24 pb-28">
            <Container>
                <div>
                    <h1 className="font-medium text-3xl mb-12">Mọi người cũng đã hỏi</h1>
                    <ul className="grid grid-cols-3 gap-6">
                        <li className="w-full h-28 bg-neutral-200 rounded-md"></li>
                        <li className="w-full h-28 bg-neutral-200 rounded-md"></li>
                        <li className="w-full h-28 bg-neutral-200 rounded-md"></li>
                        <li className="w-full h-28 bg-neutral-200 rounded-md"></li>
                        <li className="w-full h-28 bg-neutral-200 rounded-md"></li>
                        <li className="w-full h-28 bg-neutral-200 rounded-md"></li>
                        <li className="w-full h-28 bg-neutral-200 rounded-md"></li>
                        <li className="w-full h-28 bg-neutral-200 rounded-md"></li>
                        <li className="w-full h-28 bg-neutral-200 rounded-md"></li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}
