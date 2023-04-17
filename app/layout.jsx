import ClientOnly from './components/ClientOnly';
import Navbar from './components/Navbar/Navbar';
import './globals.css';

export const metadata = {
    title: 'World Search',
    description: 'World Search',
};

export default function RootLayout({ children }) {
    return (
        <html lang="vi" className="text-[62.5%]">
            <body className="overflowy-[overlay] text-primary leading-6 text-text-primary">
                <ClientOnly>
                    <Navbar />
                </ClientOnly>
                <div className="pt-header">{children}</div>
            </body>
        </html>
    );
}
