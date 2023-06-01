'use client';

import Button from '../Button';

export default function UserMenu({ setAuthActive }) {
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <Button label="Đăng nhập" onClick={() => setAuthActive({ isActive: true, type: 'login' })} />
                <Button label="Đăng ký" outline onClick={() => setAuthActive({ isActive: true, type: 'register' })} />
            </div>
        </div>
    );
}
