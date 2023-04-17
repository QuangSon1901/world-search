'use client';

import Container from '../Container';
import Logo from './Logo';
import MainMenu from './MainMenu';
import UserMenu from './UserMenu';

export default function Navbar() {
    return (
        <div className="fixed w-full h-header bg-bg-primary z-10">
            <div className="py-8 h-full">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md-gap-0">
                        <Logo />
                        <MainMenu />
                        <UserMenu />
                    </div>
                </Container>
            </div>
        </div>
    );
}
