import ClientOnly from './components/ClientOnly';
import Navbar from './components/Navbar/Navbar';
import ReduxProvider from './components/ReduxProvider';
import './globals.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.js';

export const metadata = {
    title: 'World Search',
    description: 'World Search',
};

export default function RootLayout({ children }) {
    return (
        <html lang="vi" className="text-[62.5%]">
            <body className="overflowy-[overlay] text-primary leading-6 text-text-primary">
                <ClientOnly>
                    <ReduxProvider>
                        <Navbar />
                        <div className="pt-header">{children}</div>
                    </ReduxProvider>
                </ClientOnly>
            </body>
        </html>
    );
}
