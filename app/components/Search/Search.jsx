'use client';

import Container from '../Container';
import Background from './Background';
import SearchInput from './SearchInput';

export default function Search() {
    return (
        <div>
            <Background>
                <Container>
                    <div className="pt-24 pb-20 text-center">
                        <h1 className="font-bold text-5xl">
                            <span className="text-text-red">World</span> - Search any thing
                        </h1>
                        <p className="text-2xl mt-11 max-w-2xl mx-auto tracking-widest leading-10">
                            Truy vấn kiến thức chính xác nhất, dễ dàng nhất tại hệ thống tri thức{' '}
                            <span className="text-text-red">World</span> - Search any thing
                        </p>
                        <SearchInput />
                    </div>
                </Container>
            </Background>
        </div>
    );
}
