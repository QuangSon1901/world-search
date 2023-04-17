import React from 'react';
import Container from '../Container';
import Image from 'next/image';
import { AiFillFacebook, AiFillYoutube } from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
export default function Footer() {
    return (
        <div className="bg-text-primary pt-28">
            <Container>
                <div className="grid grid-cols-2 gap-8 text-white">
                    <div className="flex flex-col space-y-6">
                        <Image
                            src="/images/white-black-logo.png"
                            height="120"
                            width="200"
                            alt="World Search"
                            className="select-none mb-10"
                        />
                        <span>Một sản phẩm thuộc quyền sở hữu của tôi</span>
                        <span>
                            <b>Trụ sở</b>: Tầng 81, Landmark 81, Điện Biên Phủ, Bình Thạnh, TP HCM
                        </span>
                        <span>
                            <b>Hotline</b>: 0399.999.999
                        </span>
                        <span>
                            <b>Email</b>: contact@world.localhost.com
                        </span>
                        <div>
                            <b>Theo dõi tại</b>
                            <div className="flex gap-4 mt-4 mb-8">
                                <AiFillFacebook className="text-4xl" />
                                <AiFillYoutube className="text-4xl" />
                                <FaTiktok className="text-4xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="pt-8 pb-16 text-neutral-300">
                    <span>© 2023 World - Search any thing. All rights reserved.</span>
                </div>
            </Container>
        </div>
    );
}
