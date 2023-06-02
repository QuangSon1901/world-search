import { loginUser } from '@/redux/slice/authSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { authSelector } from '@/redux/selector';

const Login = ({ setAuthActive, close }) => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated } = useSelector(authSelector);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            Loading.remove(500);
            return;
        }

        if (!loading && isAuthenticated) {
            Loading.remove(500);
            close();
            return;
        }

        Loading.circle({ svgColor: '#2563EB', zindex: '9999999' });
    }, [loading, isAuthenticated]);
    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">
                    <p className="mb-4">Email:</p>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={`w-[300px] p-4 text-1xl outline-none border border-borderColor rounded-md `}
                        required
                    />
                </label>
            </div>
            <div>
                <label htmlFor="">
                    <p className="mb-4">Mật khẩu:</p>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className={`w-[300px] p-4 text-1xl outline-none border border-borderColor rounded-md `}
                        required
                    />
                </label>
            </div>
            <div className="flex items-center justify-between py-4">
                <div>
                    <label className="space-x-2 cursor-pointer select-none">
                        <input className="translate-y-[0.15rem] cursor-pointer" type="checkbox" value="" />
                        <span>Nhớ mật khẩu</span>
                    </label>
                </div>
                <div>
                    <Link href={'/'}>Quên mật khẩu?</Link>
                </div>
            </div>
            <button type="submit" className="bg-color-primary rounded-md text-white py-4 w-full font-medium">
                Đăng nhập
            </button>
            <p>
                Bạn chưa có tài khoản?{' '}
                <span
                    className="text-color-primary cursor-pointer select-none"
                    onClick={() => setAuthActive({ isActive: true, type: 'register' })}
                >
                    Đăng ký ngay
                </span>
            </p>
        </form>
    );
};

export default Login;
