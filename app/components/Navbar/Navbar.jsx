'use client';

import { usePathname } from 'next/navigation';
import Container from '../Container';
import Logo from './Logo';
import MainMenu from './MainMenu';
import UserMenu from './UserMenu';
import AuthModal from '../Auth/AuthModal';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();

    const [authActive, setAuthActive] = useState({ isActive: false, type: 'login' });

    // if (pathname.split('/')[1] === 'admin') {
    //     return;
    // }
    return (
        <>
            <div className="fixed w-full h-header bg-bg-primary z-[99999]">
                <div className="py-8 h-full">
                    <Container>
                        <div className="flex flex-row items-center justify-between gap-3 md-gap-0">
                            <Logo />
                            <MainMenu />
                            <UserMenu setAuthActive={setAuthActive} />
                        </div>
                    </Container>
                </div>
            </div>
            {authActive.isActive && (
                <AuthModal
                    authActive={authActive}
                    close={() => setAuthActive({ isActive: false, type: 'login' })}
                    setAuthActive={setAuthActive}
                />
            )}
        </>
    );
}
