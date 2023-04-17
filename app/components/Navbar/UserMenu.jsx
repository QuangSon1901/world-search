'use client';

import Button from '../Button';

export default function UserMenu() {
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <Button label="Đăng nhập" />
                <Button label="Đăng ký" outline />
            </div>
        </div>
    );
}
