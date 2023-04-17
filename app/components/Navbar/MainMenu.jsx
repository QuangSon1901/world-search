'use client';
import routesConfig from '@/app/routes/routes';
import Link from 'next/link';

const mainMenu = [
    {
        title: 'Giới thiệu',
        url: routesConfig.home,
    },
    {
        title: 'Lý thuyết đồ thị',
        url: routesConfig.home,
    },
    {
        title: 'Hướng dẫn ',
        url: routesConfig.home,
    },
    {
        title: 'Liên hệ',
        url: routesConfig.home,
    },
];

export default function MainMenu() {
    return (
        <div className="relative flex-1 pl-20">
            <div className="flex flex-row items-center">
                {mainMenu.map((menuItem, index) => (
                    <Link href={menuItem.url} key={index} className="px-6 py-4 cursor-pointer">
                        {menuItem.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
