import React from 'react';
import ClientOnly from '../components/ClientOnly';
import SidebarAdmin from '../components/SidebarAdmin/SidebarAdmin';
import 'react-markdown-editor-lite/lib/index.css';
import ToastContainer from '../components/ToastContainer';
const layout = ({ children }) => {
    return (
        <div className="flex w-screen h-screen overflow-hidden">
            <ClientOnly>
                <div className="w-2/12">
                    <SidebarAdmin />
                    <ToastContainer />
                </div>
            </ClientOnly>
            <div className="w-10/12 h-full overflow-y-auto">
                <main>{children}</main>
            </div>
        </div>
    );
};

export default layout;
