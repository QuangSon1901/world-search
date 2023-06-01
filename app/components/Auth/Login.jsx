import Link from 'next/link';
import React from 'react';

const Login = ({ setAuthActive }) => {
    return (
        <form action="" className="space-y-8">
            <div>
                <label htmlFor="">
                    <p className="mb-4">Email:</p>
                    <input
                        type="email"
                        name="email"
                        id="email"
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
