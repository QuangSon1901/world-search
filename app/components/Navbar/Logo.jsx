'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import routesConfig from '@/app/routes/routes';

export default function Logo() {
    const router = useRouter();
    return (
        <div>
            <Image
                onClick={() => router.push(routesConfig.home)}
                src="/images/main-logo.png"
                height="120"
                width="120"
                alt="World Search"
                className="select-none"
            />
        </div>
    );
}
