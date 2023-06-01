'use client';

import routesConfig from '@/app/routes/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarMenu = [
    {
        title: 'Dashboard',
        href: routesConfig.admin,
    },
    {
        title: 'Quản lý nội dung',
        href: routesConfig.concept,
    },
    {
        title: 'Lý thuyết đồ thị',
        href: routesConfig.graphTheory,
    },
];

const SidebarAdmin = () => {
    const pathname = usePathname();
    return (
        <div>
            <div className="py-4">
                <ul className="space-y-2">
                    {sidebarMenu.map((value, index) => (
                        <li key={index}>
                            <Link
                                href={value.href}
                                className={`w-full py-4 pr-3 pl-5 block text-2xl font-medium ${
                                    pathname === value.href && 'bg-color-primary text-white rounded-r-full'
                                }`}
                            >
                                {value.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SidebarAdmin;
