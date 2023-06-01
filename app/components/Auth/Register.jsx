import Link from 'next/link';
import React from 'react';

const Register = ({ setAuthActive }) => {
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
            <div>
                <label htmlFor="">
                    <p className="mb-4">Nhập lại mật khẩu:</p>
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
            <button type="submit" className="bg-color-primary rounded-md text-white py-4 w-full font-medium">
                Đăng ký
            </button>
            <p>
                Bạn đã có tài khoản?{' '}
                <span
                    className="text-color-primary cursor-pointer select-none"
                    onClick={() => setAuthActive({ isActive: true, type: 'login' })}
                >
                    Đăng nhập ngay
                </span>
            </p>
        </form>
    );
};

export default Register;
