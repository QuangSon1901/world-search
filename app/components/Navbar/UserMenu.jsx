'use client';

import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import { authSelector } from '@/redux/selector';
import { getUser, loginUser } from '@/redux/slice/authSlice';
import { useEffect } from 'react';

export default function UserMenu({ setAuthActive }) {
    const { user, isAuthenticated } = useSelector(authSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                {(!isAuthenticated && (
                    <>
                        <Button label="Đăng nhập" onClick={() => setAuthActive({ isActive: true, type: 'login' })} />
                        <Button
                            label="Đăng ký"
                            outline
                            onClick={() => setAuthActive({ isActive: true, type: 'register' })}
                        />
                    </>
                )) || (
                    <>
                        <span>{user.name}</span>
                        <Button label="Đăng xuất" onClick={() => dispatch(loginUser())} />
                    </>
                )}
            </div>
        </div>
    );
}
